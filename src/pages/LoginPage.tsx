import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/FormAuth/Login";

const LoginPage = () => {
  return (
    <div className="form">
      <h1>Вход</h1>
      <Login />
      <p>
        Нет аккаунта? <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
};

export default LoginPage;
