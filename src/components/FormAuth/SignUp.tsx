import { useDispatch } from "react-redux";
import Form from "./Form";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { setUser } from "../../redux/authSlice";

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email as string,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate("/cart");
      })
      .catch((e) => console.error("Произошла ошибка! Попробуйте еще раз.", e));
  };
  return <Form title="Зарегистрироваться" handleClickAuth={handleRegister} />;
};

export default SignUp;
