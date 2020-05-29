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

        this.refresh = this.refresh.bind(this);
        this.changeContacts = this.changeContacts.bind(this);
        

    }

    componentDidMount(){
        this.refresh();
    }

    

    changeContacts = (id) =>{     
        
        this.setState({
            contacts:this.state.contacts.filter(contact => {                                 
                    return contact._id !== id;
            })
        })
        
    }

    refresh(){

        console.log("called Refresh")
        axios.get('http://localhost:5000/contacts/')
            .then(res => {
                if(res.data.length > 0){                
                    console.log(res.data)     
                    this.setState({contacts:res.data})                                  
                }                
            })
        
    }

   


    

    showAdd(){
        document.getElementById("add-form").style.display = "block";        
    }
    
    render() {
        //this.state.fetching ? console.log("fetching") : console.log(this.state.contacts);         
        //console.log(this.state.contacts);
       
        var myContacts;
        if(this.state.contacts != null)
            myContacts = this.state.contacts.map( data => 
            <Contact refresh = {this.refresh} changeContacts = {this.changeContacts} key = {data._id} contact = {data}/>)
        return (
            <div style = {{backgroundColor :"#808080"}}>                 
                <Button className = "add" onClick = {this.showAdd} variant="success" >ADD CONTACT</Button>           
                {myContacts}
                <Add refresh = {this.refresh}/>                 
         
            </div>
        )
    }
}

export default PopulateContacts
