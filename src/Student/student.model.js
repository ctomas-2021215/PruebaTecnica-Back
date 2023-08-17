'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    carnet: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fechaNa: {
        type: Date,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    generoPoe: {
        type: String,
        required: true
    },
    fechaIns: {
        type: Date,
        required: false
    },
    fechaConcurso: { 
        type: Date,
        required: false
      }
});

module.exports = mongoose.model('Student', studentSchema);
