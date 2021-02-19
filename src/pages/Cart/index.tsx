import React from 'react';

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
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.name}</td>
        <td>
          <button onClick={() => props.onDecrementInCart(item.id)}>-</button>
          {item.quantity}
          <button onClick={() => props.onIncrementInCart(item.id)}>+</button>
          <button onClick={() => props.onRemoveFromCart(item.id)}>x</button>
        </td>
        <td>{total}</td>
      </tr>
    );
  });

  console.log(props);

  return (
    <>
      <h2>Cart</h2>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Count</td>
            <td>Actions</td>
            <td>Total</td>
          </tr>
          {productRows}
        </tbody>
      </table>
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
