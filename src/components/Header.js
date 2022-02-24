import logoPath from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import React from "react";
function Header(props) {
  let location = useLocation();
  function label() {
    if (location.pathname === "/sign-in") {
      return (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      );
    } else if (location.pathname === "/sign-up") {
      return (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      );
    } else if (location.pathname === "/") {
      return (
        <div className="header__container">
          <p className="header__paragraph">{props.email}</p>
          <Link
            to="/sign-in"
            className="header__link header__link_place_main"
            onClick={props.handleLogOut}
          >
            Выйти
          </Link>
        </div>
      );
    }
  }
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип" />
      {label()}
    </header>
  );
}

export default Header;
