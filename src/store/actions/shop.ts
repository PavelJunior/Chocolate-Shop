import {AppActions} from '../types/actions';

export const addToCart = (id: number, quantity: number): AppActions => ({
  type: 'ADD_PRODUCT_TO_CART',
  id: id,
  quantity: quantity,
});
