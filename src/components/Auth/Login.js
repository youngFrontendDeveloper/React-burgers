import React from "react";
import { PropTypes } from "prop-types";

function Login(props) {
  return (
    <div className="login-container">
      <div className="login">
        <h2>Авторизация</h2>
        <p>Введите логин и пароль Вашего аккаунта GitHub</p>
        <button className="github" onClick={ () => props.authenticate() }>Войти</button>
      </div>
    </div> );
}

Login.propTypes = {
  authenticate: PropTypes.func
};

export default Login;