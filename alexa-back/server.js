var express = require("express")
var bodyParser = require('body-parser')
var alexaHandler = require('./alexaHandler')
var config = require('./config/server')

//Setup Express
app = express()
app.use(bodyParser.json())

app.post('/alexa',alexaHandler)

//Listen
app.listen(config.port,config.host)