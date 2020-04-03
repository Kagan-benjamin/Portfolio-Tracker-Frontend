import React from 'react';
import './styling/App.css';
import history from './utilities/history.js';
import { Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar.js'
import HomePage from './components/HomePage.js'
import MyPortfolios from './components/MyPortfolios.js'
import ShowPage from './components/ShowPage.js'

class App extends React.Component {

  render() {
    return (
      <div className="App">
      <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/"
          render={(props) => <HomePage {...props} /> } />
          <Route exact path="/navbar"
          render={(props) => <NavBar {...props} />} />
          <Route exact path="/myportfolios"
          render={(props) => <MyPortfolios {...props} /> } />
          <Route exact path="/showpage"
          render={(props) => <ShowPage {...props} /> } />
        </Switch>
      </Router>
      </div>
      </div>
    );
  }
}
export default App;
