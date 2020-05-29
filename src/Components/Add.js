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

        this.state = {   
            phoneCounter:1,
            myPhones: [<Phone  key = "1" id ="1" change = {this.onChangePhones}/> ,<Phone key = "2" id ="2"/>,<Phone key = "3" id ="3"/> ,<Phone key = "4" id ="4"/>,<Phone key = "5" id ="5"/> ,<Phone key = "6" id ="6"/>],
            update: props.update,         
            name:"",
            surname: "",
            email: "",
            adress: "",
            phones: []
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
        this.addPhone = this.addPhone.bind(this);
        this.removePhone = this.removePhone.bind(this);
        this.showPhones = this.showPhones.bind(this);
       
        
    }

    componentDidMount(){
        this.showPhones();
    }

    showPhones(){     
             
        for(let i =1 ;i<=max_phones ; i++){
            if( this.state.phoneCounter >= i){
                document.getElementById(i).style.display = "block";
            }else{
                document.getElementById(i).style.display = "none";
            }
        }
    }

    addPhone(){
        this.setState(
            prevState => {
                let tmpCounter = this.state.phoneCounter;

                
                if(tmpCounter + 1 <= max_phones)
                    tmpCounter = tmpCounter + 1;    
                             
                
                return {
                    phoneCounter:tmpCounter,
                    myPhones: prevState.myPhones,
                    update: prevState.update,         
                    name:prevState.name,
                    surname: prevState.surname,
                    email: prevState.email,
                    adress: prevState.adress,
                    phones: prevState.phones
                }
            },this.showPhones
            
        )

        

        
        
        
        
    }

    removePhone(){
        this.setState(
            prevState => {
                let tmpCounter = this.state.phoneCounter;

                if(tmpCounter >= 2)
                    tmpCounter = prevState.phoneCounter - 1;            
                             

                return {
                    phoneCounter:tmpCounter,
                    myPhones: prevState.myPhones,
                    update: prevState.update,         
                    name:prevState.name,
                    surname: prevState.surname,
                    email: prevState.email,
                    adress: prevState.adress,
                    phones: prevState.phones
                }
            },this.showPhones
            
        )

        

        
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
        console.log(e.target.value) 
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

                {this.state.myPhones}
                

                <Button onClick = {this.addPhone} variant="success">
                    +
                </Button>
                <Button onClick = {this.removePhone} variant="danger">
                    -
                </Button>

                <div style = {{float : "right"}}>
                    <Button variant="success" type="submit">Add</Button>                                    
                    <Button onClick = {this.hideSelf}>Hide</Button> 
                </div>
                </Form>       
                        
            </div>
        )
    }
}

export default Add
