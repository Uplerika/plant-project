import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem/ProductItem";
import Categories from "../components/Categories/Categories";
import { RootState } from "../redux/rootReducer";
import { loadPlants } from "../redux/actions/plants";
import Loader from "../components/ProductItem/Loader";
import { addPlantToCart } from "../redux/actions/cart";
import { findPlant, setCategory } from "../redux/actions/filtres";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { IProduct } from "../interfaces/types";

const Home: React.FC<any> = () => {
  const categoryNames = ["Фикусы", "Пальмы", "Бонсай"];

  const dispatch = useDispatch();

  // const items = useSelector((state: RootState) => {
  //   return state.plants.items;
  // });

  const items = useSelector((state: RootState) => {
    return (state.plants.items = state.plants.items.filter((item) =>
      item.title.toLowerCase().includes(state.filters.searchValue.toLowerCase())
    ));
    // state.plants.items.filter((item) => {
    //   if (state.filters.category !== null) {
    //     item.category.includes(state.filters.category);
    //   } else {
    //     item.category.includes("");
    //   }
    // })
  });

  const isLoaded = useSelector((state: RootState) => state.plants.isLoaded);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { searchValue, category } = useSelector(
    (state: RootState) => state.filters
  );
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    dispatch(loadPlants());
  }, [searchValue, category]);

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
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  // const [filterCat, setfilterCat] = React.useState([]);
  // const filterCategoryButton = async () => {
  //   const citiesRef = collection(db, "products");
  //   const q = query(citiesRef, where("category", "==", 0));
  //   const data = await getDocs(q);
  //   setfilterCat(
  //     data.map((doc) => (doc.data(), id: doc.id)
  //   ))
  // };

  return (
    <div className="container">
      <form style={{ marginBottom: "20px" }} onSubmit={handleSearch}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Поиск</button>
      </form>
      <div className="content__top">
        {/* <button type="button" onClick={filterCategoryButton}>
          Фикус
        </button> */}
        <Categories
          value={category}
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
      </div>
      <h2 className="content__title">Все Растения</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((item) => (
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
function clearSearch(input: string): any {
  throw new Error("Function not implemented.");
}
