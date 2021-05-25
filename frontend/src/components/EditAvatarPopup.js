import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatarLinkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarLinkRef.current.value,
        });
    }

    return (
        <PopupWithForm name='popupChangeAvatar' title='Обновить Аватар' id='changeAvatarForm' buttonLabel='Сохранить' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} onClick={props.onClick}>
            <input className="popup__input" ref={avatarLinkRef} type="url" name="popup__link" id="popup__linkAvatar" placeholder="Ссылка на картинку" required />
            <span className="error" id="popup__linkAvatar-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup