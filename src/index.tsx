import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {reducer, restoreState} from './reducers';
import App from './app';

const initialState = restoreState()
let store = null
if (initialState === undefined) {
    store = createStore(reducer);
} else {
    console.log("restored state")
    store = createStore(reducer, initialState);
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
