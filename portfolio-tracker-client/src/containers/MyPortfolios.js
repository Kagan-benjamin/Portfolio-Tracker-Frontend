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
export default MyPortfolios;