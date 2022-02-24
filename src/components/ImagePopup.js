function ImagePopup(props) {
  return (
    <div className={`popup popup_content_big-image ${(props.card.name && props.card.link) ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__paragraph">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;