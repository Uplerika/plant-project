import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryId, setSearchValue } from "../../redux/filterSlice";
import { AppDispatch } from "../../redux/store";
import { debounce } from "../../utils/debounce";

const SearchInput: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [input, setInput] = React.useState<string>("");

  const searchClear = () => {
    dispatch(setSearchValue(""));
    setInput("");
    searchRef.current?.focus();
  };
  const debounceSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
      dispatch(setCategoryId(0));
    }, 1000),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    debounceSearchValue(e.target.value);
  };
  return (
    <form className="search">
      <svg
        className="search__icon"
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
        className="search__input"
        ref={searchRef}
        type="text"
        placeholder="Поиск..."
        value={input}
        onChange={handleInputChange}
      />
      {input && (
        <svg
          className="search__clear-icon"
          onClick={searchClear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 96 960 960"
        >
          <path d="m251.333 851.333-46.666-46.666L433.334 576 204.667 347.333l46.666-46.666L480 529.334l228.667-228.667 46.666 46.666L526.666 576l228.667 228.667-46.666 46.666L480 622.666 251.333 851.333Z" />
        </svg>
      )}
    </form>
  );
});

export default SearchInput;
