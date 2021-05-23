import React from 'react'


function ImagePopup(props) {

  return (
    <section className={props.card.link !== '#' ? `popup popupImage popup_status_opened` : `popup popupImage`}>
      <div className="popup__imagecontainer">
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h3 className="popup__element" >{props.card.name}</h3>
        <button className="popup__closebtn popup__closeBtnImage hover" type="button" aria-label="Кнопка закрыть" onClick={props.onClose} />
      </div>
    </section>
  )
}

export default ImagePopup;