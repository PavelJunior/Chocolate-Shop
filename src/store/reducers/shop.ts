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
  return state;
};

export default reducer;
