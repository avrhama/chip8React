import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Bus from './components/bus'
import 'bootstrap/dist/css/bootstrap.css';
function getBaseUrl(){
  var getUrl = window.location;
var baseUrl =getUrl.protocol +"//" +getUrl.host +"/" +getUrl.pathname.split("/")[1];
return baseUrl ;
};
ReactDOM.render(
  <React.StrictMode>
    <div>
    <Bus/>
    <video width="750" height="500" controls >
    <source src={getBaseUrl()+"/chip8guide.mp4"} type="video/mp4"/>
    </video>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
