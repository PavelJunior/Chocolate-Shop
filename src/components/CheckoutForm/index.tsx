import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {
  CheckoutForm,
  ChangeFormValues,
  CheckoutFormProps,
  ChangeCheckoutStep,
} from '../../store/types/checkout';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(
  step: number,
  form: CheckoutForm,
  changeFormValues: ChangeFormValues,
  changeStepValue: ChangeCheckoutStep,
) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          form={form}
          step={step}
          changeFormValues={changeFormValues}
          changeStepValue={changeStepValue}
        />
      );
    case 1:
      return (
        <PaymentForm
          form={form}
          step={step}
          changeFormValues={changeFormValues}
          changeStepValue={changeStepValue}
        />
      );
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const CheckoutFormComponent: React.FC<CheckoutFormProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={props.step} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {props.step === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <>
                {getStepContent(
                  props.step,
                  props.form,
                  props.changeFormValues,
                  props.changeStepValue,
                )}
                {/*<div className={classes.buttons}>*/}
                {/*  {props.step !== 0 && (*/}
                {/*    <Button onClick={handleBack} className={classes.button}>*/}
                {/*      Back*/}
                {/*    </Button>*/}
                {/*  )}*/}
                {/*  <Button*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    onClick={handleNext}*/}
                {/*    className={classes.button}>*/}
                {/*    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}*/}
                {/*  </Button>*/}
                {/*</div>*/}
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default CheckoutFormComponent;
