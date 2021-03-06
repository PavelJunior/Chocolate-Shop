import React, {memo} from 'react';

import {Button, Typography, TextField} from '@material-ui/core';

import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {AppState} from '../../../store/configureStore';
import {AppActions} from '../../../store/types/actions';
import {
  changeFormValues,
  changeStepValue,
} from '../../../store/actions/checkout';
import {
  ChangeCheckoutStep,
  ChangeFormValues,
  CheckoutForm,
} from '../../../store/types/checkout';

import {useStyles} from '../styles';

import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import {ShopStateCartItem} from '../../../store/types/shop';

interface LinkStateProps {
  form: CheckoutForm;
  cart: ShopStateCartItem[];
}

interface LinkDispatchProps {
  onCheckoutFormChange: ChangeFormValues;
  onCheckoutStepChange: ChangeCheckoutStep;
}

type Props = LinkDispatchProps & LinkStateProps;

const StripeForm: React.FC<Props> = ({
  form,
  cart,
  onCheckoutFormChange,
  onCheckoutStepChange,
}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    try {
      const {paymentMethod} = await stripe!.createPaymentMethod({
        type: 'card',
        card: elements!.getElement(CardElement)!,
      });

      const cartTotal: number = cart.reduce<number>((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);

      const paymentPayload = {
        payment_method_id: paymentMethod?.id,
        amount: cartTotal,
      };

      const payment = await axios.post('/api/payment', paymentPayload);

      console.log(payment);
      console.log(payment.data.charges.data[0].id);
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
        <Button className={classes.button}>Back</Button>
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
  onCheckoutFormChange: (form) => dispatch(changeFormValues(form)),
  onCheckoutStepChange: (step) => dispatch(changeStepValue(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(StripeForm));
