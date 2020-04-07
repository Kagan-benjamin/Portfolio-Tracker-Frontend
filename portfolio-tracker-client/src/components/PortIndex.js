import React from 'react';
import PortListing from './PortListing.js';
import '../styling/PortIndex.css';
let API_URL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols="

class PortIndex extends React.Component {

    state = {
        portfolioStocks: [],    // portfolios
        stockIndex: [],         // stock objects
        currentTickers: [],     // current tickers for API pull
        portIndex: []           // stock objects inc from API
    }

                    // Lifecycle //

    componentDidMount() {
        this.fetchPortfolios()
        this.fetchStocks()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentTickers !== prevState.currentTickers) {
            this.fetchIndex()
        } if (this.state.portIndex !== prevState.portIndex) {

        }
    }

                    // Fetch + Set Portfolios //

    fetchPortfolios() {
        fetch("http://localhost:3000/portfolios/")
        .then(response => response.json())
        .then(data => this.setStocks(data))
    }

    setStocks = (stocks) => {
        this.setState({
            portfolioStocks: stocks
        }, () => this.showPortfolio(this.state.portfolioStocks))
    }

                     // Fetch + Set Stocks //

    fetchStocks() {
        fetch("http://localhost:3000/stocks/")
        .then(response => response.json())
        .then(data => this.setIndex(data))
    }

    setIndex = (stocks) => {
        this.setState({
            stockIndex: stocks
        })
    }

                    // Match portfoliostocks to tickers //
                     //      + Set CurrentTickers      //

    showPortfolio = (portfolioStocks) => {
        let showStocks = []
        let stockIds = portfolioStocks[1].portfoliostocks.map(showStock => showStock.stock_id)
        let index = this.state.stockIndex
        stockIds.forEach(stockId => index.forEach(stock => {
            if (stockId === stock.id) {
                showStocks.push(stock.ticker)
            }
        } ))
        this.setState({
            currentTickers: showStocks
        })
    }
   
            // Interpolate CurrentTickers within API url

    fetchUrl = () => {
        let portIndex = this.state.currentTickers
        let reqString = ''
        portIndex.forEach(ticker => {
            reqString += ticker + '%252C'
        })
        console.log(reqString)
        let fetch_URL = API_URL + reqString 
        return fetch_URL
    }

        // Fetch + Set portIndex, tickers from CurrentTickers //

    fetchIndex() {
        let url = this.fetchUrl()
        if (url === API_URL) {
            return 
        } else {
            fetch(`${url}`, {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		        "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	        }
            })
            .then(response => response.json())
            .then(data => this.setPortIndex(data.quoteResponse.result))
        }
    }

        setPortIndex = (stocks) => {
            this.setState({
            portIndex: stocks
        }, () => {})
    }

   

   

    render() {
        let currentStocks = this.state.portIndex
        return (
            <div className="Portindex">
                <table className="Portindex-table">
                <thead>
                <tr>
                    <th scope="col">Ticker:</th>
                    <th scope="col">Name:</th>
                    <th scope="col">Current Price:</th>
                    <th scope="col">Daily $ Perf:</th>
                    <th scope="col">Daily % Perf:</th>
                    <th scope="col">Allocation %:</th>
                </tr>
                </thead>
                    <tbody>
                        {currentStocks.map(stock => (
                            <PortListing key={stock.id} {...stock}
                            />))    
                        }
                    </tbody>
                </table>
            </div>
        );
    }
} 
export default PortIndex;