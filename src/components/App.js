import Header from "./Header.js";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import auth from "../utils/Auth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import authOkImg from "../images/registerOK.svg";
import authBadImg from "../images/LoginBAD.svg";
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);
  const [toolTipInfo, setToolTipInfo] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const authOk = { img: authOkImg, text: "Вы успешно зарегистрировались!" };
  // prettier-ignore
  const authBad = {img: authBadImg, text: 'Что-то пошло не так! Попробуйте ещё раз'}

  const history = useHistory();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.data.email);
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        setToolTipInfo(authOk);
        history.push("/sign-in");
      })
      .catch((err) => {
        setToolTipInfo(authBad);
        console.log(err);
      })
      .finally(() => {
        setIsToolTipOpen(true);
      });
  }

  function handleLogin(data) {
    auth
      .signIn(data)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
        }
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setToolTipInfo(authBad);
        setIsToolTipOpen(true);
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfileBio(data)
      .then((newData) => {
        setCurrentUser(newData);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsToolTipOpen(false);
  }

  // cards

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((elem) => elem !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="window">
        <div className="page">
          <Header email={email} handleLogOut={handleLogOut} />
          <Switch>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} setEmail={setEmail} />
            </Route>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoggedIn={isLoggedIn}
              cards={cards}
              exact
              path="/"
            />
            <Route path="*">
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            <Main />
          </Switch>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoToolTip
            isOpen={isToolTipOpen}
            onClose={closeAllPopups}
            info={toolTipInfo}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
