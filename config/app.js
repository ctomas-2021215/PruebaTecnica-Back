'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

//rutas entidades 
const StudentRoutes = require('../src/Student/student.routes');
const UserRoutes = require('../src/user/user.routes')

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/Student',StudentRoutes)
app.use('/User',UserRoutes)


exports.initServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Servidor corriendo en el puerto ${port}`)
    })
}