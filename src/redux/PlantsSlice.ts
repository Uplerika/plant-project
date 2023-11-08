import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, OrderByDirection, query, where } from "firebase/firestore";
import { db } from '../utils/firebase';
import { IProduct } from '../interfaces/types';

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
export type PlantsParams = {
    categoryId?: number;
    sortBy: string;
    orderTo?:  OrderByDirection;
  };
  
const productsRef = collection(db, "products");

// First, create the thunk
export const fetchAllPlants = createAsyncThunk<any, PlantsParams>(
    'plants/fetchPlantsStatus',
    async (params,  thunkAPI)=> {
        const { categoryId, sortBy, orderTo} = params;
        const filterProductsRef = query(productsRef, 
          where("category", "array-contains", categoryId), 
          orderBy(sortBy, orderTo),
          );
          
        const querySnapshot = await getDocs(filterProductsRef);
        if (querySnapshot.docs.length !== 0) {
          const data  = querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as IProduct)
          );
          return thunkAPI.fulfillWithValue(data);
          } else {
            return thunkAPI.rejectWithValue('Пустой массив');
          }
            }
  )

const initialState = {
    items: [] as IProduct[],
    status: Status.LOADING as string,
}

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IProduct[]>) {
        state.items = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlants.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchAllPlants.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchAllPlants.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
})

// Action creators are generated for each case reducer function
export const {setItems} = plantsSlice.actions

export default plantsSlice.reducer
