var db = require('../models') // For DB calls

var switchStage = function (req,res,stage){
	return module.exports[stage](req,res)
}

var addToPrompt = function(res,prompt){
	res.resJson.prompt = res.resJson.prompt.concat(prompt)
}

var clearPrompt = function(res){
	res.resJson.prompt =""
}

var setAwaitReply = function(res,await,reprompt){
	res.resJson.awaitReply = await
	if(reprompt){
		res.resJson.reprompt = reprompt
	}
}

module.exports = {

	init: function (req,res){

		function getDetails(){
		   	addToPrompt(res, "Something")
		   	res.status(200).json(res.resJson)				
		}

		function doDefault () {
		   	addToPrompt(res, "Default")
		   	res.status(200).json(res.resJson)		
		}

		switch (req.body.intent){
			case "SomeIntent":
				return doSomething()
				break;
			default:
				return doDefault()
		}
	}
}