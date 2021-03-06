const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path')


const makers = require('./routes/makers')
const carModel = require('./routes/carmodels')
const vehicleType = require('./routes/vehicleTypes')
const admin = require('./routes/admins')
const postRoutes = require('./routes/postRoutes');



// -----------DataBase connection----------
dotenv.config();
require('./db')

//-----------Midlleware--------------------

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api/model', carModel)
app.use('/api/maker', makers)
app.use('/api/vehicletype', vehicleType)
app.use('/api/admin', admin)

//-------------MVC routes-------------
app.use(require("./routes/postRoutes"));
//app.use('/routes/postRoutes', postRoutes);


// ----------Server setup -------------------
const port = process.env.PORT || 1212;
app.listen(port, ()=> console.log(`====My new server is : ${port}====`));
