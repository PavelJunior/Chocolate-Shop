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
  switch (action.type) {
    case CHECKOUT_CHANGE_FORM_VALUES: {
      let updatedState = {...action.form};
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
