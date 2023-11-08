import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthSlice {
  email: string,
  token: string;
  id: string;
}
const initialState = {
    email: '',
    token: '',
    id: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IAuthSlice>) {
        state.email = action.payload.email;
        state.token = action.payload.token;
        state.id = action.payload.id;
    },
    removeUser(state) {
        state.email = '';
        state.token = '';
        state.id = '';
    },
  },
});

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer