import React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import AddressForm from '../../components/CheckoutFormParts/AddressForm';
import PaymentForm from '../../components/CheckoutFormParts/PaymentForm';
import Review from '../../components/CheckoutFormParts/Review';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './styles';

interface LinkStateProps {
  step: number;
}

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

const Checkout: React.FC<LinkStateProps> = ({step}) => {
  const classes = useStyles();
  const steps = ['Shipping address', 'Payment details', 'Review your order'];

  return (
    <>
      <h1>Checkout</h1>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={step} className={classes.stepper}>
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
  };
};

export default connect(mapStateToProps, null)(Checkout);
