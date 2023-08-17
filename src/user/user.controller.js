'use strict'

const User = require('./user.model')
const { validateData , encrypt , checkPassword } = require('../utils/validate')
const { createToken } = require('../services/jwt')
const bcrypt = require('bcrypt')

    exports.defaultAdmin = async()=>{
        try {
            let data = {
                name: 'Carlos',
                surname: 'Tomas',
                username:'ADMIN',
                password: '123',
                phone: '1234-1314',
                email:'Deustaq@gmail.com',
                age: 24,
                role: 'ADMIN',
     
            }
            let params = {      
                password: data.password,
            }
    
            let validate = validateData(params)
            if(validate) return res.status(400).send(validate)
    
            
    
            let ExistUser = await User.findOne({username: 'ADMINA'})
            if(ExistUser) return console.log('Admin already Engaged')
            data.password = await encrypt(data.password)
            let defAdmin = new User(data)
            await defAdmin.save()
            return console.log(`Admin ${defAdmin} engaged`)
    
        } catch (err) {
            console.error(err)
            return err
        }
    }

    //LOGIN ADDMIN
    exports.loginUser = async(req,res)=>{
        try{
        
            let data = req.body;
            let credentials = { 
                username: data.username,
                password: data.password
            }
            let msg = validateData(credentials);
            if(msg) return res.status(400).send(msg)
    
            let user = await User.findOne({username: data.username});
            
            if(user && await checkPassword(data.password, user.password)) {
                let userLogged = {
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    role: user.role,
                    AccNo: user.AccNo,
                    phone: user.phone,
                    email: user.email
                }
                let token = await createToken(user)
                return res.send({message: 'User logged sucessfully', token, userLogged});
            }
            return res.status(401).send({message: 'Invalid credentials'});
        }catch(err){
            console.error(err);
            return res.status(500).send({message: 'Error, not logged'});
        }
    }