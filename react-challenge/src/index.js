import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './Tests/reportWebVitals';
import SPA from "./SPA";
import {UserInfo} from "./Components/Users/UserInfo";


ReactDOM.render(
  <React.StrictMode>
      <div className="App" >
          <UserInfo>
              <SPA/>
          </UserInfo>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
