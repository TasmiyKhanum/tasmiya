import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the App component containing the routing
import './index.css'; 

// This file is the main entry point that mounts the React app to the HTML DOM.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);