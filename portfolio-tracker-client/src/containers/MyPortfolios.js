import React from 'react';
import NavBar from './NavBar.js'
import PortIndex from '../components/PortIndex.js'
import PortSearch from '../components/PortSearch.js'

class MyPortfolios extends React.Component {

    render() {
        return (
            <div className="my-portfolios">
                <NavBar />
                <PortSearch />
                <PortIndex />
            </div>
        );
    }
} 
export default MyPortfolios;