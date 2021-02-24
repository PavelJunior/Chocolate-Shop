import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {CheckoutFormReviewProps} from '../../store/types/checkout';

const products = [
  {name: 'Product 1', desc: 'A nice thing', price: '$9.99'},
  {name: 'Product 2', desc: 'Another thing', price: '$3.45'},
  {name: 'Product 3', desc: 'Something else', price: '$6.51'},
  {name: 'Product 4', desc: 'Best thing of all', price: '$14.11'},
  {name: 'Shipping', desc: '', price: 'Free'},
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review: React.FC<CheckoutFormReviewProps> = ({form, changeStepValue}) => {
  const classes = useStyles();

  const fullAddressString = () => {
    return [
      form.addressLine1,
      form.city,
      form.state,
      form.zip,
      form.country,
    ].join(', ');
  };

  const fullNameString = () => {
    return [form.firstName, form.lastName].join(' ');
  };

  const fullPaymentInfo = () => {
    const payments = [
      {name: 'Card type', detail: 'Visa'},
      {name: 'Card holder', detail: fullNameString()},
      {name: 'Card number', detail: form.cardNumber},
      {name: 'Expiry date', detail: form.cardExpiration},
    ];

    return payments.map((payment) => (
      <React.Fragment key={payment.name}>
        <Grid item xs={6}>
          <Typography gutterBottom>{payment.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{payment.detail}</Typography>
        </Grid>
      </React.Fragment>
    ));
  };

  const productsInfo = () => {
    return (
      <>
        {/*{.map((product) => (*/}
        {/*  <ListItem className={classes.listItem} key={product.name}>*/}
        {/*    <ListItemText primary={product.name + " X " product.} />*/}
        {/*    <Typography variant="body2">{product.price}</Typography>*/}
        {/*  </ListItem>*/}
        {/*))}*/}
        {/*<ListItem className={classes.listItem}>*/}
        {/*  <ListItemText primary="Total" />*/}
        {/*  <Typography variant="subtitle1" className={classes.total}>*/}
        {/*    $34.06*/}
        {/*  </Typography>*/}
        {/*</ListItem>*/}
      </>
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>{productsInfo()}</List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{fullNameString()}</Typography>
          <Typography gutterBottom>{fullAddressString()}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>{fullPaymentInfo()}</Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
