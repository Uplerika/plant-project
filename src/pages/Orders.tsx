import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderItem from "../components/OrderItem/OrderItem";
import { RootState } from "../redux/store";
import { db } from "../utils/firebase";
import cartEmptyImg from "../assets/img/Shopping_cart.png";
import { ICartItem } from "../interfaces/types";

interface OrdersProps {
  id: string;
  status: string;
  totalCount: number;
  time: string;
  totalPrice: number;
  items: ICartItem[];
}

const Orders: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.id);
  const [orders, setOrders] = React.useState([] as OrdersProps[]);
  const [isLoading, setisLoading] = React.useState(true);

  React.useEffect(() => {
    if (userId) {
      const getOrders = async () => {
        try {
          const ord = collection(db, `Buyer_id(${userId})`);
          const data = await getDocs(ord);
          setisLoading(false);
          setOrders(
            data.docs.map(
              (doc) => ({ ...doc.data(), id: doc.id } as OrdersProps)
            )
          );
          setisLoading(false);
        } catch (err) {
          //console.error("данные не пришли");
        }
      };
      getOrders();
    }
  }, [userId]);

  const ordersAll = orders.map((ord: OrdersProps) => ord.items);
  const orderId = ordersAll.map((ord: ICartItem[]) =>
    ord.map((el: ICartItem) => el)
  );

  return (
    <div className="container container__cart">
      {isLoading ? (
        <div className="cart cart--empty">
          <h2>
            Подождите. <br></br> Идет загрузка Ваших заказов.<i>⏳</i>
          </h2>
        </div>
      ) : userId && orders.length ? (
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
              Мои заказы
            </h2>
          </div>
          <div style={{ width: "100%", overflowY: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>№ заказа</th>
                  <th>Растения</th>
                  <th>Цена</th>
                  <th>Время заказа</th>
                  <th>Сумма заказа</th>
                  <th>Кол-во товаров</th>
                  <th>Статус заказа</th>
                </tr>
              </thead>

              {orders.map((obj: OrdersProps, i) => (
                <OrderItem
                  key={obj.id}
                  id={obj.id}
                  totalPrice={obj.totalPrice}
                  totalCount={obj.totalCount}
                  time={obj.time}
                  status={obj.status}
                  orderId={orderId[i]}
                />
              ))}
            </table>
          </div>
        </div>
      ) : (
        <div className="cart cart--empty">
          <h2>
            Заказов нет <i>😕</i>
          </h2>
          <p>
            Для того, чтобы заказать в нашем магазине, перейдите на главную
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

export default Orders;
