import Header from "./Header.js";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
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

  const jwt = localStorage.getItem('jwt');

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)])
        .then(([user, cards]) => {
          setCurrentUser(user.data);
          setCards(cards.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, jwt]);

  React.useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
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
  }, [history, jwt]);

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
        console.log(data.data);
        if (data.data) {
          localStorage.setItem("jwt", data.data);
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
      .setAvatar(data, jwt)
      .then((newData) => {
        setCurrentUser(newData.data);
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfileBio(data, jwt)
      .then((newData) => {
        setCurrentUser(newData.data);
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
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(cards);
    console.log(isLiked);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCardsList = cards.map((c) => {
          //console.log(c);
          if (c._id === card._id) {
            return newCard.data 
          } else {
            return c;
          }
        })
        console.log(newCardsList);
        setCards(newCardsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id, jwt)
      .then(() => {
        setCards(cards.filter((elem) => elem !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data, jwt)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
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
