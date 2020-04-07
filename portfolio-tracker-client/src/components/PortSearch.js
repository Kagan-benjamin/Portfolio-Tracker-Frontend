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
export default PortSearch;