import React from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const userProfile = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(userProfile.name);
    const [description, setDescription] = React.useState(userProfile.about)

    React.useEffect(() => {
        if (userProfile) {
            setName(userProfile.name)
            setDescription(userProfile.about)
        }
    }, [userProfile])

    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
        setName(userProfile.name)
        setDescription(userProfile.about)
    }

    return (
        <PopupWithForm name='popupEditProfile' title='Редактировать профиль' id='editProfileForm' buttonLabel='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} onClick={props.onClick}>
            <input className="popup__input" type="text" value={name} onChange={handleNameChange} name="profileName" id="popup__profilename" required minLength={2} maxLength={40} />
            <span className="error" id="popup__profilename-error" />
            <input className="popup__input" type="text" value={description} onChange={handleDescriptionChange} name="profileTitle" id="popup__profiletitle" required minLength={2} maxLength={200} />
            <span className="error" id="popup__profiletitle-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup