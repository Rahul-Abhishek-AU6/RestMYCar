const express = require('express');
const router  = express.Router();

const {Admin, validate} = require('../models/admin')
const cloudinary = require("../utils/cloudinary")

//post
router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let admin = new Admin({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        jwt:req.body.jwt,
        profilePicture:req.body.profilePicture,
        isVerified:req.body.isVerified,
        isBlocked:req.body.isBlocked        
    });

    admin = await admin.save()
    res.send(admin);
    console.log(admin);
})

//get 
router.get('/all', async(req, res)=>{
    const makers = await Make.find().sort('name');
    res.send(makers);
    console.log(makers);
})

//get by id
router.get('/:id', async(req, res) => {
    const maker = await Make.findById(req.params.id);

    if(!maker) return res.status(404).send('---The maker is not found.. Try with another maker---');
    res.send(maker);
    console.log(maker)
})

//delete
router.delete('/:id', async(req, res) => {
    const maker = await Make.findByIdAndDelete(req.params.id);

    if(!maker) return res.status(404).send('---The maker is not found.. Try with another maker---');
    res.send(maker);
    console.log(maker , "---Deleted succesfully----")
})


//update or put

//delete


module.exports= router;