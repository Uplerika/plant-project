import React, { Suspense } from "react";
import styles from "./scss/app.module.scss";
import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { auth } from "./utils/firebase";
import { setUser } from "./redux/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Home from "./pages/Home";

const FullProductItem = React.lazy(
  () =>
    import(/* webpackChunkName: "FullProductItem" */ "./pages/FullProductItem")
);
const NotFoundPage = React.lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ "./pages/NotFoundPage")
);
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const Orders = React.lazy(
  () => import(/* webpackChunkName: "Orders" */ "./pages/Orders")
);
const LoginPage = React.lazy(
  () => import(/* webpackChunkName: "LoginPage" */ "./pages/LoginPage")
);

const Wishlist = React.lazy(
  () => import(/* webpackChunkName: "Wishlist" */ "./pages/Wishlist")
);
const RegisterPage = React.lazy(
  () => import(/* webpackChunkName: "RegisterPage" */ "./pages/RegisterPage")
);

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  //Check if user is logged in and set user data to persist state between page reloads
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email as string,
            id: user.uid,
            token: user.refreshToken,
          })
        );
      } else {
        dispatch(
          setUser({
            email: "",
            id: "",
            token: "",
          })
        );
      }
    });
  }, [dispatch]);
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <ReactNotifications />
        <main className={styles.content}>
          <Suspense fallback={<div className={styles.spinner}></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="plant/:id" element={<FullProductItem />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="orders" element={<Orders />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <footer>© 2022 React Plant Shop</footer>
    </>
  );
};

export default App;
