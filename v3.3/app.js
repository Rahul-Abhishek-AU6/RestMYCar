const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const compression= require('compression');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const helmet= require('helmet')
const {authenticateAdminToken} = require('./middlewares/authenticate');



 const makers = require('./routes/makers')
// const carModel = require('./routes/carmodels')
 const vehicleType = require('./routes/vehicleTypes')
// const admin = require('./routes/admins')



// -----------DataBase connection----------
dotenv.config();
require('./db')


//-----------Midlleware--------------------

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet());
app.use(compression());
const accessLogsStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})
app.use(morgan('combined',{stream: accessLogsStream }))

//app.use('/api/model', carModel)
app.use('/api/maker',authenticateAdminToken, makers)
app.use('/api/vehicletype',authenticateAdminToken, vehicleType)
//app.use('/api/admin', admin)

//-------------MVC routes-------------
app.get('/', (req, res)=> res.send({message:"Hola amigos!!!! this is API based web application"}))

app.use(require("./routes/postRoutes"));
app.use(require("./routes/getRoutes"));
app.use(require("./routes/deleteRoutes"))
app.use(require('./routes/updateRoutes'))


// ----------Server setup -------------------
const port = process.env.PORT || 1212;
app.listen(port, ()=> console.log(`====My new server is : ${port}====`));
