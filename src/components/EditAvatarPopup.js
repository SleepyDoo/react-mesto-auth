import PopupWithForm from "./PopupWithForm";
import React from 'react';

export default function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name='new-avatar' title='Обновить аватар' onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText='Сохранить'>
      <input ref={avatarRef} className="form__input" id="new-avatar-input" type="url" placeholder="Ссылка" name="avatar" required />
      <span className="form__error" id="new-avatar-input-error" />
    </PopupWithForm>
  )
}