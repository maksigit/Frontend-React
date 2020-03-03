import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThroughProvider } from 'react-through';
import store from './store';
import 'reset-css';
import App from './app';

// Window orientation screen reload

window.addEventListener('orientationchange', () => {
    document.location.reload();
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThroughProvider>
                <App />
            </ThroughProvider>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
