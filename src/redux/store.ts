import { configureStore } from '@reduxjs/toolkit';
import filters from './filterSlice';
import plants from './PlantsSlice';
import cart from './cartSlice';
import auth from './authSlice';

  export const store = configureStore({
    reducer: {
      filters,
      plants,
      cart,
      auth,
    },
  });
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
