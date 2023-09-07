import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

/**
 * This script initializes the main rendering point for the application.
 * It sets up the Redux store provider and connects the main App component to it.
 * Concurrent rendering with React 18+ is used to create a root and render the app.
 * Additionally, it includes a way to report web vitals for performance insights.
 */

// Initialize the root for concurrent rendering.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App inside StrictMode and Redux Provider.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Reporting web vitals can help capture performance insights in the application.
// This can be directed to a logging system or analytics endpoint.
// Uncomment the following line to log vitals to the console:
// reportWebVitals(console.log);
reportWebVitals();
