var rp = require('request-promise')
var config = require('./config')
var updateSession = require('./session').updateSession

function handleIntent (req,res){
	var slotValues={}
	for (var i=0;i<config.slotKeys.length;i++){
		val =false
		try{
			val = req.slot(config.slotKeys[i])
		}
		catch(err){
			console.log('Error')
		}
		if(val){
			slotValues[config.slotKeys[i]]=val
		}
	}
	var reqJson = {
		intent: req.data.request.intent.name,
		sessionJson: req.sessionJson,
		slotValues: slotValues 
	}
	console.log(reqJson)

	var options = {
	    method: 'POST',
	    uri: config.backServerUrl,
	    body: reqJson,
	    json: true
	};

	return rp(options)
	    .then(function (parsedBody) {
	    	updateSession(req,parsedBody.sessionJson)
			res.say(parsedBody.prompt)
			if(parsedBody.awaitReply){
				if(parsedBody.reprompt){
					res.shouldEndSession(false, parsedBody.reprompt)
				}else{
					res.shouldEndSession(false)
				}
			}
			console.log(parsedBody)
	    })
	    .catch(function (err) {
	    	console.log(err)
			res.say("There was an internal error, please try again later")
	    });

}

module.exports = function(app){
	for (var i=0;i<=config.intents.length;i++){
		app.intent(config.intents[i], handleIntent)
	}
}

