import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";

export class Phone extends Component {

    constructor(props){
        super(props)

        
        this.state = {
            id:props.id,
            update:props.update,            
        }

        this.isPhoneValid = this.isPhoneValid.bind(this);
        this.onChange = this.onChange.bind(this);

        

       
    }

    onChange(e){
        this.state.update(e.target.value,this.state.id);
    }

    isPhoneValid(e){
         
        if (!isNaN(e.target.value))       
            e.target.style.borderColor = "green";
        else
            e.target.style.borderColor = "red";

        
    }

    render() {
        return (
            <div style = {{display:"none"}} id = {this.state.id}>
                <Form.Group  as={Row} >
                    <Form.Label column sm="2">
                    Phone <font color="red">*</font>
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onBlur={this.isPhoneValid} onChange = {this.onChange} type="text" placeholder="Phone" />
                    </Col>
                </Form.Group>
            </div>
        )
    }
}

export default Phone
