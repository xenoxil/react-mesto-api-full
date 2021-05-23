import React from 'react'
import registerSuccess from '../images/registerSuccess.svg'
import registerDecline from '../images/registerDecline.svg'

function InfooTooltip(props) {

    return (
      <section className={props.isOpen ? 'popup popupImage popup_status_opened' : 'popup popupImage'}>
        <div className="popup__container">
          <img className="popup__image popup__registerimage" src={props.isSuccess ? registerSuccess : registerDecline} alt={props.isSuccess ? 'Успешная регистрация' : 'Что-то пошло не так'} />
          <h3 className="popup__header popup__registerheader" >{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}</h3>
          <button className="popup__closebtn popup__closeBtnImage hover" type="button" aria-label="Кнопка закрыть" onClick={props.onClose} />
        </div>
      </section>
    )
  }
  
  export default InfooTooltip;