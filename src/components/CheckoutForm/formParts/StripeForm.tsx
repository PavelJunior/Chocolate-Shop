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
import {ShopStateCartItem} from '../../../store/types/shop';
import {RouteComponentProps} from '../../../routes/types';
import {withRouter} from 'react-router';

interface LinkStateProps {
  form: CheckoutForm;
  cart: ShopStateCartItem[];
}

interface LinkDispatchProps {
  onCheckoutStepChange: ChangeCheckoutStep;
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
}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

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
    const fullAddress = [
      form.addressLine1,
      form.city,
      form.state,
      form.zip,
      form.country,
    ].join(', ');

    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const fullName = [form.firstName, form.lastName].join(' ');

    const orderPayload = {
      fullName,
      orderItems,
      fullAddress,
      chargeId,
    };

    return orderPayload;
  };

  const handleSubmit = async () => {
    try {
      const {paymentMethod} = await stripe!.createPaymentMethod({
        type: 'card',
        card: elements!.getElement(CardElement)!,
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
      console.log(er);
    }
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
  emptyCart: () => dispatch(deleteEverythingFromCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(memo(StripeForm)));
