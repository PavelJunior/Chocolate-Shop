import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {StylesProvider} from '@material-ui/core/styles';

import reducers from './store/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(reducers);

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
