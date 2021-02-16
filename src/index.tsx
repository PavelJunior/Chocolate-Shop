import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {StylesProvider} from '@material-ui/core/styles';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
