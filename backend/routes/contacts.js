const router = require('express').Router();
let Contact = require('../models/contact.model');


//Get end point
router.route('/').get((req,res) => {    
    Contact.find()
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Post request end point
router.route('/add').post((req,res) => {
    //getting the info from the request body    
    const name = req.body.name; 
    const surname = req.body.surname;
    const email = req.body.email;
    const adress = req.body.adress;
    const phones = req.body.phones;

    //Creating a nea Instance of a Contact using the info from the post request
    const newContact = new Contact({
        name,
        surname,
        email,
        adress,
        phones,
    });

    //Saving the Contact to the MongoDB using promises
    newContact.save()
        .then(() => res.json('Contact added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Creating an end point to get specific data from specific id
router.route('/:id').get((req,res) => {
    Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status.status(400).json('Error:' + err));

});

//End point for deleting by id
router.route('/:id').delete((req,res) => {
    Contact.findByIdAndDelete(req.params.id)
    .then( () => res.json('Contact deleted'))
    .catch(err => res.status.status(400).json('Error:' + err));

});

//End point for updating by id
router.route('/update/:id').post((req,res) => {

    Contact.findById(req.params.id)
    .then(contact => {
        contact.name = req.body.name; 
        contact.surname = req.body.surname;
        contact.email = req.body.email;
        contact.adress = req.body.adress;
        contact.phones = req.body.phones;

        contact.save()
            .then(contact => res.json("Updated sucessfully!"))
            .catch(err => res.status(400).json('Error' + err));
    })
    .catch(err => res.status.status(400).json('Error:' + err));    

});

module.exports = router;