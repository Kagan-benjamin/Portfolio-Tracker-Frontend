import React from 'react';
import HomeIndex from '../components/HomeIndex.js'
import IndexSearch from '../components/IndexSearch.js'
import NavBar from './NavBar.js'

class HomePage extends React.Component {

    render() {
        return (
            <div className="Homepage">
                <NavBar username={this.props.username} 
                noUser={this.props.noUser}
                />
                <IndexSearch />
                <HomeIndex />
            </div>
        );
    }
} 
export default HomePage;