import {ShopState, ShopStateCartItem, ShopStateProduct} from '../types/shop';
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  DECREMENT_PRODUCT_IN_CART,
  INCREMENT_PRODUCT_IN_CART,
  CHANGE_QUANTITY_IN_CART,
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

    case CHANGE_QUANTITY_IN_CART: {
      let updatedCart = [...state.cart];
      let indexToUpdate = updatedCart.findIndex((i) => i.id === action.id);
      let processingItem = updatedCart[indexToUpdate];
      if (processingItem === undefined) return state;
      const newQty = getNewQty(
        processingItem.maximumQuantity,
        action.quantity,
        0,
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
      price: 4.99,
      name: 'Dark Chocolate',
      description:
        '<h4>You’re so classic</h4> <p>Your black dress. A charcoal suit. Your best jeans. Add this delicious, classic dark chocolate to your repertoire because you don’t chase trends, your good taste is timeless.</p> <p>Ingredients: </p><p>OrganicCocoa Beans, Organic Cane Sugar, Organic Vanilla.</p><p>80% cocoa content</p>',
      maximumQuantity: 8,
      images: ['Dark-1.jpg', 'Dark-2.jpg', 'Dark-3.jpg', 'Dark-4.jpg'],
    },
    {
      id: 2,
      price: 3.99,
      name: 'Hazelnut Chocolate',
      description:
        '<h4>Thank you</h4><p>We thank you and your family thanks you for choosing this combination of roasted hazelnuts and creamy dark chocolate. Simply leave on the kitchen counter and watch what happens next.</p><p>Ingredients:<br>Organic Cocoa Beans, Organic Cane Sugar, Organic Hazelnuts, Organic Cocoa Butter, Organic Vanilla, Touch of Sea Salt.</p><p>72% cocoa content</p>',
      maximumQuantity: 8,
      images: [
        'Hazelnut-1.jpg',
        'Hazelnut-2.jpg',
        'Hazelnut-3.jpg',
        'Hazelnut-4.jpg',
      ],
    },
    {
      id: 3,
      price: 3.99,
      name: 'Raspberry Chocolate',
      description:
        '<h4>Very berry</h4><p>Sweetened with real raspberries, this old school pairing gets a fresh makeover with extra raspberries, dark chocolate, and less added sugar.</p><p>Ingredients:<br>Organic Cocoa Beans, Organic Cocoa Butter, Organic Cane Sugar, Organic Raspberries, Organic Vanilla.</p><p>70% cocoa content</p>',
      maximumQuantity: 8,
      images: [
        'Raspberry-1.jpg',
        'Raspberry-2.jpg',
        'Raspberry-3.jpg',
        'Raspberry-4.jpg',
      ],
    },
    {
      id: 4,
      price: 12.99,
      name: 'Sea Salt Chocolate',
      description:
        '<h4>Set Sail</h4><p>Let us take you to the shores of Amagansett where our sea salt is harvested. Set your cares aside, kick off your shoes, and enjoy a timeless moment that is both salty and sweet.</p><p>72% cocoa content</p><p>Ingredients:<br>Organic Cocoa Beans, Organic Cane Sugar, Organic Cocoa Butter, Organic Vanilla, Touch of Sea Salt.</p>',
      maximumQuantity: 8,
      images: [
        'SeaSalt-1.jpg',
        'SeaSalt-2.jpg',
        'SeaSalt-3.jpg',
        'SeaSalt-4.jpg',
      ],
    },
    {
      id: 5,
      price: 4.99,
      name: 'Olive Oil Chocolate',
      description:
        '<h4>Dinnertime</h4><p>Our olive oil chocolate is the perfect dinner party gift. Fresh, buttery, and savory, its creamy&nbsp;texture and touch of sea salt will amplify the flavors and your evening.</p><p>Ingredients:<br>Organic Cocoa Beans, Organic Cane Sugar, Organic Cocoa Butter, Organic Olive Oil, Touch of Sea Salt.</p><p>70% cocoa content</p>',
      maximumQuantity: 8,
      images: [
        'OliveOil-1.jpg',
        'OliveOil-2.jpg',
        'OliveOil-3.jpg',
        'OliveOil-4.jpg',
      ],
    },
  ],
  cart: [],
};

export default reducer;
