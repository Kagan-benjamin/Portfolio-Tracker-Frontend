import React from "react"
import '../styling/HomeIndex.css';

class PortAllocation extends React.Component {

    seeProps = () => {
        console.log(this.props)
    }

  render() {
    return (
    <tr onClick={this.seeProps}>
       <td>{this.props.allocation.toFixed(2)}</td>
    </tr>
    )
  }
}

export default PortAllocation