import {AppActions} from '../types/actions';

import {
  CHECKOUT_CHANGE_FORM_VALUES,
  CHECKOUT_CHANGE_STEP_VALUE,
} from './../types/actions';
import {CheckoutForm} from './../types/checkout';

export const changeFormValues = (form: CheckoutForm): AppActions => ({
  type: CHECKOUT_CHANGE_FORM_VALUES,
  form: form,
});

export const changeStepValue = (step: number): AppActions => ({
  type: CHECKOUT_CHANGE_STEP_VALUE,
  step: step,
});
