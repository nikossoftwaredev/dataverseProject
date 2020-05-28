import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import '../index.css';
import axios from "axios"


export class Add extends Component {
    constructor(props){
        super(props);
        this.state = {            
            name:"",
            surname: "",
            email: "",
            adress: "",
            phones: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangePhones = this.onChangePhones.bind(this);
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
        .then(console.log(toAdd));

        e.preventDefault();

        this.hideSelf();
    }

    render() {
        return (
            <div id = "add-form" className = "add-container"> 

                <Form onSubmit = {this.onSubmit}>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeName} type="text" placeholder="Name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Surname
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeSurname} type="text" placeholder="Surname" />
                    </Col>
                </Form.Group>

                <Form.Group  as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeEmail} type="mail" placeholder="E-mail"/>
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
                    Phone
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangePhones} type="text" placeholder="Phone"/>
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
