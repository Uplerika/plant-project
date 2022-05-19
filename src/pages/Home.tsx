import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem/ProductItem";
import Categories from "../components/Categories/Categories";
import { RootState } from "../redux/rootReducer";
import { loadPlants } from "../redux/actions/plants";
import Loader from "../components/ProductItem/Loader";
import { addPlantToCart } from "../redux/actions/cart";
import { findPlant, setCategory } from "../redux/actions/filtres";
import Slider from "../components/Slider/Slider";
import slide_1 from "../assets/img/slide_1.jpeg";
import slide_2 from "../assets/img/slide_2.jpeg";
import slide_4 from "../assets/img/slide_4.jpeg";

const Home: React.FC<any> = () => {
  const categoryNames = ["Фикусы", "Пальмы", "Бонсай"];

  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => {
    return state.plants.items;
  });

  // const items = useSelector((state: RootState) => {
  //   return (state.plants.items = state.plants.items.filter((item) =>
  //     item.title.toLowerCase().includes(state.filters.searchValue.toLowerCase())
  //   ));
  // });

  const isLoaded = useSelector((state: RootState) => state.plants.isLoaded);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { searchValue, category } = useSelector(
    (state: RootState) => state.filters
  );
  const [input, setInput] = React.useState("");
  const [isSearchItems, setisSearchItems] = React.useState("");

  React.useEffect(() => {
    dispatch(loadPlants());
  }, []);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
    console.log(index);
  }, []);

  const handleAddPlantToCart = (obj) => {
    dispatch(addPlantToCart(obj));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(findPlant(input));
    setInput("");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <form className="search-block" onSubmit={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            width="25"
            height="25"
          >
            <g id="_01_align_center" data-name="01 align center">
              <path d="M24,22.586l-6.262-6.262a10.016,10.016,0,1,0-1.414,1.414L22.586,24ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
            </g>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Поиск..."
            value={input}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 64,
        }}
      >
        <Slider>
          <img src={slide_1} alt="slide_1" />
          <img src={slide_2} alt="slide_2" />
          <img src={slide_4} alt="slide_4" />
        </Slider>
      </div>
      <h2 className="content__title">Все Растения</h2>
      <div className="content__items">
        {isLoaded
          ? items
              .filter(
                (item) => category === null || item.category === category
                //: item.category !== category
              )
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((item) => (
                <ProductItem
                  key={item.id}
                  {...item}
                  onClickAddPlant={handleAddPlantToCart}
                  addedCount={
                    cartItems[item.id] && cartItems[item.id].items.length
                  }
                />
              ))
          : Array(8)
              .fill(0)
              .map((_, index) => <Loader key={index} />)}
      </div>
    </div>
  );
};
export { Home };
