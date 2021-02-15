import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {routes} from '../routes';
import Header from '../components/Header';

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
      <Switch>
        <Container>{routeComponent}</Container>
      </Switch>
    </Router>
  );
}

export default App;