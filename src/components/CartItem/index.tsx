import React, {memo} from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import {TableCell, TableRow, Select, MenuItem} from '@material-ui/core';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ShopStateCartItem} from '../../store/types/shop';
import {AppActions} from '../../store/types/actions';
import {removeFromCart, changeQuantityInCart} from '../../store/actions/shop';

import './styles.css';
import {ThunkDispatch} from 'redux-thunk';

interface LinkStateProps {
  item: ShopStateCartItem;
}

interface LinkDispatchProps {
  changeQuantityInCart: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

type Props = LinkDispatchProps & LinkStateProps;

const CartItem: React.FC<Props> = ({
  item,
  onRemoveFromCart,
  changeQuantityInCart,
}) => {
  const onChangeQuantityInCart = (id: string, value: any) => {
    changeQuantityInCart(id, parseInt(value));
  };

  const selectQuantityOptions = (maxQty: number) => {
    let option = [];
    for (let i = 1; i <= maxQty; i++) {
      option.push(
        <MenuItem value={i} className="product-select-item">
          {i}
        </MenuItem>,
      );
    }

    return option;
  };

  const productTotalPrice = (item: ShopStateCartItem) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <TableRow>
      <TableCell>
        <ClearIcon onClick={() => onRemoveFromCart(item.id)} />
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
      <TableCell className="cart-product-price">
        <p>${productTotalPrice(item)}</p>
        <p>(${item.price} ea)</p>
      </TableCell>
    </TableRow>
  );
};

let mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
): LinkDispatchProps => ({
  changeQuantityInCart: (id, quantity) =>
    dispatch(changeQuantityInCart(id, quantity)),
  onRemoveFromCart: (id) => dispatch(removeFromCart(id)),
});

export default connect(null, mapDispatchToProps)(memo(CartItem));
