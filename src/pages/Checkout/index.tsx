import React from 'react';
import CheckoutForm from '../../components/CheckoutForm';

import './styles.css';
import {RouteComponentProps} from '../../routes/types';
import {
  CheckoutChangeValue,
  CheckoutFormState,
} from '../../store/types/checkout';
import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {fieldValueChange} from '../../store/actions/checkout';

interface ProductPageProps extends RouteComponentProps {}

interface LinkStateProps {
  form: CheckoutFormState;
}

interface LinkDispatchProps {
  onCheckoutFieldChange: CheckoutChangeValue;
}

type Props = ProductPageProps & LinkDispatchProps & LinkStateProps;

const Checkout: React.FC<Props> = (props) => {
  return (
    <>
      <h1>Checkout</h1>
      <CheckoutForm
        form={props.form}
        changeFieldValue={props.onCheckoutFieldChange}
      />
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    form: state.checkout,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onCheckoutFieldChange: (field, value) =>
    dispatch(fieldValueChange(field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
