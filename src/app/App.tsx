import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {routes} from '../routes';
import Header from '../components/Header';
import Notifications from '../components/Notifications';
import ScrollToTop from '../components/ScrollToTop';

import {Container} from '@material-ui/core';

import './App.css';

function App() {
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
}

export default App;
