import React, {memo} from 'react';

import CartItem from '../../components/CartItem';
import {Link} from 'react-router-dom';
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

import './styles.css';

interface LinkStateProps {
  cart: ShopStateCartItem[];
}

const Cart: React.FC<LinkStateProps> = ({cart}) => {
  const total = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <>
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="table" className="cart-table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <CartItem item={item} />
                ))}
              </TableBody>
              <TableBody>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total: ${total()}</TableCell>
              </TableBody>
            </Table>
          </TableContainer>
          <Link to="/checkout" className="cart-checkout-link">
            <Button variant="contained" className="cart-checkout-button">
              Checkout
            </Button>
          </Link>
        </>
      ) : (
        <p>You have nothing in your shopping cart.</p>
      )}
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps, null)(memo(Cart));
