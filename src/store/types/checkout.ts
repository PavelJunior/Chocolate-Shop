export interface CheckoutFormState {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  nameOnCard: string;
  cardNumber: string;
  cardExpiration: string;
  cardCvv: string;
}

export interface CheckoutFormProps {
  form: CheckoutFormState;
  changeCheckoutFormValues: ChangeFromValues;
}

export type ChangeFromValues = (form: CheckoutFormState) => void;
