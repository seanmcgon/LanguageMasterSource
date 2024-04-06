import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import ClassAsgmts from './components/classAsgmts';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/class-asgmts" element={<ClassAsgmts />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
