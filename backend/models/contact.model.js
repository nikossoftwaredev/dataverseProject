const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        trim: true, //trim the whitespace of the end
        minlength: 3
    },
    surname:{
        type: String,
        required:true,
        unique: true,
        trim: true, //trim the whitespace of the end
        minlength: 3
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim: true, //trim the whitespace of the end
        minlength: 3
    },
    adress:{
        type: String,
        required:false,
        unique: true,
        trim: true, //trim the whitespace of the end
        minlength: 3
    },
    phones:{
        type: Number,
        required:true,
        unique: true,
        trim: true, //trim the whitespace of the end
        minlength: 10
    },
},{
    timestamps :true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;