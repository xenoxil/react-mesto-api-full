import React, { useRef } from "react";
import { Link,withRouter } from "react-router-dom";

function Register(props) {
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegisterClick(email.current.value, password.current.value);    
  }
  return (
    <section className="login">
      <form
        className="login__form"
        id="registerForm"
        name="registerForm"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="login__header">Регистрация</h2>
        <input
          className="login__input"
          type="email"
          ref={email}
          name="registerName"
          id="registerName"
          placeholder="Email"
          required
          minLength={2}
          maxLength={40}
        />
        <span className="error" id="registerName-error" />
        <input
          className="login__input"
          type="password"
          ref={password}
          name="registerPassword"
          id="registerPassword"
          placeholder="Пароль"
          required
          minLength={8}
          maxLength={30}
        />
        <span className="error" id="registerPassword-error" />
        <button
          className="login__submitbtn hover"
          type="submit"
          aria-label="Кнопка регистрации"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="login__link hover">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default withRouter(Register);
