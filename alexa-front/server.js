var express = require("express")
var alexa = require("alexa-app")
var express_app = express()
var config = require("./config")
var app = new alexa.app("test")

app.pre = require('./session').decodeSession

require('./main')(app)

app.express({ expressApp: express_app })
express_app.listen(config.port,config.host)