import React, {memo, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from '../components/Header';
import Notifications from '../components/Notifications';
import ScrollToTop from '../components/ScrollToTop';
import {routes} from '../routes';
import {fetchProducts, loadCart} from '../store/actions/shop';

import {Container} from '@material-ui/core';

import './App.css';
import {connect} from 'react-redux';
import {AppActions} from '../store/types/actions';
import {ThunkDispatch} from 'redux-thunk';
import {ShopStateCartItem} from '../store/types/shop';

interface LinkDispatchProps {
  getProducts: () => void;
  getCart: (cart: ShopStateCartItem[]) => void;
}

const App: React.FC<LinkDispatchProps> = ({getProducts, getCart}) => {
  useEffect(() => {
    getProducts();
    const shoppingCart = localStorage.getItem('shoppingCart');
    if (shoppingCart) {
      getCart(JSON.parse(shoppingCart));
    }
  }, []);

  const routeComponent = routes.map((route) => {
    return (
      <Route
        path={route.url}
        component={route.component}
        exact={route.exact}
        key={route.name}
      />
    );
  });

  return (
    <Router>
      <Header />
      <Notifications />
      <ScrollToTop />
      <Container>
        <Switch>{routeComponent}</Switch>
      </Container>
    </Router>
  );
};

let mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
): LinkDispatchProps => ({
  getProducts: () => dispatch(fetchProducts()),
  getCart: (cart) => dispatch(loadCart(cart)),
});

export default connect(null, mapDispatchToProps)(memo(App));
