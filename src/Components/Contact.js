import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Edit from './Edit';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DisplayPhones from "./DisplayPhones"
 

export class Contact extends Component {
    constructor(props){        
        super(props);

        this.state = {            
            change:props.removeContacts,
            id:props.contact._id,
            name:props.contact.name,
            surname:props.contact.surname ,
            email:props.contact.email ,
            adress:props.contact.adress ,
            phones:props.contact.phones 
        };

       this.showEdit = this.showEdit.bind(this);         
       this.refresh = this.refresh.bind(this);
       

    }

    refresh(data){
        this.setState({
            ...this.state,
            name:data.name,
            surname:data.surname ,
            email:data.email ,
            adress:data.adress ,
            phones:data.phones 
        })
    }

    deleteMe(id){
        confirmAlert({
            title: 'Delete Contact',
            message: 'Are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.delete('http://localhost:5000/contacts/' + id)
                    .then(this.state.change(id))
                } 
              },
              {
                label: 'No',                
              }
            ]
        });
        
   
    }
    
    showEdit(){        
        document.getElementById(this.state.id).style.display = "block";
    }

    render() {
        //console.log(this.state.name)

        var i = 0;
        const displayP = this.state.phones.map( data =>{
            i++;
            return (<DisplayPhones id = {i} key = {data} value = {data}/>)
        })

        return (
            <div style = {{paddingBottom: "1%"}}>
                
                <Edit refresh = {this.refresh} info = {this.state} />
                <Card style={{ width: '30%',marginLeft:'35%' }}>                
                <Card.Body>
                <Card.Title>
                    <h1 style = {{textAlign:"center"}}>{`${this.state.surname? this.state.surname : "Fetching"} ${this.state.name?this.state.name.charAt(0) + "." : "Fething..."}`}</h1>
                </Card.Title>

                
                    <Table striped bordered hover>
                        <tbody>                       
                            <tr>
                                <td>Name: </td><td>{this.state.name}</td>
                            </tr>
                            <tr>                    
                                <td>Surname: </td><td>{this.state.surname}</td>
                            </tr>
                            <tr>
                                <td>e-mail: </td><td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Adress: </td><td>{this.state.adress}</td>
                            </tr>
                            {displayP}   
                        </tbody>                
                    
                    </Table>
                    <div style = {{float : "right"}}>
                        <Button onClick = {this.showEdit} >Edit</Button>
                        <Button onClick = { () => {this.deleteMe(this.state.id)}} variant="danger">Delete</Button>
                    </div>
                </Card.Body>
                </Card>

            </div>

            
        )
    }
}

export default Contact
