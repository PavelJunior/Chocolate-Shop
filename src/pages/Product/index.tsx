import React, {useState} from 'react';

import {connect} from 'react-redux';

const Product: React.FC = (props: any) => {
  return (
    <div>
      <h3>{props.product.name}</h3>
      <h6>{props.product.price}</h6>
      <p>{props.product.description}</p>
      <img src={props.product.imageUrl} />
      <button onClick={() => props.onAddToCart(props.match.params.id, 1)}>
        Add 2 chocolates
      </button>
    </div>
  );
};

let mapStateToProps = (state: any, props: any) => {
  const product = state.shop.products.find(
    (product: any) => product.id === parseInt(props.match.params.id),
  );

  return {
    product,
    cart: state.shop.cart,
  };
};

let mapDispatchToProps = (dispatch: any) => {
  return {
    onAddToCart: (id: any, quantity: any) =>
      dispatch({
        type: 'ADD_PRODUCT_TO_CART',
        payload: {
          id: id,
          quantity: quantity,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
