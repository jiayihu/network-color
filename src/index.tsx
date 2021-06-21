import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/bootstrap.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

initializeApp({
  apiKey: 'AIzaSyCzT0MyzMFGYzvU3H46hOmUKFizMhwsxVc',
  authDomain: 'network-color.firebaseapp.com',
  projectId: 'network-color',
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
