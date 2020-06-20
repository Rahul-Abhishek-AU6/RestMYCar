const express = require('express');
const router = express.Router();

const {Carmodel, validate} = require('../models/carmodel');
const {Make, validateMake} = require('../models/make');
const {Vehicle, validateCarModel} = require('../models/vehicleType')


//post
router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

const make = await Make.findById(req.body.makeId)
if(!make) res.status(404).send('----Maker is not found-----');

const vehicle = await Vehicle.findById(req.body.vehicleId);
if(!vehicle) res.status(404).send('---Vehicle type is not found---')

    let carmodel = new Carmodel({
        name: req.body.name,
        make:{
            _id:make._id,
            name:make.name
        },
        vehicle:{
            _id: vehicle._id,
            vehicle:vehicle.vehicle
        },
        model:req.body.model,
        fuelType: req.body.fuelType,
        Capacity: req.body.Capacity,
        inStock: req.body.inStock,
        dailyRentalRate: req.body.dailyRentalRate,
        Description:req.body.Description
    });
    carmodel = await carmodel.save()
    res.send(carmodel);
    console.log(carmodel)
})

//get 


//get by id


//put


//delete

module.exports= router;