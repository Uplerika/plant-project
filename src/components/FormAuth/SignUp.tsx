import React from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/store";

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/cart");
      })
      .catch(() => alert("Произошла ошибка! Попробуйте еще раз."));
  };
  return <Form title="Зарегистрироваться" handleClickAuth={handleRegister} />;
};

export default SignUp;
