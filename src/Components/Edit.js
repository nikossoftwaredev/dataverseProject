import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import '../index.css';
import axios from "axios"
import DisplayPhonesInput from "./DisplayPhonesInput"


export class Edit extends Component {
    constructor(props){
        super(props);

        
        this.state = {    
            refresh:props.refresh,
            id:props.info.id,
            name:props.info.name,       
            surname:props.info.surname,
            email:props.info.email,
            adress:props.info.adress,
            phones:props.info.phones
        }

        //binding all the Functions to access this
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.updatePhones = this.updatePhones.bind(this);
        this.editMe = this.editMe.bind(this);
        this.hideSelf = this.hideSelf.bind(this);

    }

    onChangeName(e){ this.setState({name: e.target.value});}

    onChangeSurname(e){ this.setState({surname: e.target.value});}

    onChangeEmail(e){ this.setState({email: e.target.value});}

    onChangeAdress(e){ this.setState({adress: e.target.value});}

    updatePhones(value,id){   
                
        this.setState(
            () =>{
                let tmpPhones = this.state.phones;
                tmpPhones[id-1] = parseInt(value);               
            }
            
        )
    }

    //Function that calls axios post for updating a Contact
    editMe(e){
        
        const toEdit = {
            name:this.state.name,
            surname:this.state.surname,
            email:this.state.email,
            adress:this.state.adress,
            phones:this.state.phones
        }
      
            axios.post('http://localhost:5000/contacts/update/' + this.state.id,toEdit)
        .then(this.state.refresh(toEdit))
        .catch(err => console.log(err));

        
        this.hideSelf();        
        e.preventDefault(); //prevents page from reloading without this post request will be aborted
        
   
    }

   
    //Hidinng the Edit form
    hideSelf(){
        document.getElementById(this.state.id).style.display = "none";        
    }

    render() {

        var i = 0;
        const myP = this.state.phones.map( data =>{
            i++;
            return (<DisplayPhonesInput update = {this.updatePhones} id = {i} key = {data} value = {data}/>)
        })

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
                

                {myP}
                <Button variant="success" type="submit">Save</Button>                                 
                <Button onClick = {this.hideSelf}>Hide</Button> 

                </Form>       
                        
            </div>
        )
    }
}

export default Edit
