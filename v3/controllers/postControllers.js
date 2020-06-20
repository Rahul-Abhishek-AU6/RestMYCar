const Carmodel = require('../models/carmodel')
const Owner = require('../models/owner')
const Customer = require('../models/customer');
const Admin = require('../models/admin')

const jwt = require('jsonwebtoken');
const {hash, compare} = require('bcrypt');
const Joi = require('@hapi/joi');
const { sendMailToUser, forgotPasswordMailing } = require('../utils/nodemailer');


//function to increase vehicle on rent post

function vehicleOnRent(totalPosted){
    return totalPosted += 1
}

//module to exports

module.exports = {
    //_________________Posting vehicle on rent by owner_________________

    // async postingVehicle(req, res) =>{

    // },


// _______________User Registration______________________________________
    async userRegister(req, res){
        try{
            //Validating schema from body
            const {name, email, password, contact,adhaarNumber,  drivingLicense, age} = req.body
            const SchemaValidation= Joi.object({
                name:Joi.string().min(2).max(50).required(),
                email:Joi.string().min(2).max(50).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password:Joi.string().min(2).max(50).required(),
                contact:Joi.number().min(0000000000).max(9999999999).required(),
                adhaarNumber:Joi.number().min(000000000000).max(999999999999).required(),
                drivingLicense:Joi.string().min(2).max(50).required(),
                age:Joi.number().min(18).max(50).required()
            })
                    //Result part
            const {error, result} = SchemaValidation.validate({name:name, email:email, 
                        password:password, contact: contact, adhaarNumber: adhaarNumber,
                        drivingLicense: drivingLicense, age:age});
            if (error) return res.status(422).send({Error:error.message}) //in case of error in schema

            //Searching user type
            if(req.body.role =="Owner") {var schema= Owner; var userType = "Owner"}
            if(req.body.role =="Customer") {var schema= Customer; var userType = "Customer"}
        
            //-------------Checking email--------------
            const emailCheck = await schema.findone({ email:req.body.email })
            console.log(emailCheck)
            if(emailCheck) return res.send( { error: "Duplicate Email"});
        
                //-------------Checking adhaar--------------
            const adhaarNumberCheck = await schema.findone({ adhaarNumber:req.body.adhaarNumber })
            console.log(adhaarNumberCheck)
            if(adhaarNumberCheck) return res.send( { error: "Duplicate Aadhaar Number"});
        

            //---------------------Authentication-------------------------------------
                const activationToken = await jwt.sign({id:Math.random() }, process.env.TEMP_TOKEN_SECRET, {expiresIn : 1000 * 1000 * 6 })
                const user = await scchema({ ...req.body });

            //---------------------Hashing password--------------------------------------
                const hasjedPassword = await hash(req.body.password, 10);
                user.password = hashedPassword;
                user.activationToken = activationToken;
                user.save()
                sendMailToUser(`${userType}`, req.body.mail, activateToken );
                res.status(202).send({message: `${userType} account registered successfully. Please visit your Email and activate the account by verig=fying the link sent to your EMail `})

        } catch{
                if(err.name === "SequelizeValidationError")
                return res.status(400).send(`error: ${err.message}`);
        }
    }    



}
