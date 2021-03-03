import {
  ADD_PRODUCT_TO_CART,
  AppActions,
  CHANGE_QUANTITY_IN_CART,
  DELETE_EVERYTHING_FROM_CART,
  FETCH_PRODUCTS,
  LOAD_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './../types/actions';
import axios from 'axios';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ShopStateCartItem} from '../types/shop';
import {AppState} from '../configureStore';

export const loadCart = (cart: ShopStateCartItem[]) => (
  dispatch: Dispatch<AppActions>,
) => {
  dispatch({type: LOAD_CART, cart: cart});
};

export const addToCart = (id: string, quantity: number) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState,
) => {
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    id: id,
    quantity: quantity,
  });

  localStorage.setItem('shoppingCart', JSON.stringify(getState().shop.cart));
};

export const removeFromCart = (id: string) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState,
) => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    id: id,
  });

  localStorage.setItem('shoppingCart', JSON.stringify(getState().shop.cart));
};

export const changeQuantityInCart = (id: string, quantity: number) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState,
) => {
  dispatch({
    type: CHANGE_QUANTITY_IN_CART,
    id: id,
    quantity: quantity,
  });

  localStorage.setItem('shoppingCart', JSON.stringify(getState().shop.cart));
};

export const deleteEverythingFromCart = (): AppActions => ({
  type: DELETE_EVERYTHING_FROM_CART,
});

export const fetchProducts = (): ThunkAction<
  Promise<void>,
  any,
  any,
  AppActions
> => {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    const {data} = await axios.get('/api/products');
    console.log(data);

    dispatch({type: FETCH_PRODUCTS, products: data});
  };
};
