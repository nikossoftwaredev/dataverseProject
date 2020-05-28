import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import '../index.css';
import axios from "axios"


export class Edit extends Component {
    constructor(props){
        super(props);

        console.log("Edit props " + props.info.id);
        this.state = {    
            id:props.info.id,
            name:props.info.name,       
            surname:props.info.surname,
            email:props.info.email,
            adress:props.info.adress,
            phones:props.info.phones
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangePhones = this.onChangePhones.bind(this);
        this.editMe = this.editMe.bind(this);
        this.hideSelf = this.hideSelf.bind(this);

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

    editMe(e){
        console.log("Edit" + this.state.id);
        axios.post('http://localhost:5000/contacts/update/' + this.state.id,{            
            name:this.state.name,
            surname:this.state.surname,
            email:this.state.email,
            adress:this.state.adress,
            phones:this.state.phones
        })
        .then(res => console.log(res.data));

        e.preventDefault();
        this.hideSelf();
   
    }

   

    hideSelf(){
        document.getElementById(this.state.id).style.display = "none";
    }
    render() {
        return (
            <div id = {this.state.id} className = "add-container"> 

                <Form onSubmit = {this.editMe}>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeName} type="text" value= {this.state.name} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                    Surname
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeSurname} type="text" value={this.state.surname} />
                    </Col>
                </Form.Group>

                <Form.Group   as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeEmail} type="mail" value={this.state.email}/>
                    </Col>
                </Form.Group>

                <Form.Group  as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Address
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangeAdress} type="text" value={this.state.adress}/>
                    </Col>
                </Form.Group>

                <Form.Group  as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Phone
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control onChange = {this.onChangePhones} type="text" value={this.state.phones}/>
                    </Col>
                </Form.Group>


                    <Button  variant="success" type="submit">
                        Save 
                    </Button>
                                 
                    <Button onClick = {this.hideSelf}>Hide</Button> 

                </Form>       
                        
            </div>
        )
    }
}

export default Edit
