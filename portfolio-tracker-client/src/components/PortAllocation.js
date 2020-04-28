<<<<<<< HEAD
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

=======
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

>>>>>>> b4bcda925956fb7da427a22211f5887cf6b1ab8b
export default PortAllocation