import React from 'react'
function PopupWithForm(props) {

  return (

    <section className={props.isOpen ? `popup  ${props.name} popup_status_opened` : `popup  ${props.name}`} onClick={props.onClick}>
      <form className="popup__container popup__form" id={props.id} name={props.id} autoComplete="off" noValidate onSubmit={props.onSubmit}>
        <h3 className="popup__header">{props.title}</h3>
        {props.children}
        <button className="popup__submitbtn popup__submitProfile" type="submit" aria-label="Кнопка сохранить ">{props.buttonLabel}</button>
        <button className="popup__closebtn popup__closeBtnEdit hover" type="reset" aria-label="Кнопка закрыть" onClick={props.onClose} />
      </form>
    </section>



  )
}

export default PopupWithForm