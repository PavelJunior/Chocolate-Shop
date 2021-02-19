import {ShopState, ShopStateCartItem, ShopStateProduct} from '../types/shop';
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  DECREMENT_PRODUCT_IN_CART,
  INCREMENT_PRODUCT_IN_CART,
  ShopActionTypes,
} from '../types/actions';

const reducer = (
  state: ShopState = initialState,
  action: ShopActionTypes,
): ShopState => {
  console.log(action.type);

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
      updatedCart.splice(indexToRemove, 1);

      return {...state, cart: updatedCart};
    }

    case INCREMENT_PRODUCT_IN_CART: {
      let updatedCart = [...state.cart];
      let indexToUpdate = updatedCart.findIndex((i) => i.id === action.id);
      let processingItem = updatedCart[indexToUpdate];
      if (processingItem === undefined) return state;
      const newQty = getNewQty(
        processingItem.maximumQuantity,
        processingItem.quantity,
        1,
      );
      let itemToUpdate = {...processingItem, quantity: newQty};
      updatedCart[indexToUpdate] = itemToUpdate;
      return {...state, cart: updatedCart};
    }

    case DECREMENT_PRODUCT_IN_CART: {
      let updatedCart = [...state.cart];
      let indexToUpdate = updatedCart.findIndex((i) => i.id === action.id);
      let processingItem = updatedCart[indexToUpdate];
      if (processingItem === undefined) return state;
      const newQty = getNewQty(
        processingItem.maximumQuantity,
        processingItem.quantity,
        -1,
      );
      let itemToUpdate = {...processingItem, quantity: newQty};
      updatedCart[indexToUpdate] = itemToUpdate;
      return {...state, cart: updatedCart};
    }

    default:
      return state;
  }
};

const getNewQty = (maxQty: number, curQty: number, addToCur: number) => {
  return Math.max(1, Math.min(maxQty, curQty + addToCur));
};

let initialState: ShopState = {
  products: [
    {
      id: 1,
      price: 9.99,
      name: 'Name 1',
      description: '1 some description for a new products on the website',
      maximumQuantity: 8,
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 2,
      price: 19.99,
      name: 'Name 2',
      description: '2 some description for a new products on the website',
      maximumQuantity: 8,
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 3,
      price: 4.99,
      name: 'Name 3',
      description: '3 some description for a new products on the website',
      maximumQuantity: 8,
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 4,
      price: 8.99,
      name: 'Name 4',
      description: '4 some description for a new products on the website',
      maximumQuantity: 8,
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 5,
      price: 12.99,
      name: 'Name 5',
      description: '5 some description for a new products on the website',
      maximumQuantity: 8,
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
  ],
  cart: [],
};

export default reducer;
