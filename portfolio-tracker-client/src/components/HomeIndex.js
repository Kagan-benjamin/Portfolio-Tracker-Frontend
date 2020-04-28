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
export default HomeIndex;