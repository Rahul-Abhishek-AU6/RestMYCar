const mongoose = require('mongoose');
const Joi = require('joi');


const imageUploadingSchema =  new mongoose.Schema({
  
    photo:{
        type:String,
        required:false
    },
    photos:{
        type:String,
        required:false
    }
});

const ImageUpload = mongoose.model('ImageUpload', imageUploadingSchema);

//Validation
function validateImageUploading(imageUpoad){
    const schema = {
        photos:Joi.string()
    }
    return Joi.validate(imageUpoad, schema)
}

exports.ImageUpload = ImageUpload;
exports.imageUploadSchema = imageUploadingSchema
exports.validate  = validateImageUploading
exports.validateImageUploading  = validateImageUploading