import React from "react";

function Login(props) {
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
    props.setEmail(email);
    props.handleLogin({ email, password });
  }

  return (
    <section className="register">
      <h1 className="register__heading">Вход</h1>
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
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
