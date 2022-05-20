import React from "react";

const OrderItem = ({ id, totalPrice, totalCount, time, status }) => {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{time}</td>
        <td>{totalPrice} ₽</td>
        <td>{totalCount} шт.</td>
        <td>{status}</td>
      </tr>
    </>
  );
};

export default OrderItem;
