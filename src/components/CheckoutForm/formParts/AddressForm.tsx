import React, {memo} from 'react';

import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button, Grid, Typography, TextField} from '@material-ui/core';

import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {AppActions} from '../../../store/types/actions';
import {
  changeFormValues,
  changeStepValue,
} from '../../../store/actions/checkout';
import {AppState} from '../../../store/configureStore';
import {
  ChangeCheckoutStep,
  ChangeFormValues,
  CheckoutForm,
} from '../../../store/types/checkout';

import {useStyles} from '../styles';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .required('First Name Is Required'),
  lastName: Yup.string().min(2, 'Too Short!').required('Last Name Is Required'),
  addressLine1: Yup.string()
    .min(5, 'Too Short!')
    .required('Address is Required'),
  addressLine2: Yup.string().min(5, 'Too Short!'),
  city: Yup.string().min(2, 'Too Short!').required('City Is Required'),
  state: Yup.string().min(1, 'Too Short!').required('State Is Required'),
  zip: Yup.string().min(2, 'Too Short!').required('ZIP Is Required'),
  country: Yup.string().min(2, 'Too Short!').required('Country Is Required'),
});

interface LinkStateProps {
  form: CheckoutForm;
}

interface LinkDispatchProps {
  onCheckoutFormChange: ChangeFormValues;
  onCheckoutStepChange: ChangeCheckoutStep;
}

type Props = LinkDispatchProps & LinkStateProps;

const AddressForm: React.FC<Props> = ({
  form,
  onCheckoutStepChange,
  onCheckoutFormChange,
}) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: form,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onCheckoutFormChange(values);
      onCheckoutStepChange(1);
    },
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressLine1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.addressLine1 &&
                Boolean(formik.errors.addressLine1)
              }
              helperText={
                formik.touched.addressLine1 && formik.errors.addressLine1
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="addressLine2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.addressLine2 &&
                Boolean(formik.errors.addressLine2)
              }
              helperText={
                formik.touched.addressLine2 && formik.errors.addressLine2
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
        </Grid>

        <div className={classes.buttons}>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(AddressForm));
