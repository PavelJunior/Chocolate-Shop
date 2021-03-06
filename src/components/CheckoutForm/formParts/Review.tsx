import React, {memo} from 'react';

import {
  Button,
  Grid,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {AppActions} from '../../../store/types/actions';
import {changeStepValue} from '../../../store/actions/checkout';
import {deleteEverythingFromCart} from '../../../store/actions/shop';
import {ChangeCheckoutStep, CheckoutForm} from '../../../store/types/checkout';
import {AppState} from '../../../store/configureStore';
import {ShopStateCartItem} from '../../../store/types/shop';

import {useStyles} from '../styles';

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

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((p) => {
      total += p.price * p.quantity;
    });

    return total.toFixed(2);
  };

  const submitOrder = () => {
    onCheckoutStepChange(2);
  };

  const productsInfo = () => {
    return (
      <>
        {cart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} />
            <Typography variant="body2">{`$${product.price} x ${product.quantity}`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${calculateTotal()}
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
        <Grid item>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{fullNameString()}</Typography>
          <Typography gutterBottom>{fullAddressString()}</Typography>
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
          onClick={submitOrder}
          className={classes.button}>
          Confirm
        </Button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(Review));
