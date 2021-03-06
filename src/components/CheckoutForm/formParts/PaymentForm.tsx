import React, {memo} from 'react';

import StripeForm from './StripeForm';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripePromise = loadStripe(
    'pk_test_51IR2qpHW0p4Fdz4pLl2OABy2GOQ2vhMfFIWzJfaH5ZsihIgOMdqtugKlrQvTBB58Z3O6EChGRDLnXSQJQBuPtjrg00fdsu9F5x',
  );

  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};
export default memo(PaymentForm);
