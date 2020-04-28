import React from 'react';
import '../styling/PortIndex.css';


const initialState = {
    name: '',
    user_id: null,
    stockIndex: [],
    ticker1: '',
    allocation1: 0,
    ticker2: '',
    allocation2: 0,
    ticker3: '',
    allocation3: 0,
    ticker4: '',
    allocation4: 0,
    ticker5: '',
    allocation5: 0,
    ticker6: '',
    ticker7: '',
    ticker8: '',
    ticker9: '',
    ticker10: '',
    newPortId: null
}

class CreatePortfolioForm extends React.Component {

    state = initialState

    componentDidMount() {
        this.setState({
            user_id: this.props.userId,
            stockIndex: this.props.stockIndex
        })
    }

    ticker1Match = ticker1 => {
        let index = this.state.stockIndex
        let ticker1Id = 0
        index.forEach(stock => {
            if (stock.ticker == ticker1) {
            ticker1Id = stock.id
            }
        })
        return ticker1Id
    }

    ticker2Match = ticker2 => {
        let index = this.state.stockIndex
        let ticker2Id = 0
        index.forEach(stock => {
            if (stock.ticker == ticker2) {
            ticker2Id = stock.id
            }
        })
        return ticker2Id
    }

    ticker3Match = ticker3 => {
        let index = this.state.stockIndex
        let ticker3Id = 0
        index.forEach(stock => {
            if (stock.ticker == ticker3) {
            ticker3Id = stock.id
            }
        })
        return ticker3Id
    }

    createPortfolioStocksArray = (ticker1, ticker2, ticker3) => {
        let ticker1Id = this.ticker1Match(ticker1)
        let ticker2Id = this.ticker2Match(ticker2)
        let ticker3Id = this.ticker3Match(ticker3)
        let allocation1 = this.state.allocation1
        let allocation2 = this.state.allocation2
        let allocation3 = this.state.allocation3

        let portfoliostocks = [
            {
                "portfolio_id": this.state.newPortId,
                "stock_id": ticker1Id,
                "allocation": allocation1
            },
            {
                "portfolio_id": this.state.newPortId,
                "stock_id": ticker2Id,
                "allocation": allocation2
            },
            {
                "portfolio_id": this.state.newPortId,
                "stock_id": ticker3Id,
                "allocation": allocation3
            }
        ]
        return portfoliostocks
    }

