'use strict'


const express = require('express')
const api = express.Router()
const UserController = require('../user/user.controller')
const {ensureAuth, isAdmin } = require('../services/authenticated')

api.post('/login',UserController.loginUser)

module.exports = api
