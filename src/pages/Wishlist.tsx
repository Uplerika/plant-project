import ProductItem from "../components/ProductItem/ProductItem";
import { arrayRemove, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { db } from "../utils/firebase";
import cartEmptyImg from "../assets/img/Shopping_cart.png";
import { useRef } from "react";
import { ICartItem } from "../interfaces/types";

const Wishlist: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const [wishlist, setWishlist] = React.useState<ICartItem[]>([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (userId) {
      setisLoading(true);
      const listRef = doc(db, "wishlist", userId);
      const getOrders = async () => {
        try {
          const docData = await getDoc(listRef);
          if (docData.exists()) {
            setWishlist(docData.data().items);
          } else {
            //console.log("No Items in Wishlist");
          }
        } catch (err) {
          console.error("данные не пришли", err);
          setError(true);
        } finally {
          setisLoading(false);
        }
      };
      getOrders();
      return () => {
        getOrders();
      };
    }
  }, [userId]);

  const buttonRef = useRef<HTMLButtonElement[]>([]);
  React.useEffect(() => {
    if (wishlist && buttonRef.current !== null) {
      buttonRef.current.forEach((like) => {
        like && (like.style.display = "none");
      });
    }
  }, [wishlist]);

  const user = useSelector((state: RootState) => state.auth.id);
  const removeFromWishlist = async (obj) => {
    const wishlistRef = doc(db, "wishlist", user);
    try {
      await setDoc(wishlistRef, { items: arrayRemove(obj) }, { merge: true });
      setWishlist((prev) => prev.filter((el) => el.id !== obj.id));
    } catch (error) {
      console.error("Wishlist ERROR", error);
    }
  };

  if (error) {
    return (
      <div className="cart cart--empty">
        Произошла ошибка. Попробуйте позже.
      </div>
    );
  }
  return (
    <div className="container">
      {isLoading ? (
        <div className="cart cart--empty">
          <h2>
            Подождите. <br></br> Идет загрузка Вашего списка Желаний.<i>⏳</i>
          </h2>
        </div>
      ) : userId && wishlist.length > 0 ? (
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
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
              Мои Желания
            </h2>
          </div>
          <div className="content__items">
            {wishlist.map((obj, i) => (
              <div key={obj.id}>
                <div className="product-block__heart-minus">
                  <button
                    className={`heart-minus`}
                    type="button"
                    title="Удалить из желаний"
                    aria-label="Удалить из избранное"
                    onClick={() => removeFromWishlist(obj)}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.333 19.208Zm0 16.125-4.125-3.75q-3.916-3.541-6.396-6.041-2.479-2.5-3.916-4.459-1.438-1.958-1.979-3.645-.542-1.688-.542-3.521 0-3.959 2.646-6.646 2.646-2.688 6.521-2.688 2.291 0 4.291 1.021 2 1.021 3.5 2.938 1.625-2 3.584-2.979 1.958-.98 4.166-.98 3.75 0 6.459 2.625 2.708 2.625 2.708 6.709 0 1.041-.167 1.916-.166.875-.416 1.459H31.333q.292-.667.521-1.604.229-.938.229-1.813 0-2.75-1.875-4.437-1.875-1.688-4.125-1.688-2.041 0-3.791 1.229T19.5 12.375h-2.375Q16.083 10.25 14.333 9q-1.75-1.25-3.791-1.25-2.584 0-4.292 1.75-1.708 1.75-1.708 4.417 0 1.458.541 2.875.542 1.416 2.042 3.312 1.5 1.896 4.208 4.521 2.709 2.625 7 6.542 1.167-1.084 2.292-2.084 1.125-1 2.167-1.875l.354.334q.354.333.771.75l.75.75.333.333q-1 .958-2.146 1.958t-2.396 2.084Zm6.125-12.083v-3.167h13.75v3.167Z"></path>
                    </svg>
                  </button>
                </div>
                <ProductItem
                  {...obj}
                  ref={(obj) =>
                    (buttonRef.current[i] = obj as HTMLButtonElement)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="cart cart--empty">
          <h2>
            В списке желаний пусто <i>😕</i>
          </h2>
          <p>
            Чтобы добавить растнение в список желаний перейдите на главную
            страницу.
          </p>
          <img src={cartEmptyImg} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
