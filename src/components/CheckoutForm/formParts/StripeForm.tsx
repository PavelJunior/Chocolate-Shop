import React, {memo} from 'react';

import {Button, Typography} from '@material-ui/core';

import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {AppState} from '../../../store/configureStore';
import {AppActions} from '../../../store/types/actions';
import {changeStepValue} from '../../../store/actions/checkout';
import {deleteEverythingFromCart} from '../../../store/actions/shop';
import {ChangeCheckoutStep, CheckoutForm} from '../../../store/types/checkout';

import {useStyles} from '../styles';

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import {paymentErrorNotification} from '../../PrebuiltNotifications';
import {ShopStateCartItem} from '../../../store/types/shop';
import {RouteComponentProps} from '../../../routes/types';
import {withRouter} from 'react-router';
import {addNotificationWithTimeout} from '../../../store/actions/notification';
import {NotificationItem} from '../../../store/types/notification';

interface LinkStateProps {
  form: CheckoutForm;
  cart: ShopStateCartItem[];
}

interface LinkDispatchProps {
  onCheckoutStepChange: ChangeCheckoutStep;
  notificationWithTimeout: (notification: NotificationItem) => void;
  emptyCart: () => void;
}

interface StripeFormProps extends RouteComponentProps {}

type Props = LinkDispatchProps & LinkStateProps & StripeFormProps;

const StripeForm: React.FC<Props> = ({
  form,
  cart,
  history,
  onCheckoutStepChange,
  emptyCart,
  notificationWithTimeout,
}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    try {
      const billingDetails = getPaymentMethodBillingDetails();

      const {paymentMethod} = await stripe!.createPaymentMethod({
        type: 'card',
        card: elements!.getElement(CardElement)!,
        billing_details: billingDetails,
      });

      const paymentPayload = getPaymentPayment(paymentMethod?.id);
      const payment = await axios.post('/api/payment', paymentPayload);

      const orderPayload = getOrderPayload(payment.data.charges.data[0].id);
      const order = await axios.post('/api/order', orderPayload);

      if (order.status === 200) {
        emptyCart();
        onCheckoutStepChange(0);
        history.push('/order-success', {orderNumber: order.data._id});
      }
    } catch (er) {
      notificationWithTimeout(paymentErrorNotification);
      console.log(er);
    }
  };

  const getPaymentPayment = (id: string | undefined) => {
    const cartTotal: number = cart.reduce<number>((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    const paymentPayload = {
      payment_method_id: id,
      amount: cartTotal,
    };

    return paymentPayload;
  };

  const getOrderPayload = (chargeId: string) => {
    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const fullAddress = [
      form.addressLine1,
      form.city,
      form.state,
      form.zip,
      form.country,
    ].join(', ');

    const orderPayload = {
      fullName: getFullName(),
      fullAddress,
      orderItems,
      chargeId,
    };

    return orderPayload;
  };

  const getFullName = () => {
    return [form.firstName, form.lastName].join(' ');
  };

  const getPaymentMethodBillingDetails = () => {
    const billingAddress = {
      city: form.city,
      country: form.country,
      line1: form.addressLine1,
      line2: form.addressLine2,
      postal_code: form.zip,
      state: form.state,
    };

    return {
      name: getFullName(),
      address: billingAddress,
    };
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <CardElement className={classes.checkoutCardInput} />
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          onClick={() => onCheckoutStepChange(1)}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
          disabled={!stripe}>
          Pay
        </Button>
      </div>
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    form: state.checkout.form,
    cart: state.shop.cart,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onCheckoutStepChange: (step) => dispatch(changeStepValue(step)),
  notificationWithTimeout: (notification) =>
    addNotificationWithTimeout(notification, dispatch),
  emptyCart: () => dispatch(deleteEverythingFromCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(memo(StripeForm)));
