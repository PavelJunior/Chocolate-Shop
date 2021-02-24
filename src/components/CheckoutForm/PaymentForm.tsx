import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {CheckoutFormAddressAndPaymentProps} from '../../store/types/checkout';
import {useFormik} from 'formik';
import * as Yup from 'yup';

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

const PaymentForm: React.FC<CheckoutFormAddressAndPaymentProps> = (props) => {
  const formik = useFormik({
    initialValues: props.form,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.changeFormValues(values);
      props.changeStepValue(2);
    },
  });

  return (
    <React.Fragment>
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
        <div>
          <Button onClick={() => props.changeStepValue(0)}>Back</Button>
          <Button variant="contained" color="primary" type="submit">
            Place order
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default PaymentForm;
