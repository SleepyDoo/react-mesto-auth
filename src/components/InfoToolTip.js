import registerImage from "../images/registerOK.svg";
export default function InfoToolTip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_content_edit-bio"
          type="button"
          onClick={props.onClose}
        />
        <div className="popup__tip-container">
          <img className="popup__symbol" src={props.info.img} />
          <p className="popup__tip-paragraph">{props.info.text}</p>
        </div>
      </div>
    </div>
  );
}
