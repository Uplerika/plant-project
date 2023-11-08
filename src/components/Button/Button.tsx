import classNames from "classnames";
import React from "react";
import "./Button.scss";

interface ButtonCartProps {
  children?: React.ReactNode;
  onClick?: () => void;
  onSubmit?: () => void;
  type: "button" | "submit" | "reset" | undefined;
  className: string;
  outline?: boolean;
}
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
