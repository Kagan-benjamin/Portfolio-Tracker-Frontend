import React from 'react';
import '../styling/HomeIndex.css';

class IndexSearch extends React.Component {

    refreshPage = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className="index-search">
                Index Search
                <button className="refresh" 
                type="button"
                value="refresh"
                onClick={this.refreshPage}>
                    Refresh</button>
            </div>
        );
    }
} 
export default IndexSearch;