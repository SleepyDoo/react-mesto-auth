import logoPath from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import React from "react";
function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип" />
      {location.pathname === "/sign-in" ? (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) : location.pathname === "/sign-up" ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) : location.pathname === "/" ? (
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
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
