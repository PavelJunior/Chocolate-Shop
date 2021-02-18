let initialState = {
  products: [
    {
      id: 1,
      price: 9.99,
      name: 'Name 1',
      description: '1 some description for a new products on the website',
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 2,
      price: 19.99,
      name: 'Name 2',
      description: '2 some description for a new products on the website',
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 3,
      price: 4.99,
      name: 'Name 3',
      description: '3 some description for a new products on the website',
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 4,
      price: 8.99,
      name: 'Name 4',
      description: '4 some description for a new products on the website',
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
    {
      id: 5,
      price: 12.99,
      name: 'Name 5',
      description: '5 some description for a new products on the website',
      imageUrl:
        'https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Homemade-Chocolate-Bars.jpg',
    },
  ],
  cart: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      console.log(action.payload);
      let updatedCart = [...state.cart];
      const indexToUpdate = updatedCart.findIndex(
        (p: any) => p.id === parseInt(action.payload.id),
      );

      if (indexToUpdate !== -1) {
        // @ts-ignore
        let itemToUpdate = {...updatedCart[indexToUpdate]};
        itemToUpdate.quantity += action.payload.quantity;
        // @ts-ignore
        updatedCart[indexToUpdate] = itemToUpdate;
      } else {
        const newProductIndex = state.products.findIndex(
          (p) => p.id === parseInt(action.payload.id),
        );
        const itemToAdd = {
          ...state.products[newProductIndex],
          quantity: action.payload.quantity,
        };
        // @ts-ignore
        updatedCart.push(itemToAdd);
      }

      return {...state, cart: updatedCart};

    default:
      return state;
  }
};

export default reducer;
