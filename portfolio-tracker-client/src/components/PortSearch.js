<<<<<<< HEAD
import React from 'react';
import '../styling/HomeIndex.css';

class PortSearch extends React.Component {

    refreshPage = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className="port-search">
                Portfolio Search
                <button className="refresh" 
                type="button"
                value="refresh"
                onClick={this.refreshPage}>
                    Refresh</button>
            </div>
        );
    }
} 
=======
import React from 'react';
import '../styling/HomeIndex.css';

class PortSearch extends React.Component {

    refreshPage = () => {
        window.location.reload();
    }

    handlePorts = () => {

    }

    handleUser = (userId) => {
        if (userId === null) {
            return (
                <h3>
                    Please log in to view portfolios
                </h3>
            )
        } else {
            return (
                    <h3 className="port-username">
                        User Id: {this.props.userId}
                    </h3>   
            )
        }
    }

    render() {
        let loggedIn = this.props.userId
        return (
            <div className="port-search">
                {this.handleUser(loggedIn)}
                <button className="refresh" 
                type="button"
                value="refresh"
                onClick={this.refreshPage}>
                    Refresh</button>
            </div>
        );
    }
} 
>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
export default PortSearch;