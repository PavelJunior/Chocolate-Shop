import React, {memo} from 'react';

import {Button, Grid, Typography, TextField} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {AppState} from '../../store/configureStore';
import {AppActions} from '../../store/types/actions';
import {changeFormValues, changeStepValue} from '../../store/actions/checkout';
import {
  ChangeCheckoutStep,
  ChangeFormValues,
  CheckoutForm,
} from '../../store/types/checkout';

import {useStyles} from './styles';

const validationSchema = Yup.object().shape({
  nameOnCard: Yup.string().min(4, 'Too Short!').required('Required'),
  cardNumber: Yup.string()
    .matches(
      /^\d{16}$/,
      'A valid credit card number - must contain exactly 16 digits',
    )
    .required('Enter a valid card number'),
  cardExpiration: Yup.string()
    .matches(/^\d{2}.\d{2,4}$/, 'Enter a valid card expiration date')
    .required('Required'),
  cardCvv: Yup.string()
    .matches(/^\d{3,4}$/, 'Enter a valid CVV')
    .required('Required'),
});

interface LinkStateProps {
  form: CheckoutForm;
}

interface LinkDispatchProps {
  onCheckoutFormChange: ChangeFormValues;
  onCheckoutStepChange: ChangeCheckoutStep;
}

type Props = LinkDispatchProps & LinkStateProps;

const PaymentForm: React.FC<Props> = ({
  onCheckoutFormChange,
  onCheckoutStepChange,
  form,
}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: form,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onCheckoutFormChange(values);
      onCheckoutStepChange(2);
    },
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="nameOnCard"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              value={formik.values.nameOnCard}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)
              }
              helperText={formik.touched.nameOnCard && formik.errors.nameOnCard}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardExpiration"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              value={formik.values.cardExpiration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardExpiration &&
                Boolean(formik.errors.cardExpiration)
              }
              helperText={
                formik.touched.cardExpiration && formik.errors.cardExpiration
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardCvv"
              label="CVV"
              fullWidth
              autoComplete="cc-csc"
              value={formik.values.cardCvv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cardCvv && Boolean(formik.errors.cardCvv)}
              helperText={formik.touched.cardCvv && formik.errors.cardCvv}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            onClick={() => onCheckoutStepChange(0)}
            className={classes.button}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}>
            Next
          </Button>
        </div>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(PaymentForm));
