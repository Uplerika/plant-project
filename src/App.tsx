import React from "react";
import styles from "./scss/app.module.scss";

import Header from "./components/Header/header";

import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC<any> = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
      <footer>© 2022 React Plant Shop</footer>
    </>
  );
};

export default App;
