import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/img/Plant_logo.svg";

import "./header.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useAuth from "../../utils/useAuth";
import { removeUser } from "../../redux/actions/auth";

const Header: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();

  const navigate = useNavigate();

  const { totalPrice, totalCount } = useSelector(
    (state: RootState) => state.cart
  );

  const handleLoginOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        alert("произошла ошибка");
      });
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="110" src={logo} alt="logo" />
            <div>
              <h1>React Plants Shop</h1>
              <p>Интернет-магазин комнатных растений</p>
            </div>
          </div>
        </Link>

        <div className="header__cart">
          <Link to="/cart">
            <Button type="button" className="button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{totalCount}</span>
            </Button>
          </Link>
          <label className="dropdown">
            <div className="dd-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                width="25"
                height="25"
              >
                <g id="_01_align_center" data-name="01 align center">
                  <path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H20.8a3.2,3.2,0,0,0,3.2-3.2v-10.4ZM15,22.026H9V17a3,3,0,0,1,6,0Zm7-1.2a1.2,1.2,0,0,1-1.2,1.2H17V17A5,5,0,0,0,7,17v5.026H3.2a1.2,1.2,0,0,1-1.2-1.2V11.319l10-9,10,9Z" />
                </g>
              </svg>
            </div>

            <input type="checkbox" className="dd-input" id="test" />

            <ul className="dd-menu">
              {isAuth ? (
                <>
                  <li>
                    <span onClick={handleLoginOut}>
                      Выйти <br></br>
                      {email}
                    </span>
                  </li>
                  <li>
                    <Link to="/orders">
                      <span>Мои заказы</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <span>Войти</span>
                  </Link>
                </li>
              )}
            </ul>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
