import {ShopState, ShopStateCartItem, ShopStateProduct} from '../types/shop';
import {ADD_PRODUCT_TO_CART, ShopActionTypes} from '../types/actions';

const reducer = (
  state: ShopState = initialState,
  action: ShopActionTypes,
): ShopState => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      let updatedCart = [...state.cart];
      const indexToUpdate = updatedCart.findIndex(
        (p: ShopStateCartItem) => p.id === action.id,
      );

      if (indexToUpdate !== -1) {
        let itemToUpdate = {...updatedCart[indexToUpdate]};
        itemToUpdate.quantity += action.quantity;
        updatedCart[indexToUpdate] = itemToUpdate;
      } else {
        const newProductIndex = state.products.findIndex(
          (p: ShopStateProduct) => p.id === action.id,
        );
        const itemToAdd = {
          ...state.products[newProductIndex],
          quantity: action.quantity,
        };
        updatedCart.push(itemToAdd);
      }

      return {...state, cart: updatedCart};

    default:
      return state;
  }
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
