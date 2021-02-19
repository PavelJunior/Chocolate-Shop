import React, {useState} from 'react';
import {connect} from 'react-redux';
import {ShopStateProduct} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {addToCart} from '../../store/actions/shop';
import {RouteComponentProps} from './../../routes/types';

interface HomePageProps extends RouteComponentProps {}

interface LinkStateProps {
  product: ShopStateProduct;
}

interface LinkDispatchProps {
  onAddToCart: (id: number, quantity: number) => void;
}

type Props = HomePageProps & LinkDispatchProps & LinkStateProps;

const Product: React.FC<Props> = (props) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    const newQty = Math.min(quantity + 1, props.product.maximumQuantity);
    setQuantity(newQty);
  };

  const decreaseQuantity = () => {
    const newQty = Math.max(quantity - 1, 1);
    setQuantity(newQty);
  };

  return (
    <div>
      <h3>{props.product.name}</h3>
      <h6>{props.product.price}</h6>
      <p>{props.product.description}</p>
      <img src={props.product.imageUrl} />

      <br />
      <button onClick={decreaseQuantity}>-</button>
      <p>{quantity}</p>
      <button onClick={increaseQuantity}>+</button>

      <button
        onClick={() => props.onAddToCart(props.match.params.id, quantity)}>
        Add To Cart
      </button>
    </div>
  );
};

let mapStateToProps = (
  state: AppState,
  ownProps: HomePageProps,
): LinkStateProps => {
  const product: any = state.shop.products.find(
    (product) => product.id === ownProps.match.params.id,
  );

  return {
    product,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onAddToCart: addToCart,
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
