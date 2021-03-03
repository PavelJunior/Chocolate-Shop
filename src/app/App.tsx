import React, {memo, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from '../components/Header';
import Notifications from '../components/Notifications';
import ScrollToTop from '../components/ScrollToTop';
import {routes} from '../routes';
import {fetchProducts} from '../store/actions/shop';

import {Container} from '@material-ui/core';

import './App.css';
import {connect} from 'react-redux';
import {AppActions} from '../store/types/actions';
import {ThunkDispatch} from 'redux-thunk';

interface LinkDispatchProps {
  getProducts: () => void;
}

const App: React.FC<LinkDispatchProps> = ({getProducts}) => {
  useEffect(() => {
    getProducts();
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
});

export default connect(null, mapDispatchToProps)(memo(App));
