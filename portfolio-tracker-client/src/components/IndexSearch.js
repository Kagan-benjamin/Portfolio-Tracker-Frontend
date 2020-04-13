import React from 'react';
import '../styling/HomeIndex.css';

class IndexSearch extends React.Component {

    refreshPage = (e) => {
        e.preventDefault()
        // this.props.refreshIndex()
        window.location.reload();
    }

    render() {
        return (
            <div className="index-search">
                Index Search
                <button className="refresh" 
                type="button"
                value="refresh"
                onClick={(e) => this.refreshPage(e)}>
                    Refresh</button>
            </div>
        );
    }
} 
export default IndexSearch;