import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
//import { store } from './App/store';
import ErrorDisplay from './Pages/ErrorDisplay/ErrorDisplay';
import "./Lib/i18n/i18n.js";
import "./Assets/styling/colorPalette/cp-variables.css";
import "./style.css";
import "./Assets/styling/fonts.css";

const protocol = location.protocol;


ReactDOM.render(
    // something
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {protocol === "https" 
                    ? (
                        <ErrorBoundary 
                            FallbackComponent={ErrorDisplay}
                            onReset={() => (location.href = '/')}
                        >
                            <App />
                        </ErrorBoundary>
                    ) 
                    : (<App/>)
                }
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);