import {AppActions} from '../types/actions';

import {CHECKOUT_CHANGE_FIELD_VALUE} from './../types/actions';

export const fieldValueChange = (field: string, value: string): AppActions => ({
  type: CHECKOUT_CHANGE_FIELD_VALUE,
  field: field,
  value: value,
});
