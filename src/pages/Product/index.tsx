import React, {useState} from 'react';

import Error404 from '../../components/Error404';

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

const Product: React.FC<Props> = (props) => {
  const [quantity, setQuantity] = useState<number>(1);

  const onSelectChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const images = props.product?.images.map((i) => {
    return <img src={`/images/${i}`} className="product-image" />;
  });

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

  return props.product === undefined ? (
    <Error404 />
  ) : (
    <div className="product">
      <div className="product-images">{images}</div>
      <div className="product-content">
        <h2>{props.product.name}</h2>
        <h3>${props.product.price}</h3>
        <div dangerouslySetInnerHTML={{__html: props.product.description}} />

        <InputLabel id="label">Quantity</InputLabel>
        <Select
          id="label"
          value={quantity}
          onChange={(e) => onSelectChange(e)}
          className="product-select">
          {selectQuantityOptions(props.product.maximumQuantity)}
        </Select>
        <Button
          variant="contained"
          onClick={() =>
            props.onAddToCart(parseInt(props.match.params.id), quantity)
          }>
          Add To Cart
        </Button>
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
