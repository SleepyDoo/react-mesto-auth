import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {


  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__main">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
          <div className="profile__avatar-edit-button" onClick={props.onEditAvatar} />
          <div className="profile__profile-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile} />
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {props.cards.map((card) =>
          (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
        )}

      </section>
    </main>
  )
}

export default Main