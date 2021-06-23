import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from "./my-context";
// import i18n (needs to be bundled ;)) 
import './i18n';

ReactDOM.render(
  <Suspense fallback={<div> Loading ~~</div>}>
  <AuthProvider>
    <App />
  </AuthProvider></Suspense>,
  document.getElementById('root')
);

