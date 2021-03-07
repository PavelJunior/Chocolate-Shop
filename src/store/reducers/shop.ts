import {ShopState, ShopStateCartItem, ShopStateProduct} from '../types/shop';
import {
  ADD_PRODUCT_TO_CART,
  CHANGE_QUANTITY_IN_CART,
  DELETE_EVERYTHING_FROM_CART,
  FETCH_PRODUCTS,
  LOAD_CART,
  REMOVE_PRODUCT_FROM_CART,
  ShopActionTypes,
} from '../types/actions';

const reducer = (
  state: ShopState = initialState,
  action: ShopActionTypes,
): ShopState => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      let updatedCart = [...state.cart];
      const indexToUpdate = updatedCart.findIndex(
        (p: ShopStateCartItem) => p.id === action.id,
      );

      if (indexToUpdate !== -1) {
        const precessingItem = updatedCart[indexToUpdate];
        const newQty = getNewQty(
          precessingItem.maximumQuantity,
          precessingItem.quantity,
          action.quantity,
        );
        let itemToUpdate = {...precessingItem, quantity: newQty};
        updatedCart[indexToUpdate] = itemToUpdate;
      } else {
        const productToCart = state.products.find(
          (p: ShopStateProduct) => p.id === action.id,
        );

        if (productToCart === undefined) return state;

        const newQty = getNewQty(
          productToCart.maximumQuantity,
          0,
          action.quantity,
        );

        const itemToAdd = {
          ...productToCart,
          quantity: newQty,
        };
        updatedCart.push(itemToAdd);
      }

      return {...state, cart: updatedCart};
    }

    case REMOVE_PRODUCT_FROM_CART: {
      let updatedCart = [...state.cart];
      let indexToRemove = updatedCart.findIndex((i) => i.id === action.id);
      if (indexToRemove === undefined) return state;
      updatedCart.splice(indexToRemove, 1);

      return {...state, cart: updatedCart};
    }

    case CHANGE_QUANTITY_IN_CART: {
      let updatedCart = [...state.cart];
      let indexToUpdate = updatedCart.findIndex((i) => i.id === action.id);
      if (indexToUpdate === undefined) return state;
      let processingItem = updatedCart[indexToUpdate];
      const newQty = getNewQty(
        processingItem.maximumQuantity,
        action.quantity,
        0,
      );
      let itemToUpdate = {...processingItem, quantity: newQty};
      updatedCart[indexToUpdate] = itemToUpdate;
      return {...state, cart: updatedCart};
    }

    case LOAD_CART: {
      return {...state, cart: action.cart};
    }

    case DELETE_EVERYTHING_FROM_CART: {
      return {...state, cart: []};
    }

    case FETCH_PRODUCTS: {
      return {...state, products: action.products};
    }

    default:
      return state;
  }
};

const getNewQty = (maxQty: number, curQty: number, addToCur: number) => {
  return Math.max(1, Math.min(maxQty, curQty + addToCur));
};

let initialState: ShopState = {
  products: [],
  cart: [],
};

export default reducer;
