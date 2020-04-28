<<<<<<< HEAD
import React from 'react';
import NavBar from './NavBar.js'
import PortIndex from '../components/PortIndex.js'
import PortSearch from '../components/PortSearch.js'

class MyPortfolios extends React.Component {

    render() {
        return (
            <div className="my-portfolios">
                <NavBar username={this.props.username} 
                noUser={this.props.noUser}
                />
                <PortSearch />
                <PortIndex />
            </div>
        );
    }
} 
=======
import React from 'react';
import NavBar from './NavBar.js'
import PortIndex from '../components/PortIndex.js'

class MyPortfolios extends React.Component {

    state = {
        currentPorts: [],
        user_id:  null
    }

    componentDidMount() {
        this.setUser(this.props.userId)
    }

    setUser = user => {
        this.setState({
            user_id: user
        }, () => console.log(this.state.user_id))
    }

    render() {
        return (
            <div className="my-portfolios">
                <NavBar username={this.props.username} 
                noUser={this.props.noUser}
                />
                <PortIndex userId={this.props.userId} 
                />
            </div>
        );
    }
} 
>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
export default MyPortfolios;