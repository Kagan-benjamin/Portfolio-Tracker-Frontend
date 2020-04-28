<<<<<<< HEAD
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
=======
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
                <button className="refresh" 
                type="button"
                value="refresh"
                onClick={(e) => this.refreshPage(e)}>
                    Refresh</button>
            </div>
        );
    }
} 
>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
export default IndexSearch;