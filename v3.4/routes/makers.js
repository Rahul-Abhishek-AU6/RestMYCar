const express = require('express');
const router  = express.Router();

const {Make, validate} = require('../models/make')
const cloudinary = require("../utils/cloudinary")

//post
router.post('/', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let make = new Make({name:req.body.name});

    make = await make.save()
    res.send(make);
    console.log(make);
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