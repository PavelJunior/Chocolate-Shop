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

export type CheckoutChangeValue = (field: string, value: string) => void;
