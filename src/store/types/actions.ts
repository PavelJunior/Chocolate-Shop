import {CheckoutForm} from './../types/checkout';
import {NotificationItem} from '../types/notification';
import {ShopStateCartItem, ShopStateProduct} from './shop';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const LOAD_CART = 'LOAD_CART';
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const CHANGE_QUANTITY_IN_CART = 'CHANGE_QUANTITY_IN_CART';
export const DELETE_EVERYTHING_FROM_CART = 'DELETE_EVERYTHING_FROM_CART';

interface AddProductToCartAction {
  type: typeof ADD_PRODUCT_TO_CART;
  id: string;
  quantity: number;
}

interface RemoveProductFromCartAction {
  type: typeof REMOVE_PRODUCT_FROM_CART;
  id: string;
}

interface ChangeQuantityOfProduct {
  type: typeof CHANGE_QUANTITY_IN_CART;
  id: string;
  quantity: number;
}

interface DeleteEverythingFromCart {
  type: typeof DELETE_EVERYTHING_FROM_CART;
}

interface FetchProducts {
  type: typeof FETCH_PRODUCTS;
  products: ShopStateProduct[];
}

interface LoadCart {
  type: typeof LOAD_CART;
  cart: ShopStateCartItem[];
}

export const CHECKOUT_CHANGE_FORM_VALUES = 'CHECKOUT_CHANGE_FORM_VALUES';
export const CHECKOUT_CHANGE_STEP_VALUE = 'CHECKOUT_CHANGE_STEP_VALUE';

interface ChangeFormValues {
  type: typeof CHECKOUT_CHANGE_FORM_VALUES;
  form: CheckoutForm;
}

interface ChangeStepValue {
  type: typeof CHECKOUT_CHANGE_STEP_VALUE;
  step: number;
}

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

interface AddNotification {
  type: typeof ADD_NOTIFICATION;
  notification: NotificationItem;
}

interface DeleteNotification {
  type: typeof DELETE_NOTIFICATION;
  id: number;
}

export type ShopActionTypes =
  | AddProductToCartAction
  | RemoveProductFromCartAction
  | ChangeQuantityOfProduct
  | DeleteEverythingFromCart
  | FetchProducts
  | LoadCart;

export type CheckoutActionsTypes = ChangeFormValues | ChangeStepValue;

export type NotificationActionsTypes = AddNotification | DeleteNotification;

export type AppActions =
  | ShopActionTypes
  | CheckoutActionsTypes
  | NotificationActionsTypes;
