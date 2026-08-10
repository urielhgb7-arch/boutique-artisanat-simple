import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PanierProvider } from './context/PanierContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PanierProvider>
      <App />
    </PanierProvider>
  </React.StrictMode>
);