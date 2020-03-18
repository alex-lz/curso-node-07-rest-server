const express = require('express')
const Usuario = require('../models/usuario')
const app = express()


app.get('/usuario', function (req, res) {
    res.json('get Usuario')
 })

app.post('/usuario', function (req, res) {
    let body = req.body

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: "El nombre es necesario"
        })
    } else {
        res.json({ body })
    }
})

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    res.json('Tu ID: ' + id)
})

app.delete('/usuario', function (req, res) {
    res.json('delete Usuario')
})

module.exports = app;