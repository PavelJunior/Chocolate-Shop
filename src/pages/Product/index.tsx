import React, {useState} from 'react';

import Error404 from '../../components/Error404';

import {connect} from 'react-redux';
import {ShopStateProduct} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {addToCart} from '../../store/actions/shop';
import {RouteComponentProps} from './../../routes/types';

import './styles.css';

interface ProductPageProps extends RouteComponentProps {}

interface LinkStateProps {
  product: ShopStateProduct | undefined;
}

interface LinkDispatchProps {
  onAddToCart: (id: number, quantity: number) => void;
}

type Props = ProductPageProps & LinkDispatchProps & LinkStateProps;

const Product: React.FC<Props> = (props) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    const newQty = Math.min(quantity + 1, props?.product?.maximumQuantity ?? 1);
    setQuantity(newQty);
  };

  const decreaseQuantity = () => {
    const newQty = Math.max(quantity - 1, 1);
    setQuantity(newQty);
  };

  return props.product === undefined ? (
    <Error404 />
  ) : (
    <div className="product">
      <img src={props.product.imageUrl} className="product-image" />
      <div className="product-content">
        <h3>{props.product.name}</h3>
        <h6>{props.product.price}</h6>
        <p>{props.product.description}</p>

        <br />
        <button onClick={decreaseQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={increaseQuantity}>+</button>

        <button
          onClick={() =>
            props.onAddToCart(parseInt(props.match.params.id), quantity)
          }>
          Add To Cart
        </button>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
