import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
       <App />
  </BrowserRouter>
   
  </React.StrictMode>,
  document.getElementById('root')
);


registerServiceWorker();