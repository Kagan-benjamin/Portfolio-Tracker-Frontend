import React from 'react';
import './styling/App.css';
import history from './utilities/history.js';
import { Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar.js'
import HomePage from './components/HomePage.js'

class App extends React.Component {

  render() {
    return (
      <div className="App">
      <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/navbar"
          render={(props) => <NavBar {...props} />} />
          <Route exact path="/"
          render={(props) => <HomePage {...props} /> } />
        </Switch>
      </Router>
      </div>
      </div>
    );
  }
}
export default App;
