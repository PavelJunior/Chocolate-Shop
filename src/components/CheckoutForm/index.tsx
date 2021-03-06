import React, {memo} from 'react';

import AddressForm from './formParts/AddressForm';
import PaymentForm from './formParts/PaymentForm';
import Review from './formParts/Review';
import {Typography, StepLabel, Step, Stepper, Paper} from '@material-ui/core';

import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import {useStyles} from './styles';

interface LinkStateProps {
  step?: number;
}

const CheckoutForm: React.FC<LinkStateProps> = ({step}) => {
  const classes = useStyles();
  const steps = ['Shipping address', 'Review your order', 'Payment details'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return <PaymentForm />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Stepper activeStep={step} className={classes.stepper} alternativeLabel>
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
            getStepContent(step ?? 0)
          )}
        </>
      </Paper>
    </main>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    step: state.checkout.step,
  };
};

export default connect(mapStateToProps, null)(memo(CheckoutForm));
