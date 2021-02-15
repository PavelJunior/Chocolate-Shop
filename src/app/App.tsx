import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {routes} from "../routes";
import './App.css';

function App() {
  const routeComponent = routes.map((route) => {
    return (<Route path={route.url} component={route.component} exact={route.exact} key={route.name}/>)
  })

  return (
    <Router>
      <Switch>
        {routeComponent}
      </Switch>
    </Router>
  );
}

export default App;
