import React from 'react';

import {connect} from 'react-redux';

const Product: React.FC = (props: any) => {
  return (
    <div>
      <h3>{props.product.name}</h3>
      <h6>{props.product.price}</h6>
      <p>{props.product.description}</p>
      <img src={props.product.imageUrl} />
    </div>
  );
};

let mapStateToProps = (state: any, props: any) => {
  const product = state.shop.products.find(
    (product: any) => product.id === parseInt(props.match.params.id),
  );

  return {
    product,
  };
};

export default connect(mapStateToProps, null)(Product);
