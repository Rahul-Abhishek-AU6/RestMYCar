const Owner = require('../models/owner');
const Customer = require('../models/customer');
const Admin= require('../models/admin')

const jwt = require('jsonwebtoken');

module.exports= {
    async authenticateOwnersToken(req, res, next){
        try{
            const token = req.header('Authorization')
            console.log(token)
            if(!token) return res.sendStatus(401)
            const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        }
        catch{

        }
    }




}