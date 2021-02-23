import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {CheckoutFormProps} from '../../store/types/checkout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

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

const AddressForm: React.FC<CheckoutFormProps> = (props) => {
  const formik = useFormik({
    initialValues: props.form,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.changeFormValues(values);
      props.changeStepValue(props.step + 1);
    },
  });

  console.log(formik, formik.touched);

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

        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </form>
    </>
  );
};

export default AddressForm;
