import React from 'react';
const unirest = require('unirest')
const API_KEY = "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
const region = "US", lang = "en";
const symbols = "MSFT";

const divGreen = {
    color: 'green'
};
const divRed = {
    color: 'red'
};

class HomeIndex extends React.Component {
    
    // state = { MSFT: { sector: 'Technology', ticker: 'MSFT', name: 'Microsoft Corporation', price: 0, perfChange: 0, perfPercent: 0},
    //     AAPL: { sector: 'Technology', ticker: 'AAPL', name: 'Apple Inc.', price: 0, perfChange: 0, perfPercent: 0},
    //     GILD: 
    //     {
    //         sector: 'Health Care',
    //         ticker: 'GILD',
    //         name: 'Gilead Sciences Inc.',
    //         price: 0,
    //         perfChange: 0,
    //         perfPercent: 0
    //     }

    // }

    // componentDidMount() {
    //     this.fetchMSFT()
    //     this.fetchAAPL()
    //     this.fetchGILD()
    // }

    // setMSFT = (result) =>  {
    //     this.setState({ ...this.state,
    //         MSFT: {
    //             ...this.state.MSFT,
    //         price: result.body.quoteResponse.result[0].regularMarketPrice,
    //         perfChange: result.body.quoteResponse.result[0].regularMarketChange, 
    //         perfPercent: result.body.quoteResponse.result[0].regularMarketChangePercent  
    //         }
    //     })
    // }

    // setAAPL = (result) =>  {
    //     this.setState({ ...this.state,
    //         AAPL: {
    //             ...this.state.AAPL,
    //         price: result.body.quoteResponse.result[0].regularMarketPrice,
    //         perfChange: result.body.quoteResponse.result[0].regularMarketChange, 
    //         perfPercent: result.body.quoteResponse.result[0].regularMarketChangePercent  
    //         }
    //     })
    // }

    // setGILD = (result) =>  {
    //     this.setState({ ...this.state,
    //         GILD: {
    //             ...this.state.GILD,
    //         price: result.body.quoteResponse.result[0].regularMarketPrice,
    //         perfChange: result.body.quoteResponse.result[0].regularMarketChange, 
    //         perfPercent: result.body.quoteResponse.result[0].regularMarketChangePercent  
    //         }
    //     })
    // }

    // fetchMSFT() {
    //     unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?
    //     region=${region}&lang=${lang}&symbols=MSFT`)
    //     .header("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
    //     .header("X-RapidAPI-Key", API_KEY)
    //     .end(result => {   
    //       this.setMSFT(result);
    //     })
    // }

    // fetchAAPL() {
    //     unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?
    //     region=${region}&lang=${lang}&symbols=AAPL`)
    //     .header("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
    //     .header("X-RapidAPI-Key", API_KEY)
    //     .end(result => {   
    //       this.setAAPL(result);
    //     })
    // }

    // fetchGILD() {
    //     unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?
    //     region=${region}&lang=${lang}&symbols=GILD`)
    //     .header("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com")
    //     .header("X-RapidAPI-Key", API_KEY)
    //     .end(result => {   
    //       this.setGILD(result);
    //     })
    // }

    fetchStocks() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=BAC%252CF%252CKSS", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		    "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	    }
        })
        .then(response => {
	    console.log(response);
        })
        .catch(err => {
	    console.log(err);
        });
    }

    // handlePerfChangeColor = (perfChange) => {
    //     let roundPerfChange = perfChange.toFixed(2);
    //     if (perfChange > 0) {
    //         return (
    //             <div style={divGreen}>+{roundPerfChange}$</div>
    //         )
    //     } if (perfChange < 0) {
    //         return (
    //             <div style={divRed}>{roundPerfChange}$</div>
    //         )
    //     } else {
    //         return (
    //             <div>${roundPerfChange}</div>
    //         )
    //     }
    // }

    // handlePerfPercentColor = (perfPercent) => {
    //     let roundPerfPercent = perfPercent.toFixed(2);
    //     if (perfPercent > 0) {
    //         return (
    //             <div style={divGreen}>+{roundPerfPercent}%</div>
    //         )
    //     } if (perfPercent < 0) {
    //         return (
    //             <div style={divRed}>{roundPerfPercent}%</div>
    //         )
    //     } else {
    //         return (
    //             <div>{roundPerfPercent}%</div>
    //         )
    //     }
    // }

    render() {
        return (
            <div className="Homeindex">
                Oh Hi There
                {/* <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Sector:</th>
                    <th scope="col">Ticker:</th>
                    <th scope="col">Name:</th>
                    <th scope="col">Current Price:</th>
                    <th scope="col">Daily Price Perf:</th>
                    <th scope="col">Daily Percent Perf:</th>
                </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.MSFT.sector}</td>
                            <td>{this.state.MSFT.ticker}</td>
                            <td>{this.state.MSFT.name}</td>
                            <td>${this.state.MSFT.price}</td>
                            <td>{this.handlePerfChangeColor(this.state.MSFT.perfChange)}</td>
                            <td>{this.handlePerfPercentColor(this.state.MSFT.perfPercent)}</td>
                        </tr>
                        <tr>
                            <td>{this.state.AAPL.sector}</td>
                            <td>{this.state.AAPL.ticker}</td>
                            <td>{this.state.AAPL.name}</td>
                            <td>${this.state.AAPL.price}</td>
                            <td>{this.handlePerfChangeColor(this.state.AAPL.perfChange)}</td>
                            <td>{this.handlePerfPercentColor(this.state.AAPL.perfPercent)}</td>
                        </tr>
                        <tr>
                            <td>{this.state.GILD.sector}</td>
                            <td>{this.state.GILD.ticker}</td>
                            <td>{this.state.GILD.name}</td>
                            <td>${this.state.GILD.price}</td>
                            <td>{this.handlePerfChangeColor(this.state.GILD.perfChange)}</td>
                            <td>{this.handlePerfPercentColor(this.state.GILD.perfPercent)}</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        );
    }
} 
export default HomeIndex;