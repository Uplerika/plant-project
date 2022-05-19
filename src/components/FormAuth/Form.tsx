import React from "react";
import { useForm } from "react-hook-form";
import { FormProps } from "../../interfaces/types";
import Button from "../Button/Button";
import "./Form.scss";

interface FormInputsProps {
  email: string;
  pass: string;
}
const Form: React.FC<FormProps> = ({ title, handleClickAuth }) => {
  //const [email, setEmail] = React.useState("");
  //const [pass, setPass] = React.useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputsProps>({ mode: "onBlur" });

  const handleSubmitButton = ({ email, pass }) => {
    handleClickAuth(email, pass);
    //console.log(email, pass);
  };

  return (
    <form className="form__auth" onSubmit={handleSubmit(handleSubmitButton)}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          //value={email}
          //pattern="^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$"
          //onChange={(e) => setEmail(e.target.value)}
          //required
          placeholder="email"
          className="input"
          {...register("email", {
            required: "Укажите Ваш email",
            pattern: {
              value:
                /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/u,
              message: "Введите верный email",
            },
          })}
        />
        {errors?.email && (
          <div style={{ color: "red" }}>
            {errors?.email?.message || "Error!"}
          </div>
        )}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="password"
          //value={pass}
          //onChange={(e) => setPass(e.target.value)}
          placeholder="Пароль"
          className="input"
          {...register("pass", {
            required: "Укажите Ваш пароль",
            minLength: {
              value: 6,
              message: "Минимум 6 символов",
            },
          })}
        />
        {errors?.pass && (
          <div style={{ color: "red" }}>
            {errors?.pass?.message || "Error!"}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="button button--black"
        //onClick={() => handleClickAuth(email, pass)}
      >
        <span>{title}</span>
      </Button>
    </form>
  );
};

export default Form;
