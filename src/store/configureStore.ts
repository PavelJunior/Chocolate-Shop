import {combineReducers, createStore} from 'redux';
import shop from './reducers/shop';

export const rootReducer = combineReducers({shop});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
