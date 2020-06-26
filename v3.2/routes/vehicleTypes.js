const express = require('express');
const router = express.Router();

const {Vehicle, validate} = require('../models/vehicleType')
//post
router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let vehicle= new Vehicle({ vehicle : req.body.vehicle})
    vehicle = await vehicle.save()
    res.send(vehicle);
    console.log(vehicle)
})

//get


//get by id

//Put update

//delete

module.exports = router;