import React from 'react';
import PortListing from './PortListing.js';
import PortAllocation from './PortAllocation.js';
import '../styling/PortIndex.css';
let API_URL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols="

const divGreen = { color: 'green' };
const divRed = { color: 'red' };

class PortIndex extends React.Component {

    state = {
        portfolioStocks: [],    // portfolios
        stockIndex: [],         // stock objects
        currentTickers: [],     // current tickers for API pull
        portIndex: [],           // stock objects inc from API
        allocation: [],
        portName: '',
        portPerformance: 0,
        allocationObj: []
    }

                    // Lifecycle //

    componentDidMount() {
        this.fetchPortfolios()
        this.fetchStocks()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentTickers !== prevState.currentTickers) {
            this.fetchIndex()
            // this.getName()
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
        let portName = portfolioStocks[0].name 
        let stockIds = portfolioStocks[0].portfoliostocks.map(showStock => showStock.stock_id)
        let stockAllocations = portfolioStocks[0].portfoliostocks.map(showStock => showStock.allocation)
        let index = this.state.stockIndex
        stockIds.forEach(stockId => index.forEach(stock => {
            if (stockId === stock.id) {
                showStocks.push(stock.ticker)
            }
        } ))
        this.setState({
            currentTickers: showStocks,
            allocation: stockAllocations,
            portName: portName
        }, () => this.setAllocations() )
    }

    setAllocations = () => {
        let allocationObj = []
        let allocations = this.state.allocation
        allocations.forEach(allocation => {
            allocationObj.push({allocation})
        })
        this.setState({
            allocationObj: allocationObj
        }, () => console.log(this.state.allocationObj))
    }

 
   
            // Interpolate CurrentTickers within API url

    fetchUrl = () => {
        let portIndex = this.state.currentTickers
        let reqString = ''
        portIndex.forEach(ticker => {
            reqString += ticker + '%252C'
        })
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
        }, () => this.setPercentChange(stocks))
    }

    setPercentChange = (stocksInc) => {            // ACCESS IS HERE
        let stocks = stocksInc 
        let allocations = this.state.allocation
        let percentChangeArray = []
        let allocationArray = []
        
        stocks.forEach(stock => {
            percentChangeArray.push(stock.regularMarketChangePercent/100)
        })
        allocations.forEach(allocation => {
            allocationArray.push(allocation/100)
        })
        console.log(allocationArray)
        console.log(percentChangeArray)
        
        let i = 0
        let end = allocationArray.length - 1
        let calcArray = []

        allocationArray.forEach(allocation => {
            if (i === 0) {
                let mult = allocation * percentChangeArray[0]
                calcArray.push(mult)
                i++
            } if ( i > 0 && i <= end ) {
                let mult = allocation * percentChangeArray[i]
                calcArray.push(mult)
                i++
            }
        })
        let arraySum = calcArray.reduce((a,b) => a + b, 0)
        let portPercentChange = arraySum * 100
        let finalChange = portPercentChange.toFixed(2) 
        this.setState({
            portPerformance: finalChange
        }, () => console.log(this.state.portPerformance))
    }
 
                // Further Functionality //

    handlePerfPercentColor = (perfPercent) => {
        if (perfPercent > 0) {
            return (
                <div style={divGreen}>+{perfPercent}%</div>
            )
        } if (perfPercent < 0) {
            return (
                <div style={divRed}>{perfPercent}%</div>
            )
        } else {
            return (
                <div>{perfPercent}%</div>
            )
        }
    }


    render() {
        let currentStocks = this.state.portIndex
        let currentAllocation = this.state.allocationObj
        return (
            <div className="Portindex">
                <h3>{this.state.portName}</h3>
                <h4>Portfolio Daily Performance: {this.handlePerfPercentColor(this.state.portPerformance)}</h4>
                <table className="Portindex-table">
                <thead>
                <tr>
                    <th scope="col">Ticker:</th>
                    <th scope="col">Name:</th>
                    <th scope="col">Current Price:</th>
                    <th scope="col">Daily $ Perf:</th>
                    <th scope="col">Daily % Perf:</th>
                </tr>
                </thead>
                    <tbody>
                        {currentStocks.map(stock => (
                            <PortListing key={stock.id} {...stock}
                            />
                        ))}
                    </tbody>
                </table>
                <table className="allocation-table">
                    <thead>
                        <tr>
                            <th scope="col">Allocation %:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAllocation.map(allocation => (
                            <PortAllocation key={allocation.id} {...allocation}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
} 
export default PortIndex;