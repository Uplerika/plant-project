import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/FormAuth/SignUp";

const RegisterPage = () => {
  return (
    <div className="form">
      <h1>Регистрация</h1>
      <SignUp />
      <p>
        Уже зарегистрированы? <Link to="/login">Войти в личный кабинет</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
