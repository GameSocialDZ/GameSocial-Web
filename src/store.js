// Redux Store -> reducers -> actions
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import promise from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Redux Dev tools extension
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise,thunk))
);

persistStore(store);

export default store;