import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__delete-icon ${isOwn ? '' : 'element__delete-icon_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <div className="element__img-container">
        <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
      </div>
      <div className="element__info">
        <h3 className="element__name">{props.card.name}</h3>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="element__likes-counter">{props.card.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
    </div>
  )
}