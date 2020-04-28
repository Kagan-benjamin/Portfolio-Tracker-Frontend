<<<<<<< HEAD
import React from 'react';
import HomeListing from './HomeListing.js';
import '../styling/HomeIndex.css';


class HomeIndex extends React.Component {

    state = {
        indexStocks: []
    }

    componentDidMount() {
        this.fetchStocks()
    }

    fetchStocks() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=MSFT%252CAAPL%252CAMZN%252CFB%252CJNJ%252CGOOG%252CV%252CJPM%252CPG%252CINTC%252CVZ%252CUNH%252CMA%252CT%252CHD%252CMRK%252CPFE%252CDIS%252CPEP%252CKO%252CBAC%252CXOM%252CWMT%252CCSCO%252CCMCSA%252CNFLX%252CNVDA%252CCVX%252CADBE%252CABT%252CCOST%252CBMY%252CMCD%252CCRM%252CMDT%252CAMGN%252CLLY%252CTMO%252CPYPL%252CPM%252CNEE%252CABBV%252CWFC%252CORCL%252CNKE%252CACN%252CIBM%252CUNP", {
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
        })
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
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
} 
=======
import React from 'react';
import { Table } from 'semantic-ui-react'
import _ from 'lodash'
import '../styling/HomeIndex.css';

const divGreen = { color: 'green' };
const divRed = { color: 'red' };

class HomeIndex extends React.Component {

    state = {
        column: null,
        data: null,
        direction: null,
        indexStocks: [],
        indexSummary: []
    }

    componentDidMount() {
        this.setIndex(this.props.indexStocks)
        this.setSummary(this.props.indexSummary)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.indexStocks !== prevProps.indexStocks) {
            this.setIndex(this.props.indexStocks)
        }
        if (this.props.indexSummary !== prevProps.indexSummary) {
            this.setSummary(this.props.indexSummary)
        }
    }

    handlePriceRounding = (price) => {
        let roundPrice = price.toFixed(2);
        if (price > 0) {
            return (
                <div>${roundPrice}</div>
            )
        }
    }

    handlePerfChangeColor = (perfChange) => {
        let roundPerfChange = perfChange.toFixed(2);
        if (perfChange > 0) {
            return (
                <div style={divGreen}>+{roundPerfChange}$</div>
            )
        } if (perfChange < 0) {
            return (
                <div style={divRed}>{roundPerfChange}$</div>
            )
        } else {
            return (
                <div>${roundPerfChange}</div>
            )
        }
    }

    handlePerfPercentColor = (perfPercent) => {
        let roundPerfPercent = perfPercent.toFixed(2);
        if (perfPercent > 0) {
            return (
                <div style={divGreen}>+{roundPerfPercent}%</div>
            )
        } if (perfPercent < 0) {
            return (
                <div style={divRed}>{roundPerfPercent}%</div>
            )
        } else {
            return (
                <div>{roundPerfPercent}%</div>
            )
        }
    }

    setIndex = (stocks) => {
        this.setState({
            data: stocks,
            indexStocks: stocks
        })
    }

    setSummary = (indices) => {
        this.setState({
            indexSummary: indices
        })
    }

    handleSort = (clickedColumn) => () => {
        const { column, data } = this.state
        let currentIndex = this.state.data.sort((a, b) => (a.regularMarketChangePercent < b.regularMarketChangePercent) ? 1 : -1)
        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            // data: _.sortBy(data, [clickedColumn]),
            data: currentIndex,
            direction: 'ascending',
            // indexStocks: _.sortBy(data, [clickedColumn])
            indexStocks: currentIndex
          })
    
          return
        }
        this.setState({
          column: null,
          data: data.reverse(),
          direction: 'descending'
        })
    }



    render() {
        const { column, data, direction } = this.state
        return (
                <Table sortable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Ticker</Table.HeaderCell> 
                            <Table.HeaderCell>Company Name</Table.HeaderCell>
                            <Table.HeaderCell>Current Price</Table.HeaderCell>
                            
                            <Table.HeaderCell
                                sorted={column === '$ Performance' ? direction : null}
                                onClick={this.handleSort('$ Performance')}
                            >$ Performance</Table.HeaderCell>

                            <Table.HeaderCell
                                sorted={column === '% Performance' ? direction : null}
                                onClick={this.handleSort('% Performance')}
                            >% Performance</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ symbol, shortName, regularMarketPrice, regularMarketChange, regularMarketChangePercent }) => (
                        <Table.Row key={symbol}>
                            <Table.Cell>{symbol}</Table.Cell>
                            <Table.Cell>{shortName}</Table.Cell>
                            <Table.Cell>{this.handlePriceRounding(regularMarketPrice)}</Table.Cell>
                            <Table.Cell>{this.handlePerfChangeColor(regularMarketChange)}</Table.Cell>
                            <Table.Cell>{this.handlePerfPercentColor(regularMarketChangePercent)}</Table.Cell>
                        </Table.Row>
                        ))} 
                            
                            
                            {/* {currentStocks.map(stock => (
                            <HomeListing key={stock.id} {...stock} />
                            ))} */}
                    </Table.Body>
                </Table>
        );
    }
} 
>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
export default HomeIndex;