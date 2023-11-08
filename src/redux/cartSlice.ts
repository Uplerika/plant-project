import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../interfaces/types';

interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    items: ICartItem[];
  }

  const calcTotalPrice = (items: ICartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const calcTotalCount = (items: ICartItem[]) => {
    return items.reduce((sum, obj) => obj.count + sum, 0);
};
  const data = localStorage.getItem('cart');
  const cartItems = data !== null ? JSON.parse(data) : [];

const initialState = {
    items:  cartItems,
    totalPrice: calcTotalPrice(cartItems),
    totalCount: calcTotalCount(cartItems),
} as CartSliceState;


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem(state, action: PayloadAction<ICartItem>) {
        const findItem = state.items.find((obj) => obj.id === action.payload.id);
        if (findItem) {
          findItem.count++;
        } else {
          state.items.push({
            ...action.payload,
            count: 1,
          });
        }
  
        state.totalPrice = calcTotalPrice(state.items);
        state.totalCount = calcTotalCount(state.items);
        
        localStorage.setItem("cart", JSON.stringify(state.items.map(item=>item)));
      },
      minusItem(state, action: PayloadAction<string>) {
        const findItem = state.items.find((obj) => obj.id === action.payload);
  
        if (findItem) {
          findItem.count--;
        }
  
        state.totalPrice = calcTotalPrice(state.items);
        state.totalCount = calcTotalCount(state.items);
      },
      removeItem(state, action: PayloadAction<string>) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
        state.totalPrice = calcTotalPrice(state.items);
        state.totalCount = calcTotalCount(state.items);
      },
      clearCart(state) {
        state.items = [];
        state.totalPrice = 0;
        state.totalCount = 0;
      },
    },
  });
  
  export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;
  
  export default cartSlice.reducer;