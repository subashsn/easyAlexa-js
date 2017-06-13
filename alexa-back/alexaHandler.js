var fun =require('./core/functions')

module.exports = function (req,res) {
	res.resJson = {
		sessionJson : req.body.sessionJson,
		prompt: "",
		reprompt: false,
		awaitResponse: false
	}
	console.log(req.body)
	if (!res.resJson.sessionJson){
		res.resJson.sessionJson = {
			step:"init"
		}
	}
	fun[res.resJson.sessionJson.step](req,res)
}
