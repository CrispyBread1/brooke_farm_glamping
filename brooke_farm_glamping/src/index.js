import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword } from './Scripts/authenicationControls';

const root = ReactDOM.createRoot(document.getElementById('root'));

const newBooking = () => {
  addBooking('222', 'ashley', '26');
}

const logInAttempt = (email, password) => {
  logInEmailPassword(email, password)
}

root.render(
  <React.StrictMode>
    <App newBooking={newBooking} logInAttempt={logInAttempt}/>
  </React.StrictMode>
);



// writeToDB("111", "Dan", "24")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
