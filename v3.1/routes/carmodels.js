const express = require('express');
const router = express.Router();

const {Carmodel, validate} = require('../models/carmodel');
const {Make, validateMake} = require('../models/make');
const {Vehicle, validateCarModel} = require('../models/vehicleType')

const cloudinary = require("../utils/cloudinary")
//const convertBufferToString = require("../utils/convertBufferToString")


//post
router.post('/add-vehicle', async(req, res)=>{
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
        Description:req.body.Description,
        color: req.body.color,
        mileage: req.body.mileage,
       isOwned: req.body.isOwned,
        photos: req.body.photos
    });
    carmodel = await carmodel.save()
    res.send(carmodel);
    console.log(carmodel)
})

//get 
router.get('/all', async(req, res)=>{
    const vehicles = await Carmodel.find().sort('name');
    res.send(vehicles);
    console.log(vehicles);
})

//get by id
router.get('/vehicle/:id', async(req, res) => {
    const vehicle = await Carmodel.findById(req.params.id);

    if(!vehicle) return res.status(404).send('---The vehicle is not found.. Try with another vehicle---');
    res.send(vehicle);
    console.log(vehicle)
})

//delete
router.delete('/vehicle/:id', async(req, res) => {
    const vehicle = await Carmodel.findByIdAndDelete(req.params.id);

    if(!vehicle) return res.status(404).send('---The vehicle is not found.. Try with another vehicle---');
    res.send(vehicle);
    console.log(vehicle , "---Deleted succesfully----")
})


// //put
// router.patch('/vehicle/:id/uplaodimages',upload.single("image"), async(req, res)=>{
//     try{
//         let imageContent = convertBufferToString(req.file.originalname, req.file.buffer)
//             let imageResponse = await cloudinary.uploader.upload(imageContent)
// //            await schema.findOneAndUpdate({ _id: carmodels._id }, { profilePicture: imageResponse.secure_url })
//             await schema.findOneAndUpdate({req.params.id }, { photos: imageResponse.secure_url })
                
//             res.status(202).send({message:"uploaded Profile picture successfully"})
//         } catch (error) {
//             return res.status(500).send({error:error.message})
//         }
//     },
// })



module.exports= router;