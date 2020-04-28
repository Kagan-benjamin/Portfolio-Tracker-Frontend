import React from 'react';
import PortListing from './PortListing.js';
import PortAllocation from './PortAllocation.js';
import CreatePortfolioForm from './CreatePortfolioForm.js';
import { Table } from 'semantic-ui-react'
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
        allocationObj: [],
        currentPortfolio: []
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
                    // Add new portfolio to state //
    
    addNewPortfolio = newPort => {
        this.setState(prevState => ( {portfolioStocks: [...prevState.portfolioStocks, newPort], currentPortfolio: [newPort]} ))
    }



                    // Fetch + Set Portfolios //

    fetchPortfolios() {
        fetch("http://localhost:3004/portfolios/")
        .then(response => response.json())
        .then(data => this.setStocks(data))
    }

    setStocks = (portfolios) => {
        if (this.props.userId != null) {
        let currentPortfolios = portfolios.filter(portfolio => portfolio.user_id === this.props.userId)
        let currentPortArray = []
        currentPortArray.push(currentPortfolios[0])
        this.setState({
            portfolioStocks: currentPortfolios,
            currentPortfolio: currentPortArray
        }, () => this.showPortfolio(this.state.currentPortfolio))
        }
    }

                     // Fetch + Set Stocks //

    fetchStocks() {
        fetch("http://localhost:3004/stocks/")
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

    showPortfolio = (portfolios) => {
        if (portfolios[0] === null) {
            return 
        }
        // let portfolioStocks = []
        // portfolioStocks = portfolios
        console.log(this.state.currentPortfolio)

        let showStocks = []
        let portName = portfolios[0].name 
        let stockIds = portfolios[0].portfoliostocks.map(showStock => showStock.stock_id)
        let stockAllocations = portfolios[0].portfoliostocks.map(showStock => showStock.allocation)
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
        })
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

    fetchIndex = () => {
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
        })
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

    handlePortChange = (e) => {
        let portString = e.target.innerText.split(' ')
        let end = portString.length - 1   // HARDCODE EXCEPTIONS
        let portfolios = this.state.portfolioStocks
        let correctPort = []
        if (end === 4) {
            let string1 = portString[0]
            let string2 = portString[1]
            let string3 = portString[2]
            let fullString = string1.concat(' ', string2)
            fullString = fullString.concat(' ', string3)
            console.log(fullString)
            portfolios.forEach(portfolio => {
                if (portfolio.name == fullString) {
                    correctPort.push(portfolio)
                }
            console.log(correctPort)
            this.setState({
                currentPortfolio: correctPort
            }, () => this.showPortfolio(this.state.currentPortfolio))
            })
        } if (end === 1) {
            let i = 0
            let fullString = portString[i] 
            console.log(fullString)
            portfolios.forEach(portfolio => {
                if (portfolio.name == fullString) {
                    correctPort.push(portfolio)
                }
            console.log(correctPort)
            this.setState({
                currentPortfolio: correctPort
            }, () => this.showPortfolio(this.state.currentPortfolio))

            
            })
            } if (end === 2 || end === 3) {
            let i = 0
            let string1 = portString[i]
            let string2 = portString[i+1]
            let fullString = string1.concat(' ', string2)
            console.log(fullString)
            portfolios.forEach(portfolio => {
                if (portfolio.name == fullString) {
                    correctPort.push(portfolio)
                }
            console.log(correctPort)
            this.setState({
                currentPortfolio: correctPort
            }, () => this.showPortfolio(this.state.currentPortfolio))
            })
        }
            // } if (end === 3) {
        //     let i = 0
        //     let string1 = portString[i]
        //     let string2 = portString[i+1]
        //     let string3 = portString[i+2]
        //     let fullString = string1.concat(' ', string2)
        //     fullString =  fullString.concat(' ', string3)
        //     console.log(fullString)
        // }
        // let portfolios = this.state.portfolioStocks
        // portfolios.forEach(portfolio => console.log(portfolio.name))
    }

    portTextToggle = () => {
        if (this.props.userId != null) {
            return (
                <h3>
                    Portfolio Daily Performance: {this.handlePerfPercentColor(this.state.portPerformance)}
                </h3>
            )
        } else {
            return (
                <div>
                    <br></br><br></br>
                    <h2 className="no-user-port-index">
                        Please sign in to view portfolios
                    </h2>
                </div>
            )
        }
    }

    portTickerToggle = () => {
        if (this.props.userId != null) {
            return (
                <Table.HeaderCell>
                    Ticker:
                </Table.HeaderCell>
            )
        } else {
            return 
        }
    }

    portNameToggle = () => {
        if (this.props.userId != null) {
            return (
                <Table.HeaderCell>
                    Name:
                </Table.HeaderCell>
            )
        } else {
            return 
        }
    }

    portPriceToggle = () => {
        if (this.props.userId != null) {
            return (
                <Table.HeaderCell>
                    Current Price:
                </Table.HeaderCell>
            )
        } else {
            return 
        }
    }

    portDollarToggle = () => {
        if (this.props.userId != null) {
            return (
                <Table.HeaderCell>
                    Daily $ Perf:
                </Table.HeaderCell>
            )
        } else {
            return 
        }
    }

    portPercentToggle = () => {
        if (this.props.userId != null) {
            return (
                <Table.HeaderCell>
                    Daily % Perf:
                </Table.HeaderCell>
            )
        } else {
            return 
        }
    }

    portAllocationToggle = () => {
        if (this.props.userId != null) {
            return (
                <Table.HeaderCell>
                    Allocation %:
                </Table.HeaderCell>
            )
        } else {
            return 
        }
    }

    render() {
        if (this.state.portfolioStocks === [] || this.state.stockIndex === [] ) {
            return null
        }

        let currentPortfolios = this.state.portfolioStocks
        let currentStocks = this.state.portIndex
        let currentAllocation = this.state.allocationObj
        if (this.props.userId != null) {
            
        return (
            <div className="Portindex">
                <CreatePortfolioForm addNewPortfolio={this.addNewPortfolio} userId={this.props.userId} stockIndex={this.state.stockIndex} />
                <div className="port-names">
                {currentPortfolios.map(portfolio => (
                    <span onClick={e => this.handlePortChange(e)}>{portfolio.name} | </span>
                ))}
                </div>
                <h2>{this.state.portName} <button>Delete Portfolio</button> </h2>
                {this.portTextToggle()}
                {/* <h4>Portfolio Daily Performance: {this.handlePerfPercentColor(this.state.portPerformance)}</h4> */}
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{this.portTickerToggle()}</Table.HeaderCell>
                            <Table.HeaderCell>{this.portNameToggle()}</Table.HeaderCell>
                            <Table.HeaderCell>{this.portPriceToggle()}</Table.HeaderCell>
                            <Table.HeaderCell>{this.portDollarToggle()}</Table.HeaderCell>
                            <Table.HeaderCell>{this.portPercentToggle()}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {currentStocks.map(stock => (
                            <PortListing key={stock.id} {...stock}
                            />
                        ))}
                    </Table.Body>
                </Table>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{this.portAllocationToggle()}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {currentAllocation.map(allocation => (
                            <PortAllocation key={allocation.id} {...allocation}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
        } else {
            return (
                <div>
                    {this.portTextToggle()}
                </div>
            )
        }
    }
} 
export default PortIndex;