import React from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Form from "./Form";
import { setUser } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/store";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/cart");
        console.log("Успешно вошли", user);
      })
      .catch((error) => {
        alert("Данного пользователя не существует");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return <Form title="Войти" handleClickAuth={handleLogin} />;
};

export default Login;
