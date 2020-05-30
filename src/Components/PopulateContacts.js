import Contact from "./Contact";
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Add from './Add';
import axios from "axios";

export class PopulateContacts extends Component {

    constructor(props) {
        super(props);
        
        this.state = {          
            contacts: null,
           
        };

        //binding the function to have acess to this.
        this.getData = this.getData.bind(this);
        this.removeContacts = this.removeContacts.bind(this);
        

    }

    componentDidMount(){
        this.getData();
    }

    //Getting data from server api at /contacts/
    getData(){     
        //Using axios get Request with a promise 
        //Setting the state with new Data
        axios.get('http://localhost:5000/contacts/')
            .then(res => {
                if(res.data.length > 0)                                      
                    this.setState({contacts:res.data})                                  
                               
            })        
    }

    
    //Removing contacts from the state based on ID
    removeContacts = (id) =>{          
        this.setState({
            contacts:this.state.contacts.filter(contact => {                                 
                    return contact._id !== id;
            })
        })
        
    }

    
    //Pop up Window as a form when pressing Add contact
    showAdd(){
        document.getElementById("add-form").style.display = "block";        
    }
    
    render() {               
        var myContacts;
        //Using map function on data to dynamically make Contact Components
        if(this.state.contacts != null)
            myContacts = this.state.contacts.map( data => <Contact removeContacts = {this.removeContacts} key = {data._id} contact = {data}/>)
            
        return (
            <div >                 
                <Button className = "add" onClick = {this.showAdd} variant="success" >ADD CONTACT</Button>           
                {myContacts}
                <Add refresh = {this.getData}/>              
            </div>
        )
    }
}

export default PopulateContacts
