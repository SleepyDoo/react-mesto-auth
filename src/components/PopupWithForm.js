function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_content_${props.name} popup_opened`
          : `popup popup_content_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_content_edit-bio"
          type="button"
          onClick={props.onClose}
        />
        <form className="form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="form__heading">{props.title}</h2>
          <fieldset className="form__fieldset">
            {props.children}
            <button className="form__save-button" type="submit">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
