import React from 'react';
import CheckoutFormComponent from '../../components/CheckoutForm';

import './styles.css';
import {RouteComponentProps} from '../../routes/types';
import {
  ChangeFormValues,
  CheckoutForm,
  ChangeCheckoutStep,
} from '../../store/types/checkout';
import {connect} from 'react-redux';
import {AppState} from '../../store/configureStore';
import {Dispatch} from 'redux';
import {AppActions} from '../../store/types/actions';
import {changeFormValues, changeStepValue} from '../../store/actions/checkout';

interface ProductPageProps extends RouteComponentProps {}

interface LinkStateProps {
  form: CheckoutForm;
  step: number;
}

interface LinkDispatchProps {
  onCheckoutFormChange: ChangeFormValues;
  onCheckoutStepChange: ChangeCheckoutStep;
}

type Props = ProductPageProps & LinkDispatchProps & LinkStateProps;

const Checkout: React.FC<Props> = (props) => {
  return (
    <>
      <h1>Checkout</h1>
      <CheckoutFormComponent
        form={props.form}
        step={props.step}
        changeFormValues={props.onCheckoutFormChange}
        changeStepValue={props.onCheckoutStepChange}
      />
    </>
  );
};

let mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    form: state.checkout.form,
    step: state.checkout.step,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<AppActions>,
): LinkDispatchProps => ({
  onCheckoutFormChange: (form) => dispatch(changeFormValues(form)),
  onCheckoutStepChange: (step) => dispatch(changeStepValue(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
