const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


const makers = require('./routes/makers')
const carModel = require('./routes/carmodels')
const vehicleType = require('./routes/vehicleTypes')
const admin = require('./routes/admins')


const {uploadimages, uploadimage} = require('./routes/imageUploadings')

// -----------DataBase connection----------
dotenv.config();
require('./db')

//-----------Midlleware--------------------

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/model', carModel)
app.use('/api/maker', makers)
app.use('/api/vehicletype', vehicleType)
app.use('/api/admin', admin)


app.use('/api', uploadimage)
app.use('/api', uploadimages)


// ----------Server setup -------------------
const port = process.env.PORT|| 1212;
app.listen(port, ()=> console.log(`====My new server is : ${port}====`));
