import * as firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxSagaFirebase from 'redux-saga-firebase';
import App from './App';
import './index.css';
import { rootReducer } from './reducers/RootReducer';
import * as serviceWorker from './serviceWorker';

const myFirebaseApp = firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    messagingSenderId: '',
    projectId: '',
    storageBucket: '',
});
export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
// tslint:disable-next-line: jsx-wrap-multiline
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('competitionviewer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
