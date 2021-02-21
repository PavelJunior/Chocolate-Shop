import React, {ChangeEvent, useState} from 'react';

import {connect} from 'react-redux';
import {ShopStateProduct} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {addToCart} from '../../store/actions/shop';
import {RouteComponentProps} from './../../routes/types';

import {Select, InputLabel, MenuItem, Button} from '@material-ui/core';

import './styles.css';

interface ProductPageProps extends RouteComponentProps {}

interface LinkStateProps {
  product: ShopStateProduct | undefined;
}

interface LinkDispatchProps {
  onAddToCart: (id: number, quantity: number) => void;
}

type Props = ProductPageProps & LinkDispatchProps & LinkStateProps;

const Checkout: React.FC<Props> = (props) => {
  return (
    <>
      <h1>Checkout</h1>
    </>
  );
};

let mapStateToProps = (
  state: AppState,
  ownProps: RouteComponentProps,
): LinkStateProps => {
  const product = state.shop.products.find(
    (product) => product.id === parseInt(ownProps.match.params.id),
  );

  return {
    product,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onAddToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
