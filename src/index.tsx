import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from '@app/App';
import reportWebVitals from '@app/reportWebVitals';
import {Provider} from 'react-redux';
import {toast} from 'react-toastify';
import store, { persistor } from '@store';
import { PersistGate } from 'redux-persist/integration/react'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'top-right',
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnHover: true
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
