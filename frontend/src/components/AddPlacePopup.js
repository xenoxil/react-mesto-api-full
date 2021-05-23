import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const placeNameRef = React.useRef();
    const placeLinkRef = React.useRef();


    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeNameRef.current.value,
            link: placeLinkRef.current.value
        })
        placeNameRef.current.value='';
        placeLinkRef.current.value='';
    }


    return (
        <PopupWithForm name='popupAddNewElement' onSubmit={handleSubmit} title='Новое место' id='addNewElementForm' buttonLabel='Сохранить' isOpen={props.isOpen} onClose={props.onClose}>
            <input className="popup__input" ref={placeNameRef} type="text" name="popup__title" id="popup__title" placeholder="Название" required minLength={2} maxLength={30} />
            <span className="error" id="popup__title-error" />
            <input className="popup__input" ref={placeLinkRef} type="url" name="popup__link" id="popup__link" placeholder="Ссылка на картинку" required />
            <span className="error" id="popup__link-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup