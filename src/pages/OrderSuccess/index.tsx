import React, {useEffect, memo} from 'react';

import {Link, useHistory, useLocation} from 'react-router-dom';
import {CssBaseline, Paper, Typography} from '@material-ui/core';

import {withRouter} from 'react-router';

import './styles.css';

interface locationStateType {
  orderNumber: string;
}

const OrderSuccess: React.FC = () => {
  const location = useLocation<locationStateType>();
  const orderNumber = location.state ? location.state.orderNumber : undefined;
  const history = useHistory();

  useEffect(() => {
    if (orderNumber === undefined) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <h1>Thank you for your order!</h1>
      <CssBaseline />
      <Paper className="order-success-paper">
        <Typography variant="subtitle1">
          Your order number is #{orderNumber}. We have emailed your order
          confirmation, and will send you an update when your order has shipped.{' '}
          <Link to={'/'}>Go to the main page.</Link>
        </Typography>
      </Paper>
    </>
  );
};

export default withRouter(memo(OrderSuccess));
