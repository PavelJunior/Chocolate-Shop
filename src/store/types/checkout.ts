import AddressForm from '../../components/CheckoutForm/AddressForm';
import React from 'react';

export interface CheckoutState {
  step: number;
  form: CheckoutForm;
}

export type CheckoutForm = {
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
};

export type ChangeFormValues = (form: CheckoutForm) => void;
export type ChangeCheckoutStep = (step: number) => void;
