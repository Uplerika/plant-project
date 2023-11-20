import React from "react";
import "./ProductItem.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addItem } from "../../redux/cartSlice";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

interface ProductItemsProps {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

type Ref = React.ForwardedRef<HTMLButtonElement>;
const ProductItem: React.FC<ProductItemsProps> = forwardRef(
  ({ id, imageUrl, title, price }: ProductItemsProps, ref: Ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const addedItem = useSelector((state: RootState) =>
      state.cart.items.find((obj) => obj.id === id)
    );

    const addedCount = addedItem ? addedItem.count : 0;
    const item = {
      id,
      title,
      imageUrl,
      price,
      count: 0,
    };

    const onAddPlant = () => {
      dispatch(addItem(item));
    };

    const [isAddWishlist, setAddWishlist] = React.useState(false);

    const user = useSelector((state: RootState) => state.auth.id);

    const notify = (type: NOTIFICATION_TYPE, title: string) => {
      Store.addNotification({
        title: title,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    };

    const addToWishlist = async () => {
      if (user && !isAddWishlist) {
        const wishlistRef = doc(db, "wishlist", user);
        try {
          await setDoc(
            wishlistRef,
            { items: arrayUnion(item) },
            { merge: true }
          );
          setAddWishlist(true);
          notify("success", `${title} добавлен в Мои Желания`);
        } catch (error) {
          //console.log("Wishlist ERROR");
        }
      } else {
        notify(
          "warning",
          `Войдите в Личный Кабинет, чтобы добавить ${title} в Мои Желания`
        );
      }
    };

    const removeFromWishlist = async () => {
      if (user && isAddWishlist) {
        const wishlistRef = doc(db, "wishlist", user);
        try {
          await setDoc(
            wishlistRef,
            { items: arrayRemove(item) },
            { merge: true }
          );
          setAddWishlist(false);
          notify("info", `${title} удален из списка Мои Желания`);
        } catch (error) {
          console.error("Wishlist ERROR", error);
        }
      }
    };

    return (
      <div className="product-block">
        <div id="wishlistRef" className="product-block__wishlist">
          <button
            className={`btn-heart ${isAddWishlist ? "active" : ""}`}
            ref={ref}
            type="button"
            title={
              !isAddWishlist
                ? "Добавить в избранное"
                : "Удалить из списка желаний"
            }
            onClick={!isAddWishlist ? addToWishlist : removeFromWishlist}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.1 7.25a5.06 5.06 0 00-4.96-4.75c-1.73 0-3.25.98-4.14 2.38A4.97 4.97 0 005.86 2.5 5.05 5.05 0 00.9 7.25c-.82 4.7 6.02 8.5 9.1 11.08 3.09-2.58 9.9-6.37 9.1-11.08z"></path>
            </svg>
          </button>
        </div>
        <Link key={id} to={`/plant/${id}`}>
          <img
            className="product-block__image"
            width="250px"
            height="250px"
            src={imageUrl}
            alt={title}
          />
        </Link>
        <div className="product-block__layout">
          <Link key={id} to={`/plant/${id}`}>
            <h4 className="product-block__title">{title}</h4>
          </Link>
          <div className="product-block__bottom">
            <div className="product-block__price">{price} ₽</div>
            <Button type="button" onClick={onAddPlant} className="button--add">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductItem;
