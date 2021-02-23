import {CheckoutFormState} from '../types/checkout';

import {
  CHECKOUT_CHANGE_FIELD_VALUE,
  CheckoutActionsTypes,
} from '../types/actions';

const reducer = (
  state: CheckoutFormState = initialState,
  action: CheckoutActionsTypes,
): CheckoutFormState => {
  console.log(action.type);

  switch (action.type) {
    case CHECKOUT_CHANGE_FIELD_VALUE: {
      let updatedState = {...state};
      return updatedState;
    }

    default:
      return state;
  }
};

let initialState: CheckoutFormState = {
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  nameOnCard: '',
  cardNumber: '',
  cardExpiration: '',
  cardCvv: '',
};

export default reducer;
