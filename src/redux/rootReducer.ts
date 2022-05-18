import { combineReducers } from 'redux';
import auth from './reducers/auth';
import cart from './reducers/cart';
import filters from './reducers/filtres';
import plants from './reducers/plants';

const rootReducer = combineReducers({
    cart,
    plants,
    auth,
    filters,
});

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>;
