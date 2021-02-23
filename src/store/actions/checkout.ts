import {AppActions} from '../types/actions';

import {CHECKOUT_CHANGE_FIELD_VALUE} from './../types/actions';
import {CheckoutFormState} from './../types/checkout';

export const fieldValueChange = (form: CheckoutFormState): AppActions => ({
  type: CHECKOUT_CHANGE_FIELD_VALUE,
  form: form,
});
