import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/FormAuth/Login";

const LoginPage: React.FC = () => {
  return (
    <div className="form">
      <h1>Вход</h1>
      <p>Необходимо войти в систему для оформления заказа</p>
      <Login />
      <p>
        Нет аккаунта? <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
};

export default LoginPage;
