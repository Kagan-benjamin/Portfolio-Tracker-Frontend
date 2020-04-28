import React from "react"
import '../styling/HomeIndex.css';
import { Table } from 'semantic-ui-react'

class PortAllocation extends React.Component {

    seeProps = () => {
        console.log(this.props)
    }

  render() {
    return (
    <Table.Row onClick={this.seeProps}>
       <Table.Cell>{this.props.allocation.toFixed(2)}</Table.Cell>
    </Table.Row>
    )
  }
}

export default PortAllocation