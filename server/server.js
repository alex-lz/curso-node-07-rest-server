require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const colors = require('colors')
const mongoose = require('mongoose');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario') )

// mongoose.set('useCreateIndex', true)
let options = { 
  useCreateIndex: true, 
  useUnifiedTopology: true, 
  useNewUrlParser: true,
  useFindAndModify: false 
}

mongoose.connect('mongodb://localhost:27017/cafe', options, (err, res) => {
    if (err) throw err;

    console.log("Base de datos ".yellow, "mongoDB".green, "OnLine".cyan)
 });
 
app.get('/', function (req, res) {
  res.json('Hello World')
})
 
app.listen(process.env.PORT, () => { console.log('Escuchando puerto '.yellow, process.env.PORT.cyan)})