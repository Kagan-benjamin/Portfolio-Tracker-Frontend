import React from "react"
import '../styling/HomeIndex.css';

const divGreen = { color: 'green' };
const divRed = { color: 'red' };

class PortListing extends React.Component {

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

  render() {
    return (
    <tr>
       <td>{this.props.symbol}</td>
       <td>{this.props.shortName}</td> 
       <td>{this.handlePriceRounding(this.props.regularMarketPrice)}</td>
       <td>{this.handlePerfChangeColor(this.props.regularMarketChange)}</td>
       <td>{this.handlePerfPercentColor(this.props.regularMarketChangePercent)}</td>
    </tr>
    )
  }
}

export default PortListing