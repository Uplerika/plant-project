import classNames from "classnames";
import React from "react";
import { ButtonCartProps } from "../../interfaces/types";
import "./Button.scss";

const ButtonCart: React.FC<ButtonCartProps> = ({
  children,
  onClick,
  onSubmit,
  type,
  className,
  outline,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={classNames("button", className, {
        "button--outline": outline,
      })}
    >
      {children}
    </button>
  );
};

export default ButtonCart;
