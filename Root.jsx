import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function Root() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Root