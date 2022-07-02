import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, compose, createStore } from 'redux';
import mainReducer from './reducers/Rootreducer'
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
const store = createStore(mainReducer, applyMiddleware(thunk));
const persistor = persistStore(store);


ReactDOM.render(
  <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
