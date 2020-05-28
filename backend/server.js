const express = require('express'); //Light, fast framework for creating servers 
const cors = require('cors'); //will help for cross-origin policies as a Middleware between server and external source
const mongoose = require('mongoose'); //helps us connect to MongoDB

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //cors MiddleWare
app.use(express.json()); 

//Establishing connection to Mongo DB
const uri = process.env.ATLAS_URI;
//console.log(""+uri)

mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex :true }); // flags for Deprecation Warnings

const connection = mongoose.connection;

connection.once('open',()=> {
    console.log("MongoDB database connection established successfully");
})

const contactsRouter = require('./routes/contacts');

app.use('/contacts',contactsRouter);

app.listen(port , () => {
    console.log(`Server is running on port: ${port}`);
})