    createNewPortfolio = (name, user_id) => {
        let portDataObj = {
            "name": name,
            "user_id": user_id,
            "portfoliostocks": [] 
        }
        return portDataObj
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value })
    }

    handleTicker1 = e => {
        this.setState({ ticker1: e.target.value })
    }

    handleAllocation1 = e => {
        this.setState({ allocation1: e.target.value })
    }

    handleTicker2 = e => {
        this.setState({ ticker2: e.target.value })
    }

    handleAllocation2 = e => {
        this.setState({ allocation2: e.target.value })
    }

    handleTicker3 = e => {
        this.setState({ ticker3: e.target.value })
    }

    handleAllocation3 = e => {
        this.setState({ allocation3: e.target.value })
    }

    handleTicker4 = e => {
        this.setState({ ticker4: e.target.value })
    }

    handleAllocation4 = e => {
        this.setState({ allocation4: e.target.value })
    }

    handleTicker5 = e => {
        this.setState({ ticker5: e.target.value })
    }

    handleAllocation5 = e => {
        this.setState({ allocation5: e.target.value })
    }

    setNewPortId = data => {
        this.setState({
            newPortId: data.id
        })
    }

    postPortfolio = data => fetch('http://localhost:3004/portfolios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => this.setNewPortId(data))

    postPortfolioStocks = data => fetch('http://localhost:3004/portfoliostocks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => this.handleNewPortStock(data))

    handleNewPortStock = newPortStock => {
        console.log(newPortStock)
        // this.props.addNewPortfolio(newPort)
        // this.setState(initialState)
    }

    handleSubmit = e => {
        e.preventDefault()
        // FORMAT PORTFOLIOSTOCKS
        let port = this.createNewPortfolio(this.state.name, this.state.user_id)
        let ticker1Id = this.ticker1Match(this.state.ticker1)
        let ticker2Id = this.ticker2Match(this.state.ticker2)
        let ticker3Id = this.ticker3Match(this.state.ticker3)
        let allocation1 = this.state.allocation1
        let allocation2 = this.state.allocation2
        let allocation3 = this.state.allocation3

        this.postPortfolio(port)
        
        let portfoliostock1 = {
            "portfolio_id": this.state.newPortId,
            "stock_id": ticker1Id,
            "allocation": allocation1
        }

        let portfoliostock2 =  {
            "portfolio_id": this.state.newPortId,
            "stock_id": ticker2Id,
            "allocation": allocation2
        }

        let portfoliostock3 = {
            "portfolio_id": this.state.newPortId,
            "stock_id": ticker3Id,
            "allocation": allocation3
        }

        this.postPortfolioStocks(portfoliostock1)
        this.postPortfolioStocks(portfoliostock2)
        this.postPortfolioStocks(portfoliostock3)
        .then(finalPort => {
            let portDataObj = {
                "name": this.state.name,
                "user_id": this.state.user_id,
                "portfoliostocks": [
                    {
                        "portfolio_id": this.state.newPortId,
                        "stock_id": ticker1Id,
                        "allocation": allocation1
                    },
                    {
                        "portfolio_id": this.state.newPortId,
                        "stock_id": ticker2Id,
                        "allocation": allocation2
                    },
                    {
                        "portfolio_id": this.state.newPortId,
                        "stock_id": ticker3Id,
                        "allocation": allocation3
                    }
                ]
            }
            this.props.addNewPortfolio(portDataObj)
            this.setState(initialState)
        })

    }

    render() {
        return (
            <form id="create-portfolio-form" onSubmit={this.handleSubmit}>
                <label className="name-label">Name: </label>
                <input onChange={this.handleNameChange} value={this.state.name} name="name" type="text" placeholder="Portfolio Name..." />
                <br></br>

                <label className="ticker-label">Ticker: </label>
                <input onChange={this.handleTicker1} value={this.state.ticker1} name="ticker1" type="text" placeholder="add ticker" />

                <label className="allocation-label">Allocation: </label>
                <input onChange={this.handleAllocation1} value={this.state.allocation1} name="allocation1" type="number" placeholder="add allocation (%)" />
                <br></br>

                <label className="ticker-label">Ticker: </label>
                <input onChange={this.handleTicker2} value={this.state.ticker2} name="ticker2" type="text" placeholder="add ticker" />

                <label className="allocation-label">Allocation: </label>
                <input onChange={this.handleAllocation2} value={this.state.allocation2} name="allocation2" type="number" placeholder="add allocation (%)" />
                <br></br>

                <label className="ticker-label">Ticker: </label>
                <input onChange={this.handleTicker3} value={this.state.ticker3} name="ticker3" type="text" placeholder="add ticker" />

                <label className="allocation-label">Allocation: </label>
                <input onChange={this.handleAllocation3} value={this.state.allocation3} name="allocation3" type="number" placeholder="add allocation (%)" />
                <br></br>

                <label className="ticker-label">Ticker: </label>
                <input onChange={this.handleTicker4} value={this.state.ticker4} name="ticker4" type="text" placeholder="add ticker" />

                <label className="allocation-label">Allocation: </label>
                <input onChange={this.handleAllocation4} value={this.state.allocation4} name="allocation4" type="number" placeholder="add allocation (%)" />
                <br></br>

                <label className="ticker-label">Ticker: </label>
                <input onChange={this.handleTicker5} value={this.state.ticker5} name="ticker5" type="text" placeholder="add ticker" />

                <label className="allocation-label">Allocation: </label>
                <input onChange={this.handleAllocation5} value={this.state.allocation5} name="allocation5" type="number" placeholder="add allocation (%)" />
                <br></br>

                <input type="submit" value="Add Portfolio" />
            </form>
        )
    }
}
export default CreatePortfolioForm