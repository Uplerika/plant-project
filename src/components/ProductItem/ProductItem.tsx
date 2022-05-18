import React from "react";
import cn from "classnames";
import "./ProductItem.scss";

import Button from "../Button/Button";
import { IProduct } from "../../interfaces/types";

export interface IProductItem extends IProduct {
  IProductItem;
  addedCount: number;
  onClickAddPlant: (obj) => void;
}

const ProductItem: React.FC<IProductItem> = ({
  id,
  imageUrl,
  title,
  price,
  sizes,
  onClickAddPlant,
  addedCount,
}) => {
  const ourSizes = [15, 25, 30];
  // const ourPrice = [{ 15: 1000 }, { 25: 2000 }, { 30: 3000 }];

  const [activeSize, setActiveSize] = React.useState(1);

  const onSelectSize = (index) => {
    setActiveSize(index);
  };

  const onAddPlant = () => {
    const obj = {
      id,
      title,
      imageUrl,
      price,
      size: ourSizes[activeSize],
    };
    onClickAddPlant(obj);
  };

  return (
    <div className="product-block">
      <img
        className="product-block__image"
        width="250px"
        height="250px"
        src={imageUrl}
        alt={title}
      />
      <div className="product-block__layout">
        <h4 className="product-block__title">{title}</h4>
        <div className="product-block__selector">
          <ul>
            {ourSizes.map((size, index) => (
              <li
                key={size}
                onClick={() => onSelectSize(index)}
                className={cn({
                  active: activeSize === index,
                  disabled: !sizes.includes(size),
                })}
              >
                d{size}
              </li>
            ))}
          </ul>
        </div>
        <div className="product-block__bottom">
          <div className="product-block__price">от {price} ₽</div>
          <Button
            type="button"
            onClick={onAddPlant}
            className="button--add"
            //outline
          >
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
            {addedCount && <i>{addedCount}</i>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
