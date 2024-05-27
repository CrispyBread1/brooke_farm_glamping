import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {addBooking, editBooking, retreiveBooking, cancelBooking} from './Scripts/databaseControls.js';
import { logInEmailPassword, registerNewAccountEmailPassword } from './Scripts/authenicationControls';

const root = ReactDOM.createRoot(document.getElementById('root'));



const newBooking = () => {
  addBooking('222', 'ashley', '26');
}

const logInAttempt = (email, password) => {
  return (logInEmailPassword(email, password))
}

const registerNewAccountAttempt = (email, password) => {
  return (registerNewAccountEmailPassword(email, password))
}

root.render(
  <React.StrictMode>
    <App newBooking={newBooking} logInAttempt={logInAttempt} registerNewAccountAttempt={registerNewAccountAttempt}/>
  </React.StrictMode>
);



// writeToDB("111", "Dan", "24")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
