import {
  ADD_PRODUCT_TO_CART,
  AppActions,
  CHANGE_QUANTITY_IN_CART,
  DECREMENT_PRODUCT_IN_CART,
  DELETE_EVERYTHING_FROM_CART,
  INCREMENT_PRODUCT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './../types/actions';

export const addToCart = (id: number, quantity: number): AppActions => ({
  type: ADD_PRODUCT_TO_CART,
  id: id,
  quantity: quantity,
});

export const removeFromCart = (id: number): AppActions => ({
  type: REMOVE_PRODUCT_FROM_CART,
  id: id,
});

export const incrementInCart = (id: number): AppActions => ({
  type: INCREMENT_PRODUCT_IN_CART,
  id: id,
});

export const decrementInCart = (id: number): AppActions => ({
  type: DECREMENT_PRODUCT_IN_CART,
  id: id,
});

export const changeQuantityInCart = (
  id: number,
  quantity: number,
): AppActions => ({
  type: CHANGE_QUANTITY_IN_CART,
  id: id,
  quantity: quantity,
});

export const deleteEverythingFromCart = (): AppActions => ({
  type: DELETE_EVERYTHING_FROM_CART,
});
