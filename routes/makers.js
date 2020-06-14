const express = require('express');
const router  = express.Router();

const {Make, validate} = require('../models/make')


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


//get by id


//update or put

//delete


module.exports= router;