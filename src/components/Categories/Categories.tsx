import React from "react";
import "./Categories.scss";

interface CategoryProps {
  onSelectCategory: (index: number) => void;
  value: number;
}
const categoryNames = ["Все", "Пальмы", "Бонсай", "Фикусы"];

const Categories: React.FC<CategoryProps> = React.memo(
  ({ onSelectCategory, value }) => {
    return (
      <div className="categories">
        <ul>
          {categoryNames.map((name, index) => (
            <li
              key={index}
              className={value === index ? "active" : ""}
              onClick={() => onSelectCategory(index)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
