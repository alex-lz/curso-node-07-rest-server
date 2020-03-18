const mongoose = require('mongoose');


let Scheme = mongoose.Schema;

let usuarioScheme = new Scheme({
    nombre: {
        type: String,
        required: [true, 'El usuario es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        default: 'USER_ROL'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Usuario', usuarioScheme)
