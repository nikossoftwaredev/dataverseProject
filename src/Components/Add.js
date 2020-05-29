import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import '../index.css';
import axios from "axios"


export class Add extends Component {
    constructor(props){
        super(props);
        this.state = {   
            update: props.update,         
            name:"",
            surname: "",
            email: "",
            adress: "",
            phones: ""
        }


        //getting the function from parent component
        //this.updateContents = this.props.update;
        

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangePhones = this.onChangePhones.bind(this);
        this.hideSelf = this.hideSelf.bind(this);
        this.isMailValid = this.isMailValid.bind(this);
        this.isPhoneValid = this.isPhoneValid.bind(this);
    }

    onChangeName(e){        
        this.setState({name: e.target.value});
    }

    onChangeSurname(e){        
        this.setState({surname: e.target.value});
    }

    onChangeEmail(e){        
        this.setState({email: e.target.value});
    }

    onChangeAdress(e){        
        this.setState({adress: e.target.value});
    }

    onChangePhones(e){        
        this.setState({phones: e.target.value});
    }

   

    hideSelf(){
        document.getElementById("add-form").style.display = "none";
        this.state.update();
    }

    onSubmit(e){        

        const toAdd = {
            name:this.state.name,
            surname:this.state.surname,
            email:this.state.email,
            adress:this.state.adress,
            phones:this.state.phones
        }

        axios.post('http://localhost:5000/contacts/add',toAdd)
        .then(this.state.update());

        
        this.hideSelf();
        document.getElementById("myForm").reset()
        e.preventDefault();
        
    }

    isMailValid(e){

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))       
            e.target.style.borderColor = "green";
        else
            e.target.style.borderColor = "red";

        return (false)
    }

    isPhoneValid(e){
         
        if (!isNaN(this.state.phones))       
            e.target.style.borderColor = "green";
        else
            e.target.style.borderColor = "red";

        return (false)
    }

    render() {
        return (
            <div id = "add-form" className = "add-container"> 

                <Form id ="myForm" onSubmit = {this.onSubmit}>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Name <font color="red">*</font>
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeName} type="text" placeholder="Name" required  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Surname <font color="red">*</font>
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeSurname} type="text" placeholder="Surname" required />
                    </Col>
                </Form.Group>

                <Form.Group  as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    E-mail <font color="red">*</font>
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onBlur={this.isMailValid} onChange = {this.onChangeEmail} type="mail" placeholder="E-mail" required/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Address
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeAdress} type="text" placeholder="Address"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Phone <font color="red">*</font>
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onBlur={this.isPhoneValid} onChange = {this.onChangePhones} type="text" placeholder="Phone" required/>
                    </Col>
                </Form.Group>

                <Button variant="success" type="submit">
                    Add
                </Button>
                                 
                    <Button onClick = {this.hideSelf}>Hide</Button> 

                </Form>       
                        
            </div>
        )
    }
}

export default Add
