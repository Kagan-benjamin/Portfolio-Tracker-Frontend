import React from 'react';
import './styling/App.css';
import history from './utilities/history.js';
import { Router, Route, Switch } from "react-router-dom";
import HomePage from './containers/HomePage.js'
import MyPortfolios from './containers/MyPortfolios.js'
import ShowPage from './containers/ShowPage.js'
import Login from './containers/Login.js'
import styled from "styled-components"
class App extends React.Component {
  state =  {
    username: '',
    user_id: null,
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
    })
}
  handleLogin = e => {
    e.preventDefault()
    let correctToggle = false
    let users = this.state.users
    users.forEach(user => {
      if (user.username === e.target[0].value && user.password === e.target[1].value) {
        correctToggle = !correctToggle
        this.setState({
          username: e.target[0].value,
          user_id: user.id
        }, () => this.loginRedirect())
      } else {
        return
      }
    })
    if (correctToggle === false) {
      console.log("Sorry, wrong username or password")
    } 
  }
  loginRedirect = () => {
    history.push('/myportfolios')
  }
  signOut = () => {
    this.setState({
      username: '',
      user_id: null
    })
    history.push('/')
    window.location.reload()
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
          
          <Route exact path="/myportfolios"
          render={(props) => <MyPortfolios {...props} username={this.state.username} 
          userId={this.state.user_id} 
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
