const mongoose = require('mongoose');
const Joi = require('joi');

const vehicleSchema = new mongoose.Schema({
    vehicle:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255,
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

//    --------------Validation----------------

function validateVehicle(vehicle){
    const schema = {
        vehicle:Joi.string().min(2).max(255).required()
    }  
    return Joi.validate(vehicle, schema)
}
exports.vehicleSchema = vehicleSchema;
exports.Vehicle = Vehicle
exports.validate = validateVehicle;

