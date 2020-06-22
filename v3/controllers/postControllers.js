const Carmodel = require('../models/carmodel')
const {Owner} = require('../models/owner')
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
            console.log(1)
            //------------Validating schema from body--------------
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
            console.log(2)
            //--------------Result part-------------------------------
            const {error, result} = SchemaValidation.validate({name:name, email:email, 
                password:password, contact: contact, adhaarNumber: adhaarNumber,
                drivingLicense: drivingLicense, age:age});
                if (error) return res.status(422).send({Error:error.message}) //in case of error in schema
                
                console.log(3)
                //------------------------------Searching user type------------------------------
                if(req.body.role =="Owner") {var schema= Owner; var userType = "Owner"}
                if(req.body.role =="Customer") {var schema= Customer; var userType = "Customer"}
                
                console.log(4)
                console.log(req.body.email)
                //console.log(4.1,schema)
                //-------------Checking email--------------
                const emailCheck = await schema.findOne({ email:req.body.email })
                console.log(emailCheck)
                if(emailCheck) return res.send( { error: "Duplicate Email"});
                console.log(5)
                console.log(emailCheck)

                //-------------Checking adhaar--------------
                const adhaarNumberCheck = await schema.findOne({ adhaarNumber:req.body.adhaarNumber })
                console.log(adhaarNumberCheck)
                if(adhaarNumberCheck) return res.send( { error: "Duplicate Aadhaar Number"});
                
                console.log(6)
                console.log(6.1 , adhaarNumber , "Adhaar number is here")
                
                //---------------------Authentication-------------------------------------
                const activationToken = await jwt.sign({id:Math.random() }, process.env.SECRET, {expiresIn : 1000 * 1000 * 6 })
                const user = await schema({ ...req.body });
                console.log(user);
                console.log(6.1, activationToken);
                
                //---------------------Hashing password--------------------------------------
                const hashedPassword = await hash(req.body.password, 10);
                user.password = hashedPassword;
                user.activationToken = activationToken;
                console.log(8)
                user.save()
                console.log(9,'Saving user')
                sendMailToUser(`${userType}`, req.body.mail, activationToken );
                console.log(10, `$userType`, 'this is user type')
                res.status(202).send({message: `${userType} account registered successfully. Please visit your Email and activate the account by verifying the link sent to your EMail `})

        } catch(err){
                return res.status(400).send(`error: ${err.message}`);
        }
    }    



}
