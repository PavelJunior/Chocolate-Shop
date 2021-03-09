import React, {memo, useEffect, useState} from 'react';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';
import Header from '../components/Header';
import NotificationsContainer from '../components/NotificationsContainer';
import ScrollToTop from '../components/ScrollToTop';
import {routes} from '../routes';
import {fetchProducts, loadCart} from '../store/actions/shop';

import {Container} from '@material-ui/core';

import './App.css';
import {connect} from 'react-redux';
import {AppActions} from '../store/types/actions';
import {ThunkDispatch} from 'redux-thunk';
import {ShopStateCartItem} from '../store/types/shop';
import Error500 from '../components/Error500';

interface LinkDispatchProps {
  getProducts: () => void;
  getCart: (cart: ShopStateCartItem[]) => void;
}

const App: React.FC<LinkDispatchProps> = ({getProducts, getCart}) => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await getProducts();
        setDataLoaded(true);
      } catch (error) {
        console.log(error);
        setLoadError(true);
      }
    };
    loadProducts();

    const shoppingCart = localStorage.getItem('shoppingCart');
    if (shoppingCart) {
      getCart(JSON.parse(shoppingCart));
    }
  }, []);

  const routeComponent = routes.map((route, index) => {
    return (
      <Route
        path={route.url}
        component={route.component}
        exact={route.exact}
        key={index}
      />
    );
  });

  return (
    <Router>
      <Header />
      <NotificationsContainer />
      <ScrollToTop />
      {dataLoaded && (
        <Container>
          <Switch>{routeComponent}</Switch>
        </Container>
      )}
      {loadError && <Error500 />}
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
