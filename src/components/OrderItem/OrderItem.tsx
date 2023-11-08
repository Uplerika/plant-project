import React from "react";
import { ICartItem } from "../../interfaces/types";

export interface IOrderItem {
  id: string;
  totalPrice: number;
  totalCount: number;
  time: string;
  status: string;
  orderId: ICartItem[];
}
const OrderItem: React.FC<IOrderItem> = ({
  id,
  totalPrice,
  totalCount,
  time,
  status,
  orderId,
}) => {
  return (
    <tbody>
      <tr>
        <td rowSpan={orderId.length + 1}>{id}</td>
        <td></td>
        <td></td>
        <td rowSpan={orderId.length + 1}>{time}</td>
        <td rowSpan={orderId.length + 1}>{totalPrice} ₽</td>
        <td rowSpan={orderId.length + 1}>{totalCount} шт.</td>
        <td rowSpan={orderId.length + 1}>{status}</td>
      </tr>
      {orderId.map((el, i) => (
        <tr key={i}>
          <td>{el.title}</td>
          <td>{el.price}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderItem;
