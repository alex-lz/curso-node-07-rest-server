const mongoose = require('mongoose');
uniqueValidator  = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role válido'
};

let Scheme = mongoose.Schema;

let usuarioScheme = new Scheme({
    nombre: {
        type: String,
        required: [true, 'El usuario es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Quitar password del scheme usuario al imprimir el JSON 
// para que un tercero no lo pueda ver
usuarioScheme.methods.toJSON = function() {
    let userObject = this.toObject();
    delete userObject.password;

    return userObject;
}

usuarioScheme.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

module.exports = mongoose.model('Usuario', usuarioScheme)
