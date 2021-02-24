import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {ChangeCheckoutStep, CheckoutForm} from '../../store/types/checkout';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {changeStepValue} from '../../store/actions/checkout';
import {connect} from 'react-redux';
import {ShopStateCartItem} from '../../store/types/shop';

interface LinkStateProps {
  form: CheckoutForm;
  cart: ShopStateCartItem[];
}

interface LinkDispatchProps {
  onCheckoutStepChange: ChangeCheckoutStep;
}

type Props = LinkDispatchProps & LinkStateProps;

const Review: React.FC<Props> = ({form, cart, onCheckoutStepChange}) => {
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

  const calculateTotal = () => {
    //todo
    return '34.65$';
  };

  const productsInfo = () => {
    return (
      <>
        {cart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name + ' X ' + product.quantity} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {calculateTotal()}
          </Typography>
        </ListItem>
      </>
    );
  };

  return (
    <>
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
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    form: state.checkout.form,
    cart: state.shop.cart,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onCheckoutStepChange: (step) => dispatch(changeStepValue(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);

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
