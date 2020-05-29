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
            myContacts:null
        };

        this.refresh = this.refresh.bind(this);
        this.changeContacts = this.changeContacts.bind(this);
        

    }

    componentDidMount(){
        this.refresh();
    }

    

    changeContacts = (id) =>{     
        
        this.setState({
            myContacts:this.state.myContacts.filter(contact => {  
                    console.log(contact.key)
                    //console.log("contact id" + contact.id)              
                    return contact.key !== id;
            })
        })
        
    }

    refresh = () =>{
        
        axios.get('http://localhost:5000/contacts/')
            .then(res => {
                if(res.data.length > 0){     
                    this.setState(
                        {
                            contacts:res.data,
                            myContacts:res.data.map( data => <Contact changeContacts = {this.changeContacts} key = {data._id} contact = {data}/>)
                            
                        }
                    )

                    
                }
            })
        
    }


    

    showAdd(){
        document.getElementById("add-form").style.display = "block";        
    }
    
    render() {
        //this.state.fetching ? console.log("fetching") : console.log(this.state.contacts);         
        //console.log(this.state.contacts);
        return (
            <div> 
                <h1 style = {{ textAlign:"center"}}>CONTACT LIST</h1>
                <Button onClick = {this.showAdd} variant="outline-success" style={{ width: '30%',marginLeft:'35%' }}>ADD CONTACT</Button>           
                {this.state.myContacts}
                <Add refresh = {this.refresh}/>                 
         
            </div>
        )
    }
}

export default PopulateContacts
