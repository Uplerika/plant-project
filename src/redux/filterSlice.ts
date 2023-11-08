import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderByDirection } from 'firebase/firestore';


type Sort = {
  name: string;
  sortName: string;
  order: OrderByDirection;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortType: Sort;
}
const initialState: FilterSliceState = {
    categoryId: 0,
    searchValue: '',
    sortType: {
        name: "Сначала популярные",
        sortName: "rating",
        order: "desc",
      },
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
        state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
        state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setSearchValue } = filterSlice.actions
export default filterSlice.reducer