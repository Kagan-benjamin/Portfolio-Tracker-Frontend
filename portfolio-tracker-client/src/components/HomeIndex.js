import React from 'react';
import HomeListing from './HomeListing.js';
import '../styling/HomeIndex.css';
const API_KEY = "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
const region = "US", lang = "en";
const symbols = "MSFT";

class HomeIndex extends React.Component {

    state = {
        indexStocks: []
    }

    componentDidMount() {
        this.fetchStocks()
    }

    fetchStocks() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=MSFT%252CAAPL%252CAMZN%252CFB%252CJNJ%252CINTC%252CGOOG%252CPG%252CJPM%252CV%252CGILD", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		    "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	    }
        })
        .then(response => response.json())
        .then(data => this.setStocks(data.quoteResponse.result))
    }

    setStocks = (stocks) => {
        this.setState({
            indexStocks: stocks
        }, () => console.log(this.state.indexStocks))
    }

    render() {
        let currentStocks = this.state.indexStocks
        return (
            <div className="Homeindex">
                <table className="Homeindex-table">
                <thead>
                <tr>
                    <th scope="col">Ticker:</th>
                    <th scope="col">Name:</th>
                    <th scope="col">Current Price:</th>
                    <th scope="col">Daily Price Perf:</th>
                    <th scope="col">Daily Percent Perf:</th>
                </tr>
                </thead>
                    <tbody>
                        {currentStocks.map(stock => (
                            <HomeListing key={stock.id} {...stock}
                            />)
                        )    
                        }

                        {/* <tr>
                            <td>{this.state.MSFT.sector}</td>
                            <td>{this.state.MSFT.ticker}</td>
                            <td>{this.state.MSFT.name}</td>
                            <td>${this.state.MSFT.price}</td>
                            <td>{this.handlePerfChangeColor(this.state.MSFT.perfChange)}</td>
                            <td>{this.handlePerfPercentColor(this.state.MSFT.perfPercent)}</td>
                        </tr> */}

                    </tbody>
                </table>
            </div>
        );
    }
} 
export default HomeIndex;