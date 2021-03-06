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

interface LinkStateProps {
  form: CheckoutForm;
}

interface LinkDispatchProps {
  onCheckoutFormChange: ChangeFormValues;
  onCheckoutStepChange: ChangeCheckoutStep;
}

type Props = LinkDispatchProps & LinkStateProps;

const StripeForm: React.FC<Props> = ({
  form,
  onCheckoutFormChange,
  onCheckoutStepChange,
}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (stripe && elements) {
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      console.log(error, paymentMethod);
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
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onCheckoutFormChange: (form) => dispatch(changeFormValues(form)),
  onCheckoutStepChange: (step) => dispatch(changeStepValue(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(StripeForm));
