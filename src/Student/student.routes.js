'use strict'

const express = require('express')
const api = express.Router()

const studentController = require('./student.controller')

api.post('/addStudent', studentController.createStudent);
api.get('/get',studentController.getAllStudents)

module.exports = api