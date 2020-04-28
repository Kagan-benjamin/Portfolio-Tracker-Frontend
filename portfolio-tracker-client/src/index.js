<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(<Router><Route path='/' component={App} /></Router>, document.getElementById('root'));


=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter as Router, Route } from "react-router-dom";


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(<Router><Route path='/' component={App} /></Router>, document.getElementById('root'));


>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
