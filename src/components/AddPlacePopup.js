import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {

    const [cardName, setCardName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleCardNameChange(evt) {
        setCardName(evt.target.value)
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: cardName,
            link
        })
    }

    React.useEffect(() => {
        setCardName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm name='element' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Создать'>
            <input className="form__input" id="element-name-input" type="text" placeholder="Название" name="name" required maxLength={30} minLength={2}
                onChange={handleCardNameChange} value={cardName || ''} />
            <span className="form__error" id="element-name-input-error" />
            <input className="form__input" id="url-input" type="url" placeholder="Ссылка на картинку" name="link" required
                onChange={handleLinkChange} value={link || ''} />
            <span className="form__error" id="url-input-error" />
        </PopupWithForm>
    )
}