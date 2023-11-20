import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem/ProductItem";
import Categories from "../components/Categories/Categories";
import { AppDispatch, RootState } from "../redux/store";
import Loader from "../components/ProductItem/Loader";
import Slider from "../components/Slider/Slider";
import slide_1 from "../assets/img/slide_1.jpeg";
import slide_2 from "../assets/img/slide_2.jpeg";
import slide_4 from "../assets/img/slide_4.jpeg";
import Sort from "../components/Sort/sort";
import { fetchAllPlants } from "../redux/PlantsSlice";
import { setCategoryId } from "../redux/filterSlice";
import SearchInput from "../components/Search/SearchInput";
import { IProduct } from "../interfaces/types";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, status } = useSelector((state: RootState) => {
    return state.plants;
  });
  const { categoryId, sortType, searchValue } = useSelector(
    (state: RootState) => state.filters
  );
  // Получаем все товары с firebase
  const getAllPlants = async () => {
    const sortBy = sortType.sortName;
    const orderTo = sortType.order;
    dispatch(fetchAllPlants({ categoryId, sortBy, orderTo }));
    //window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getAllPlants();
  }, [categoryId, sortType]);
  ///

  const onSelectCategory = React.useCallback(
    (index: number) => {
      dispatch(setCategoryId(index));
    },
    [dispatch]
  );

  const plants =
    items &&
    items
      .filter((obj: IProduct) => {
        if (obj.title.toLowerCase().includes(searchValue?.toLowerCase())) {
          return true;
        }
        return false;
      })
      .map((obj: IProduct) => <ProductItem key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Loader key={index} />);

  return (
    <div className="container">
      <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
        }}
      >
        <Slider>
          <img src={slide_1} alt="slide_1" />
          <img src={slide_2} alt="slide_2" />
          <img src={slide_4} alt="slide_4" />
        </Slider>
      </div>
      <div className="content__top">
        <Categories value={categoryId} onSelectCategory={onSelectCategory} />
        <SearchInput />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <h2 className="content__title">Все Растения</h2>
        <Sort value={sortType} />
      </div>
      {status === "loading" ? (
        <div className="content__items">{skeletons}</div>
      ) : (
        <>
          {items && items.length > 0 ? (
            <>
              <div className="content__items">{plants}</div>
              {plants.length === 0 && (
                <div className="cart cart--empty">
                  <h2>
                    Упс! Ничего не найдено<i>😕</i>
                  </h2>
                </div>
              )}
            </>
          ) : (
            <div className="cart cart--empty">
              <h2>Произошла ошибка 😕</h2>
              <p>
                К сожалению, не удалось получить товары. Попробуйте повторить
                попытку еще раз.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Home;
