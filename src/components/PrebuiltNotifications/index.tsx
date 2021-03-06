import {NotificationItem} from '../../store/types/notification';

export const paymentErrorNotification: NotificationItem = {
  id: new Date().getTime(),
  type: 'error',
  text:
    'Something went wrong with the payment process. Try again or use a different card.',
  lifeTime: 10000,
};

export const addToCartSuccessNotification: NotificationItem = {
  id: new Date().getTime(),
  type: 'success',
  text: 'Product added to the cart successfully!',
  lifeTime: 7000,
};

export const addToCartMaxQtyNotification: NotificationItem = {
  id: new Date().getTime(),
  type: 'warning',
  text: 'You added maximum quantity of this product in your cart!',
  lifeTime: 7000,
};
