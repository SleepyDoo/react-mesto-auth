import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name='bio' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <input className="form__input form__input_content_name" id="profile-name-input" type="text" placeholder="Имя" name="name" required minLength={2} maxLength={40}
        onChange={handleNameChange} value={name || ''}/>
      <span className="form__error" id="profile-name-input-error" />
      <input className="form__input form__input_content_description" id="description-input" type="text" placeholder="Описание" name="about" required minLength={2} maxLength={200}
        onChange={handleDescriptionChange} value={description || ''}/>
      <span className="form__error" id="description-input-error" />
    </PopupWithForm>
  )
}