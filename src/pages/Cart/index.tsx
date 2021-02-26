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
  Select,
  MenuItem,
} from '@material-ui/core';

import {connect} from 'react-redux';
import {ShopStateCartItem} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {removeFromCart, changeQuantityInCart} from '../../store/actions/shop';
import {RouteComponentProps} from './../../routes/types';
import {Link} from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import './styles.css';

interface CartPageProps extends RouteComponentProps {}

interface LinkStateProps {
  cart: ShopStateCartItem[];
}

interface LinkDispatchProps {
  changeQuantityInCart: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
}

type Props = CartPageProps & LinkDispatchProps & LinkStateProps;

const Cart: React.FC<Props> = (props) => {
  const productRows = props.cart.map((item) => {
    const onChangeQuantityInCart = (id: number, value: any) => {
      props.changeQuantityInCart(id, parseInt(value));
    };

    const selectQuantityOptions = (maxQty: number) => {
      let option = [];
      for (let i = 1; i <= maxQty; i++) {
        option.push(<MenuItem value={i}>{i}</MenuItem>);
      }

      return option;
    };

    return (
      <TableRow>
        <TableCell>
          <ClearIcon onClick={() => props.onRemoveFromCart(item.id)} />
        </TableCell>
        <TableCell className="cart-product-cell">
          <img
            src={`/images/${item.images[0]}`}
            alt={item.name}
            className="cart-image"
          />
          <p>{item.name}</p>
        </TableCell>
        <TableCell>
          <Select
            value={item.quantity}
            onChange={(e) => onChangeQuantityInCart(item.id, e.target.value)}
            className="product-select">
            {selectQuantityOptions(item.maximumQuantity)}
          </Select>
        </TableCell>
        <TableCell>{item.price}</TableCell>
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
                  <TableCell></TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{productRows}</TableBody>
            </Table>
          </TableContainer>
          <Link to="/checkout" className="cart-checkout-link">
            <Button variant="contained" className="cart-checkout-button">
              Checkout
            </Button>
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
  changeQuantityInCart: (id, quantity) =>
    dispatch(changeQuantityInCart(id, quantity)),
  onRemoveFromCart: (id) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
