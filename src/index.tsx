import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {StylesProvider} from '@material-ui/core/styles';
import './index.css';

import {Provider} from 'react-redux';
import {store} from './store/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
