export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const INCREMENT_PRODUCT_IN_CART = 'INCREMENT_PRODUCT_IN_CART';
export const DECREMENT_PRODUCT_IN_CART = 'DECREMENT_PRODUCT_IN_CART';

interface AddProductToCartAction {
  type: typeof ADD_PRODUCT_TO_CART;
  id: number;
  quantity: number;
}

interface RemoveProductFromCartAction {
  type: typeof REMOVE_PRODUCT_FROM_CART;
  id: number;
}

interface IncrementProductAction {
  type: typeof INCREMENT_PRODUCT_IN_CART;
  id: number;
}

interface DecrementProductAction {
  type: typeof DECREMENT_PRODUCT_IN_CART;
  id: number;
}

export const CHECKOUT_CHANGE_FIELD_VALUE = 'CHECKOUT_CHANGE_FIELD_VALUE';

interface ChangeFieldValue {
  type: typeof CHECKOUT_CHANGE_FIELD_VALUE;
  field: string;
  value: string;
}

export type ShopActionTypes =
  | AddProductToCartAction
  | RemoveProductFromCartAction
  | IncrementProductAction
  | DecrementProductAction;

export type CheckoutActionsTypes = ChangeFieldValue;

export type AppActions = ShopActionTypes | CheckoutActionsTypes;
