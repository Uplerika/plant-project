import React from "react";
import "./sort.scss";
import { setSortType } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { OrderByDirection } from "firebase/firestore";
import PopUp from "../PopUp/popUp";

type SortList = {
  name: string;
  sortName: string;
  order: OrderByDirection;
};

type SortPopupProps = {
  value: SortList;
};

const sortList: SortList[] = [
  { name: "Сначала популярные", sortName: "rating", order: "desc" },
  { name: "Сначала дешевле", sortName: "price", order: "asc" },
  { name: "Сначала дороже", sortName: "price", order: "desc" },
];

const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);

  const onSelectsortType = (obj: SortList) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  return (
    <PopUp
      value={
        <>
          <b>Сортировка по: </b>
          <span>{value.name}</span>
        </>
      }
      liList={
        <ul>
          {sortList.map((obj, i) => (
            <li
              key={i}
              className={
                value.sortName === obj.sortName && value.order === obj.order
                  ? "active"
                  : ""
              }
              onClick={() => onSelectsortType(obj)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      }
    />
  );
});

export default Sort;
