import { Link } from "react-router-dom";
import React from "react";

export default function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitButtonClick(evt) {
    evt.preventDefault();
    props.handleRegister({ password, email });
  }

  return (
    <section className="register">
      <h1 className="register__heading">Регистрация</h1>
      <form className="register__form" onSubmit={handleSubmitButtonClick}>
        <input
          className="register__input"
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={handleEmailChange}
          value={email || ""}
        />
        <input
          className="register__input"
          type="password"
          placeholder="Пароль"
          name="password"
          required
          onChange={handlePasswordChange}
          value={password || ""}
        />
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__paragraph">
        Уже зарегистрированы?{" "}
        <Link className="register__sing-in" to="/sing-in">
          Войти
        </Link>
      </p>
    </section>
  );
}
