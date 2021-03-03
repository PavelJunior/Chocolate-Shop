import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import shop from './reducers/shop';
import checkout from './reducers/checkout';
import notifications from './reducers/notifications';
import {AppActions} from './types/actions';

export const rootReducer = combineReducers({
  shop,
  checkout,
  notifications,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
);
