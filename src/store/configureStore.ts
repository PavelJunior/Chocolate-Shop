import {combineReducers, createStore} from 'redux';
import shop from './reducers/shop';
import checkout from './reducers/checkout';
import notifications from './reducers/notifications';

export const rootReducer = combineReducers({
  shop,
  checkout,
  notifications,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
