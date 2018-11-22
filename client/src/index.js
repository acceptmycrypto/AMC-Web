import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BrowserRouter from "react-router-dom/BrowserRouter";
import HttpsRedirect from 'react-https-redirect';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from "redux-thunk";
import allReducers from './reducers';

//all data store in variable store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//all data store in variable store
const store = createStore(
  allReducers, composeEnhancers(applyMiddleware(thunk))
//middleware which we can add to Redux to effectively teach it how to deal with new kinds of actions.
);

ReactDOM.render(
  <Provider store={store}>
  {/* HttpsRedirect needed on the frontend to redirect from http to https */}
    <HttpsRedirect>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HttpsRedirect>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
