const mongoose = require('mongoose');
const Joi = require('joi');

const {makeSchema} = require('../models/make');
const {vehicleSchema} = require('../models/vehicleType');
//const {}

const Carmodel = mongoose.model('Carmodel', new mongoose.Schema({
  
    name:{
        type: String,
        required: true
    },
    make:{
        type:makeSchema,
        required: true
    },
    vehicle:{
        type:vehicleSchema,
        require: true
    },
    model:{
      type:Number,
      required: true,
      minlenght: 1920,
      maxlength: 2050
    },
    fuelType:{
        type: [String],
        required: true
    },
    Capacity:{
        type:Number,
        required: true
    },
    inStock:{
        type:Number,
        required:true,
        default:0
    },
    dailyRentalRate:{
        type: Number,
        required:true
    },
    Description:{
        type: String,
        required:false
    },
    color:{
        type:[String],
        required: false
    },
    mileage:{
        type:[String],
        required: false
    },
    isOwned:{
        type: [Boolean],
        required: true
    },
    photos:{
        type:[String],
        required:false
    }
}));
//const Carmodel = mongoose.model('Carmodel', carmodelSchema);

//Validation
function validateCarmodel(carmodel){
    const schema = {
        name:Joi.string().required(),
        makeId:Joi.string().required(),
        vehicleId:Joi.string().required(),
        model:Joi.number().min(1920).max(2050).required(),
        fuelType:Joi.array().required(),
        Capacity: Joi.number().min(1).max(52).required(),
        inStock:Joi.number().min(0).max(100).required(),
        dailyRentalRate:Joi.number().required(),
        Description :Joi.string(),
        color:Joi.array(),
        mileage:Joi.array(),
        isOwned:Joi.boolean().required(),
        photos:Joi.array()
    }
    return Joi.validate(carmodel, schema)
}

exports.Carmodel = Carmodel;
exports.validate  = validateCarmodel
exports.validateCarModel  = validateCarmodel