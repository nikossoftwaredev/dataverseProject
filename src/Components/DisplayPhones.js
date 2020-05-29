import React, { Component } from 'react'

export class DisplayPhones extends Component {

    constructor(props){
        super(props)

        this.state = {
            id:props.id,
            value:props.value,
        }
    }
    render() {
        return (
            <tr>
                <td>Phone {this.state.id}: </td><td>{this.state.value}</td>
            </tr> 
        )
    }
}

export default DisplayPhones
