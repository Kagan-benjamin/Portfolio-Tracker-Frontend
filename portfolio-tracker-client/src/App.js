import React from 'react';
import './styling/App.css';
import history from './utilities/history.js';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './containers/HomePage.js'
import MyPortfolios from './containers/MyPortfolios.js'
import ShowPage from './containers/ShowPage.js'
import Login from './containers/Login.js'
import styled from "styled-components"

class App extends React.Component {

  state =  {
    username: '',
    users: []
  }

  componentDidMount() {
   this.fetchUsers()
  }

  fetchUsers() {
    fetch("http://localhost:3004/users/")
    .then(response => response.json())
    .then(data => this.setUsers(data))
  } 

  setUsers = (users) => {
    this.setState({
        users: users
    }, () => console.log(this.state.users))
}

  handleLogin = e => {
    e.preventDefault()
    let correctArray = []
    // console.log(e.target[0].value, e.target[1].value)
    let users = this.state.users
    users.forEach(user => {
      if (user.username === e.target[0].value && user.password == e.target[1].value) {
        correctArray.push(user)
        this.setState({
          username: e.target[0].value
        }, () => this.loginRedirect())
      } else {
        return
      }
    })
    if (correctArray.length === 0) {
      console.log("Sorry, wrong username or password")
    } 
  }

  loginRedirect = () => {
    console.log('successfully logged in')
    return (
      <div>
        {<Redirect to='/myportfolios' />}
      </div>
    )
  }

  signOut = () => {
    this.setState({
      username: ''
    })
  }

  noUser = () => {
    if (this.state.username === "") {
      return (
        <div>
        </div>
      )
    } else {
      const Button = styled.button`
      background: #6bfa0b;
      
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid black;
      border-radius: 3px;
      `;
      return (
        <div align="center">
          Welcome back, {this.state.username}
          <br></br>
          <Button type="submit" onClick={this.signOut} value="Log-Out"><div>Click to Sign Out</div></Button>   
        </div>
      )
    }
  }

  render() {
    
   

    return (
      <div className="App">
      <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/"
          render={(props) => <HomePage {...props} username={this.state.username} 
          noUser={this.noUser}
          /> } />
          
          {/* <Route exact path="/navbar"
          render={(props) => <NavBar {...props} />} /> */}
          
          <Route exact path="/myportfolios"
          render={(props) => <MyPortfolios {...props} username={this.state.username} 
          noUser={this.noUser}
          /> } />

          <Route exact path="/showpage"
          render={(props) => <ShowPage {...props} username={this.state.username} 
          noUser={this.noUser}
          /> } />
          
          <Route exact path="/login"
          render={(props) => <Login {...props} username={this.state.username} 
          noUser={this.noUser} handleLogin={this.handleLogin}
          /> } />

        </Switch>
      </Router>
      </div>
      </div>
    );
  }
}
export default App;
