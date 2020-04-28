<<<<<<< HEAD
import React from 'react';
import NavBar from './NavBar.js'
import styled from "styled-components"

class Login extends React.Component {

    state = {
        loginName: '',
        loginPassword: ''
    }

    handleNameChange = e => {
        this.setState({ loginName: e.target.value })
    }

    handlePasswordChange = e => {
        this.setState({ loginPassword: e.target.value })
    }

    render() {
        
        const Button = styled.button`
    background: #6bfa0b;
    
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
    `;
        return (
            <div className="login">
                <NavBar username={this.props.username}
                noUser={this.props.noUser}
                />
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <h2 style={{textAlign: "center"}}>Login</h2>
                </div>
                <div style={{textAlign: "center"}}>
                    
                    <form onSubmit={(e) => {this.props.handleLogin(e)}}>
                        
                        <label style={{fontSize: "30px"}}>
                        Username:
                        <input onChange={(e) => {this.handleNameChange(e)}} value={this.state.loginName} type="text" name="username" style={{marginRight: '75px'}} />
                        </label>
                    
                    <br></br>
                    <br></br>
                        
                        <label style={{fontSize: "30px"}}>
                        Password:
                        <input onChange={(e) => {this.handlePasswordChange(e)}} value={this.state.loginPassword} type="text" name="password" style={{marginRight: '70px'}}/>
                        </label>
                    <br></br>
                        <Button  type="submit" value="Log-In" style={{width: "200px", height: '40px', fontSize: "22px"}}>Log In</Button>
                    </form>
                </div>
            </div>
        );
    }
} 
=======
import React from 'react';
import NavBar from './NavBar.js'
import styled from "styled-components"

class Login extends React.Component {

    state = {
        loginName: '',
        loginPassword: ''
    }

    handleNameChange = e => {
        this.setState({ loginName: e.target.value })
    }

    handlePasswordChange = e => {
        this.setState({ loginPassword: e.target.value })
    }

    handleLoginSubmit = e => {
        this.props.handleLogin(e)
        this.setState({
            loginName: '',
            loginPassword: ''
        })
    }

    render() {
        
        const Button = styled.button`
    background: #6bfa0b;
    
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
    `;
        return (
            <div className="login">
                <NavBar username={this.props.username}
                noUser={this.props.noUser}
                />
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <h2 style={{textAlign: "center"}}>Login</h2>
                </div>
                <div style={{textAlign: "center"}}>
                    
                    <form onSubmit={(e) => {this.handleLoginSubmit(e)}}>
                        
                        <label style={{fontSize: "30px"}}>
                        Username:
                        <input onChange={(e) => {this.handleNameChange(e)}} value={this.state.loginName} type="text" name="username" style={{marginRight: '75px'}} />
                        </label>
                    
                    <br></br>
                    <br></br>
                        
                        <label style={{fontSize: "30px"}}>
                        Password:
                        <input onChange={(e) => {this.handlePasswordChange(e)}} value={this.state.loginPassword} type="password" name="password" style={{marginRight: '70px'}}/>
                        </label>
                    <br></br>
                        <Button  type="submit" value="Log-In" style={{width: "200px", height: '40px', fontSize: "22px"}}>Log In</Button>
                    </form>
                </div>
            </div>
        );
    }
} 
>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
export default Login;