const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        trim: true, //trim the whitespace of the end
        
    },
    surname:{
        type: String,
        required:true,
        unique: true,
        trim: true //trim the whitespace of the end
       
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true //trim the whitespace of the end
        
    },
    adress:{
        type: String,
        required:false,
        unique: true,
        trim: true //trim the whitespace of the end
       
    },
    phones:{
        type:[Number],        
        
    },
},{
    timestamps :true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;