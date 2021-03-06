const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const app = express()


app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec( (err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.countDocuments({ estado: true }, (err, conteo) => {

            res.json({
                ok: true,
                usuarios: usuarios,
                cuantos: conteo
            });

        })

    })

 })

app.post('/usuario', function (req, res) {
    let body = req.body
    
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10) ,
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    } );

    /*if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: "El nombre es necesario"
        })
    } else {
        res.json({ body })
    }*/
})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);// Los campos que pueden actualizar

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
    //res.json('Tu ID: ' + id)
})

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // if (usuarioBorrado === null) {
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
    // res.json('delete Usuario')
})

module.exports = app;