import React, { Component } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import '../index.css';
import axios from "axios"
import Phone from "./Phone"

const max_phones = 6;

export class Add extends Component {

    
    constructor(props){
        super(props);
        //getting the function from parent component           
        //Binding every function that needs to access state
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.updatePhones = this.updatePhones.bind(this);
        this.hideSelf = this.hideSelf.bind(this);
        this.isMailValid = this.isMailValid.bind(this);
        this.addPhone = this.addPhone.bind(this);
        this.removePhone = this.removePhone.bind(this);
        this.showPhones = this.showPhones.bind(this);

        //Populating Multiple Phones based on max_phones which is currently 6
        this.initPhones = [];
        for(let i =1 ; i<= max_phones ; i++){
            this.initPhones.push(<Phone  key = {i} id ={i} update = {this.updatePhones}/>);
        }

        this.state = {   
            refresh:props.refresh,
            phoneCounter:1,
            myPhones: this.initPhones,     
            name:"",
            surname: "",
            email: "",
            adress: "",
            phones: []
        }
       
        
    }

    componentDidMount(){
        this.showPhones();
        //Disabling the "-" Symbol at first because as a default it has 1 Phone
        document.getElementById("remove-phone").disabled = true;
    }

    //Showing phones depending on the phoneCounter
    showPhones(){                  
        for(let i =1 ;i<=max_phones ; i++){
            //phoneCounter is the number of extra Phones that the user wants to add
            if( this.state.phoneCounter >= i){
                document.getElementById(i).style.display = "block";                
            }else{
                document.getElementById(i).style.display = "none";
            }
        }
    }

    //Updating the state of all new Phones
    updatePhones(value,id){               
        this.setState(
            () =>{
                let tmpPhones = this.state.phones;
                tmpPhones[id-1] = parseInt(value);
                return {
                    ...this.state,
                    phones:tmpPhones,
                }
            }
            
        )
    }

    //Adding an extra Phone to the Form
    addPhone(){
        this.setState(
            () => {
                let tmpCounter = this.state.phoneCounter;
                
                if(tmpCounter + 1 <= max_phones){
                    tmpCounter = tmpCounter + 1;                    
                }

                if(tmpCounter == max_phones)
                    document.getElementById("add-phone").disabled = true; 
                else if(tmpCounter >1)
                    document.getElementById("remove-phone").disabled = false;                              
                
                return {              
                    //...this.state means that we take all the variables of the state object      
                    ...this.state,
                    phoneCounter:tmpCounter,        
                }
            },this.showPhones //Callback function after setState is Completed...
            
        )       
        
    }

    //Removing the extra Phones
    removePhone(){
        this.setState(
            () => {
                let tmpCounter = this.state.phoneCounter;

                if(tmpCounter >= 2){
                    tmpCounter = tmpCounter - 1;
                    document.getElementById("add-phone").disabled = false;   
                }                                                                 
                
                if(tmpCounter == 1)
                    document.getElementById("remove-phone").disabled = true; 
                
                return {
                    ...this.state,
                    phoneCounter:tmpCounter,
                }
            },this.showPhones //Callback function after setState is Completed...
            
        )

    }

    //Hiding Add Button and Clearing the Form
    hideSelf(){
        document.getElementById("myForm").reset()
        document.getElementById("add-form").style.display = "none";                
    }

    //Handling on Submit event e is a variable that knows what component called the onSubmit...
    onSubmit(e){        
   
        const toAdd = {
            name:this.state.name,
            surname:this.state.surname,
            email:this.state.email,
            adress:this.state.adress,
            phones:this.state.phones 
        }
       

        //Must check if phones are valid before posting
        for(let i =1 ; i<= max_phones ; i++){
            if(this.isPhoneValid(i,this.state.phones[i])){

            }else{

            }
        }
        //Using axios post as a promise
        if(this.isMailValid()){
            axios.post('http://localhost:5000/contacts/add',toAdd)
            .then(this.state.refresh);

            this.hideSelf();
            document.getElementById("mailError").style.display = "none";               
            
        
        }else{
            document.getElementById("mailError").style.display = "block";
            
        }

      
        
        e.preventDefault(); //Prevents page from reloading which is a defeault action of the SUbmit Button on a form
        
        
        
    }

    //Checking if email is valid copied from Stack Overflow
    //Setting the form to red when email is invalid
    isMailValid(e){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            if(e != undefined)
                e.target.style.borderColor = "green";
            return true;
        }else
            if(e != undefined)
                e.target.style.borderColor = "red";
            return false;        
    }

    isPhoneValid(id,value){
        if(!isNaN(value)){
            return true;
        }else{
            return false;
        }
    }

    onChangeName(e){ this.setState({name: e.target.value}); }

    onChangeSurname(e){ this.setState({surname: e.target.value});}

    onChangeEmail(e){ this.setState({email: e.target.value});}

    onChangeAdress(e){ this.setState({adress: e.target.value});}

    

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
                    <p id ="mailError" style = {{display:"none"}}><font color="red">Please enter a valid e-mail.</font></p>
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

                {this.state.myPhones}
                

                <Button id="add-phone" onClick = {this.addPhone} variant="success">+</Button>
                <Button id="remove-phone" onClick = {this.removePhone} variant="danger">-</Button>

                <div style = {{float:"right"}}>
                    <Button variant="success" type="submit">Add</Button>                                    
                    <Button onClick = {this.hideSelf}>Hide</Button> 
                </div>

                </Form>       
                        
            </div>
        )
    }
}

export default Add
