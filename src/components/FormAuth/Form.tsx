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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputsProps>({ mode: "onBlur" });

  const handleSubmitButton = ({ email, pass }) => {
    handleClickAuth(email, pass);
  };

  return (
    <form className="form__auth" onSubmit={handleSubmit(handleSubmitButton)}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="email"
          className="input"
          {...register("email", {
            required: "Укажите Ваш email",
            pattern: {
              value:
                /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/u, // eslint-disable-line
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
      <Button type="submit" className="button button--black">
        <span>{title}</span>
      </Button>
    </form>
  );
};

export default Form;
