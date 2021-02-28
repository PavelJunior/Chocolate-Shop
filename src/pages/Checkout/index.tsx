import React, {useEffect, memo} from 'react';

import AddressForm from '../../components/CheckoutFormParts/AddressForm';
import PaymentForm from '../../components/CheckoutFormParts/PaymentForm';
import Review from '../../components/CheckoutFormParts/Review';
import {
  Typography,
  StepLabel,
  Step,
  Stepper,
  Paper,
  CssBaseline,
} from '@material-ui/core';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {AppState} from '../../store/configureStore';
import {RouteComponentProps} from '../../routes/types';

import {useStyles} from './styles';

interface CheckoutPageProps extends RouteComponentProps {}

interface LinkStateProps {
  step: number;
  cart: any;
}

type Props = CheckoutPageProps & LinkStateProps;

const Checkout: React.FC<Props> = ({step, cart, history}) => {
  const classes = useStyles();
  const steps = ['Shipping address', 'Payment details', 'Review your order'];

  useEffect(() => {
    if (cart.length < 1) {
      history.push('/');
    }
  }, []);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <>
      <h1>Checkout</h1>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper
            activeStep={step}
            className={classes.stepper}
            alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {step === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              getStepContent(step)
            )}
          </>
        </Paper>
      </main>
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    step: state.checkout.step,
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps, null)(withRouter(memo(Checkout)));
