import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfooTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import {FormValidator} from './FormValidator'


function App() {
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [loggedInState, setLoggedInState] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    React.useState(false);
  const [isAuthReqSuccess, SetIsAuthReqSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: "Жак-ив-кусто",
    avatar: "#",
    about: "Мореплаватель",
  });
  const location = useLocation();
  const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submitbtn',
    inactiveButtonClass: 'popup__submitbtn_status_inactive',
    errorClass: '.popup__input_state_invalid'
}
const loginConfig = {
  formSelector: '.login__form',
  inputSelector: '.login__input',
  submitButtonSelector: '.login__submitbtn',
  inactiveButtonClass: 'popup__submitbtn_status_inactive',
  errorClass: '.popup__input_state_invalid'
}

  React.useEffect(() => {    
    api
      .getProfile()
      .then((profileObj) => {
        if(profileObj){
        setLoggedInState(true);
        setCurrentUser(profileObj);
        setUserEmail(profileObj.email);
        history.push("/");
      }
      else{
        return Promise.reject('Необходима авторизация');
      }
      })
      .then(()=>{ 
          api.getInitialCards()
          .then((cardsArray) => {
            setCards(cardsArray);
          })})      
      .catch((err) => console.log("Ошибка:", err));      
    }, []);

    React.useEffect(() => {
      document.addEventListener("keydown", handleEscape, false);
  
      return () => {
        document.removeEventListener("keydown", handleEscape, false);
      };
    }, []);

    React.useEffect(() => {
  const changeAvatarForm=document.getElementById('changeAvatarForm');
  const avatarChangeValidation= new FormValidator(config,changeAvatarForm);
  avatarChangeValidation.enableValidation();

  const editProfileForm=document.getElementById('editProfileForm');
  const editProfileValidation= new FormValidator(config,editProfileForm);
  editProfileValidation.enableValidation();

  const addNewElementForm=document.getElementById('addNewElementForm');
  const addNewElementValidation= new FormValidator(config,addNewElementForm);
  addNewElementValidation.enableValidation();
    }, []);

    React.useEffect(() => {
      if(location.pathname==='/sign-in'){
      const loginForm=document.getElementById('loginForm');
  const loginFormValidation= new FormValidator(loginConfig,loginForm);
      loginFormValidation.enableValidation();}
      else if(location.pathname==='/sign-up'){
        const registerForm=document.getElementById('registerForm');
  const registerFormValidation= new FormValidator(loginConfig,registerForm);
  registerFormValidation.enableValidation();
      } 
    }, [location.pathname]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDeleteClick(card) {
    /*setIsDeleteConfirmationPopupOpen(true);*/
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((item) => item._id !== card._id));
    });
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then(({ name, about }) => {
        setCurrentUser((prevUserState) => {
          return { ...prevUserState, name, about };
        });

        CloseAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatarIcon(avatar)
      .then(({ avatar }) => {
        setCurrentUser((prevUserState) => {
          return { ...prevUserState, avatar };
        });
        CloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(obj) {
    api
      .sendElement(obj)
      .then((card) => {
        setCards([card, ...cards]);
        CloseAllPopups();
      })
      .catch((err) => console.log("Ошибка добавления карточки", err));
  }

 function CloseAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipPopupOpen(false);
  }

  function handleRegisterClick(email, password) {
    auth
      .register(email, password)
      .then((response) => {
        SetIsAuthReqSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err === "400") {
          console.log("400 - некорректно заполнено одно из полей");
        } else {
          console.log(`Ошибка:`, err);
        }
        SetIsAuthReqSuccess(false);
      })
      .finally(() => {
        setIsInfoToolTipPopupOpen(true);
      });
  }

  function handleLoginClick(email, password) {
    auth
      .login(email, password)
      .then(() => {
        setLoggedInState(true);
        setUserEmail(email);
        history.push("/");
      })
      .then(()=>{
        api.getInfo()
        .then(([cardsArray, profileObj]) => {
          setCards(cardsArray);
          setCurrentUser(profileObj);
        })
      })
      .catch((err) => {
        if (err === 401) {
          console.log("401 - пользователь с email не найден");
        } else if (err === 400) {
          console.log("400 - не передано одно из полей ");
        } else {
          console.log(err);
        }
      });
  }
  function handleLogOut() {
    setLoggedInState(false);
    auth.logout();
  }

  function handleEscape(e){ 
if(e.key==='Escape' ){
  CloseAllPopups();
}}

function handleOverPopupClick(evt){
  if(evt.target.classList.contains('popup')){
CloseAllPopups();
  }
}


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedInState}
          userEmail={userEmail}
          onLogOut={handleLogOut}
        />
        <Switch>
          <ProtectedRoute
            component={Main}
            loggedIn={loggedInState}
            exact
            path="/"
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            card={selectedCard}
            onImage={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />

          <Route path="/sign-in">
            <Login onLogin={handleLoginClick} />
          </Route>
          <Route path="/sign-up">
            <Register onRegisterClick={handleRegisterClick} />
          </Route>
        </Switch>
        <ProtectedRoute component={Footer} loggedIn={loggedInState} path="/" />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={CloseAllPopups}
          onUpdateUser={handleUpdateUser}
          onClick={handleOverPopupClick}            
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={CloseAllPopups}
          onAddPlace={handleAddPlaceSubmit} 
          onClick={handleOverPopupClick}           
        />
        <InfooTooltip
          isSuccess={isAuthReqSuccess}
          isOpen={isInfoToolTipPopupOpen}
          onClose={CloseAllPopups}
          onClick={handleOverPopupClick}  
          
        />

        <ImagePopup
          card={selectedCard ? selectedCard : { link: "#", name: "" }}
          onClose={CloseAllPopups}
          onUpdateUser={handleUpdateUser}
          onClick={handleOverPopupClick}          
        />
        <PopupWithForm
          name="popupDeleteConfirmation"
          title="Вы уверены?"
          buttonLabel="Да"
          onClose={CloseAllPopups}
          onClick={handleOverPopupClick}            
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={CloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClick={handleOverPopupClick}            
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
