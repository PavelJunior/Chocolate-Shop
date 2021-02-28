import React, {useEffect, memo} from 'react';

import CheckoutForm from '../../components/CheckoutForm';
import {CssBaseline} from '@material-ui/core';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {AppState} from '../../store/configureStore';
import {RouteComponentProps} from '../../routes/types';
import {ShopStateCartItem} from '../../store/types/shop';

interface CheckoutPageProps extends RouteComponentProps {}

interface LinkStateProps {
  cart: ShopStateCartItem[];
}

type Props = CheckoutPageProps & LinkStateProps;

const Checkout: React.FC<Props> = ({cart, history}) => {
  useEffect(() => {
    if (cart.length < 1) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <h1>Checkout</h1>
      <CssBaseline />
      <CheckoutForm />
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps, null)(withRouter(memo(Checkout)));
