import React from 'react';
import CheckoutForm from '../../components/CheckoutForm';

import './styles.css';
import {RouteComponentProps} from '../../routes/types';
import {ChangeFromValues, CheckoutFormState} from '../../store/types/checkout';
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
  onCheckoutFormChange: ChangeFromValues;
}

type Props = ProductPageProps & LinkDispatchProps & LinkStateProps;

const Checkout: React.FC<Props> = (props) => {
  return (
    <>
      <h1>Checkout</h1>
      <CheckoutForm
        form={props.form}
        changeCheckoutFormValues={props.onCheckoutFormChange}
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
  onCheckoutFormChange: (form) => dispatch(fieldValueChange(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
