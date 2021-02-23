import {combineReducers, createStore} from 'redux';
import shop from './reducers/shop';
import checkout from './reducers/checkout';

export const rootReducer = combineReducers({shop, checkout});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
