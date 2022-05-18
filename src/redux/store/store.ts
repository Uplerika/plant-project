import { createStore, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer";
import { persistStore, persistReducer } from 'redux-persist';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'userInfo',
  storage: storage,
  whitelist: ['cart', 'auth']
};
const presistedReducer = persistReducer(persistConfig, rootReducer );

const store = createStore(presistedReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export { persistor, store };
