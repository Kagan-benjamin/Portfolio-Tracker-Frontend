import React from 'react';
import HomeListing from './HomeListing.js';
import '../styling/HomeIndex.css';


class HomeIndex extends React.Component {

    state = {
        indexStocks: []
    }

    componentDidMount() {
        this.setIndex(this.props.indexStocks)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.indexStocks !== prevProps.indexStocks) {
        this.setIndex(this.props.indexStocks)
        }
    }

    // fetchStocks() {
    //     fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=MSFT%252CAAPL%252CAMZN%252CFB%252CJNJ%252CGOOG%252CV%252CJPM%252CPG%252CINTC%252CVZ%252CUNH%252CMA%252CT%252CHD%252CMRK%252CPFE%252CDIS%252CPEP%252CKO%252CBAC%252CXOM%252CWMT%252CCSCO%252CCMCSA%252CNFLX%252CNVDA%252CCVX%252CADBE%252CABT%252CCOST%252CBMY%252CMCD%252CCRM%252CMDT%252CAMGN%252CLLY%252CTMO%252CPYPL%252CPM%252CNEE%252CABBV%252CWFC%252CORCL%252CNKE%252CACN%252CIBM%252CUNP", {
	//     "method": "GET",
	//     "headers": {
	// 	    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	// 	    "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	//     }
    //     })
    //     .then(response => response.json())
    //     .then(data => this.setStocks(data.quoteResponse.result))
    // }

    setIndex = (stocks) => {
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
export default HomeIndex;