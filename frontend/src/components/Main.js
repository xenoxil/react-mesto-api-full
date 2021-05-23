import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import Card from './Card.js'

function Main(props) {

  const userProfile = React.useContext(CurrentUserContext);


  /*const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = React.useState(false);*/



  return (
    <main className="content">
      <section className="profile">
        <button className="profile__editavatar" onClick={props.onEditAvatar} />
        <img src={userProfile.avatar} alt="Аватар" className="profile__avatar" />
        <div>
          <div className="profile__container">
            <h1 className="profile__name">{userProfile.name}</h1>
            <button className="profile__edit-btn hover" onClick={props.onEditProfile} type="button" aria-label="Кнопка редактировать профиль" />
          </div>
          <p className="profile__title">{userProfile.about}</p>
        </div>
        <button className="profile__add-btn hover" type="button" aria-label="Кнопка добавить карточку" onClick={props.onAddPlace} />
      </section>
      <section>
        <ul className="elements">
          {
            props.cards.map((item) => {
              return (<Card cardObj={item} name={item.name} link={item.link} likes={item.likes} key={item._id}
                onCardClick={props.onImage} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)

            })}
        </ul>
      </section>


    </main>
  )
}


export default Main