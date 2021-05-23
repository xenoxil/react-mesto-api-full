import React from 'react'
import vector1 from '../images/Vector-1.svg'
import vector from '../images/Vector.svg'
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function Card(props) {
  const userProfile = React.useContext(CurrentUserContext);

  const isOwn = props.cardObj.owner._id === userProfile._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.cardObj.likes.some(i => i._id === userProfile._id);

  function likeCard() {
    props.onCardLike(props.cardObj)
  }
  function deleteCard() {
    props.onCardDelete(props.cardObj)
  }

  function handleClick() {
    props.onCardClick(props.cardObj);
  }
  return (
    <li className="element">
      <div className="element__container">
        <img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
      </div>
      {isOwn &&
        <button className="element__trashbtn hover" type="button" aria-label="Кнопка удалить" onClick={deleteCard} >
          <img src={vector1} alt="Кнопка удалить" className="element__trashpic" />
          <img src={vector} alt="Кнопка удалить" className="element__trashpic" />
        </button> 
      }
      <div className="element__footer">
        <h2 className="element__title" >{props.name}</h2>
        <div>
          <button className={isLiked ? 'element__likebtn element__likebtn_active' : 'element__likebtn'} type="button" aria-label="Кнопка лайк" onClick={likeCard} />
          <span className="element__likecounter">{props.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card