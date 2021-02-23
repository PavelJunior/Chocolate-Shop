import {CheckoutState} from '../types/checkout';

import {
  CHECKOUT_CHANGE_FORM_VALUES,
  CHECKOUT_CHANGE_STEP_VALUE,
  CheckoutActionsTypes,
} from '../types/actions';

const reducer = (
  state: CheckoutState = initialState,
  action: CheckoutActionsTypes,
): CheckoutState => {
  console.log(action.type);

  switch (action.type) {
    case CHECKOUT_CHANGE_FORM_VALUES: {
      console.log('here');
      let updatedState = {...action.form};
      console.log(111, updatedState);
      return {...state, form: updatedState};
    }

    case CHECKOUT_CHANGE_STEP_VALUE: {
      return {...state, step: action.step};
    }

    default:
      return state;
  }
};

let initialState: CheckoutState = {
  step: 0,
  form: {
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
  },
};

export default reducer;