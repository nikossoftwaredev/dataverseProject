import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";

//Class for diplaying the editable Phones
export class DisplayPhones extends Component {

    constructor(props){
        super(props)

        this.state = {
            update:props.update,
            id:props.id,
            value:props.value,
        }

        this.onChange = this.onChange.bind(this);
    }

    //Checking if mail is valid
    isPhoneValid(e){         
        if (!isNaN(e.target.value))       
            e.target.style.borderColor = "green";
        else
            e.target.style.borderColor = "red";
        
    }

    //Manipulating the state of parent component and this component
    onChange(e){
        
        this.state.update(e.target.value,this.state.id);
        this.setState(
            {
                ...this.state,
                value:e.target.value,
            }
        )
    }

    render() {
        return (
            <Form.Group  as={Row} >
                    <Form.Label column sm="2">Phone {this.state.id} </Form.Label>
                    <Col >
                    <Form.Control onBlur = {this.isPhoneValid} onChange = {this.onChange} value={this.state.value}/>
                    </Col>
             </Form.Group>

        )
    }
}

export default DisplayPhones
