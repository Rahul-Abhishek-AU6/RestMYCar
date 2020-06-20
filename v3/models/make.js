const mongoose = require ('mongoose');
const Joi = require('joi');

const makeSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true,
       minlenght: 2,
       maxlenght: 255 
    }
})
const Make = mongoose.model('Make', makeSchema);

//validation
function validateMake(make){
    const schema={
        name:Joi.string().min(2).max(255).required()
    }
    return Joi.validate(make, schema);
};


exports.makeSchema = makeSchema;
exports.Make = Make;
exports.validate= validateMake;
exports.validatemake= validateMake;