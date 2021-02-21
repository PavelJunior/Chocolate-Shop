import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';

import {connect} from 'react-redux';
import {ShopStateCartItem} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {
  incrementInCart,
  decrementInCart,
  removeFromCart,
} from '../../store/actions/shop';
import {RouteComponentProps} from './../../routes/types';
import {Link} from 'react-router-dom';

interface CartPageProps extends RouteComponentProps {}

interface LinkStateProps {
  cart: ShopStateCartItem[];
}

interface LinkDispatchProps {
  onIncrementInCart: (id: number) => void;
  onDecrementInCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
}

type Props = CartPageProps & LinkDispatchProps & LinkStateProps;

const Cart: React.FC<Props> = (props) => {
  const productRows = props.cart.map((item) => {
    const total = item.quantity * item.price;

    return (
      <TableRow>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>
          <button onClick={() => props.onDecrementInCart(item.id)}>-</button>
          {item.quantity}
          <button onClick={() => props.onIncrementInCart(item.id)}>+</button>
          <button onClick={() => props.onRemoveFromCart(item.id)}>x</button>
        </TableCell>
        <TableCell>{total}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <h1>Cart</h1>
      {props.cart.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Count</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{productRows}</TableBody>
            </Table>
          </TableContainer>
          <Link to="/checkout">
            <Button variant="contained">Checkout</Button>
          </Link>
        </>
      ) : (
        <p>No items in cart</p>
      )}
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    cart: state.shop.cart,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onIncrementInCart: (id) => dispatch(incrementInCart(id)),
  onDecrementInCart: (id) => dispatch(decrementInCart(id)),
  onRemoveFromCart: (id) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
