import { Link } from "react-router-dom";
import SignUp from "../components/FormAuth/SignUp";

const RegisterPage = () => {
  return (
    <div className="form">
      <h1>Регистрация</h1>
      <p>Необходимо пройти регистрацию для оформления заказа</p>
      <SignUp />
      <p>
        Уже зарегистрированы? <Link to="/login">Войти в личный кабинет</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
