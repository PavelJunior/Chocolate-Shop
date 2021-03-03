import React, {useState, memo, useEffect} from 'react';

import ImageGallery from 'react-image-gallery';
import Error404 from '../../components/Error404';
import {Select, InputLabel, MenuItem, Button, Grid} from '@material-ui/core';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ShopStateProduct} from '../../store/types/shop';
import {AppState} from '../../store/configureStore';
import {AppActions} from '../../store/types/actions';
import {addToCart} from '../../store/actions/shop';
import {RouteComponentProps} from './../../routes/types';
import {addNotificationWithTimeout} from '../../store/actions/notification';
import {NotificationItem} from '../../store/types/notification';

import './styles.css';
import './image-gallery.css';

interface ProductPageProps extends RouteComponentProps {}

interface LinkStateProps {
  product: ShopStateProduct | undefined;
  quantityInCart: number;
}

interface LinkDispatchProps {
  onAddToCart: (id: string, quantity: number) => void;
  notificationWithTimeout: (notification: NotificationItem) => void;
}

interface ImageForGallery {
  original: string;
  thumbnail: string;
}

type Props = ProductPageProps & LinkDispatchProps & LinkStateProps;

const Product: React.FC<Props> = ({
  product,
  quantityInCart,
  onAddToCart,
  match,
  notificationWithTimeout,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [images, setImages] = useState<ImageForGallery[]>([]);

  const onSelectChange = (e: any) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    if (product) {
      const renderedImages = product.images.map((i) => {
        return {
          original: `/images/${i}`,
          thumbnail: `/images/${i}`,
        };
      });
      setImages(renderedImages);
    }
  }, []);

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

  const successfulNotification: NotificationItem = {
    id: new Date().getTime(),
    type: 'success',
    text: 'Product added to the cart successfully!',
    lifeTime: 7000,
  };

  const warningNotification: NotificationItem = {
    id: new Date().getTime(),
    type: 'warning',
    text: 'You added maximum quantity of this product in your cart!',
    lifeTime: 7000,
  };

  const onAddToCartClick = () => {
    onAddToCart(match.params.id, quantity);
    if (product === undefined) return;

    if (quantityInCart + quantity > product.maximumQuantity) {
      notificationWithTimeout(warningNotification);
    } else {
      notificationWithTimeout(successfulNotification);
    }
  };

  return product === undefined ? (
    <Error404 />
  ) : (
    <Grid container className="product" spacing={3}>
      <Grid item md={8} sm={6} xs={12} className="product-images">
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
        />
      </Grid>
      <Grid item md={4} sm={6} xs={12} className="product-content">
        <h2>{product.name}</h2>
        <h3>${product.price}</h3>
        <div dangerouslySetInnerHTML={{__html: product.description}} />

        <InputLabel id="label">Quantity</InputLabel>
        <Select
          id="label"
          value={quantity}
          onChange={(e) => onSelectChange(e)}
          className="product-select">
          {selectQuantityOptions(product.maximumQuantity)}
        </Select>
        <Button variant="contained" onClick={() => onAddToCartClick()}>
          Add To Cart
        </Button>
      </Grid>
    </Grid>
  );
};

let mapStateToProps = (
  state: AppState,
  ownProps: RouteComponentProps,
): LinkStateProps => {
  const product = state.shop.products.find(
    (product) => product.id === ownProps.match.params.id,
  );
  const itemInCart = state.shop.cart.find(
    (product) => product.id === ownProps.match.params.id,
  );
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  return {
    product,
    quantityInCart,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onAddToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
  notificationWithTimeout: (notification) =>
    addNotificationWithTimeout(notification, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Product));
