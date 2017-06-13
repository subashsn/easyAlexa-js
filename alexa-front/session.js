var jwt = require('jwt-simple')
var jwtSecret = require('./config').jwtSecret

module.exports.decodeSession = function(req,res){
	var session = req.getSession()
	var jwtToken = session.get('token')
	
	console.log(req.data.request.intent.name)
	if(jwtToken){
		try{
			req.sessionJson = jwt.decode(jwtToken,jwtSecret)			
		}
		catch(err){
			req.sessionJson = false
		}
	}else{
		req.sessionJson = false
	}
}

module.exports.updateSession = function(req,sessionJson){
	jwt.encode(sessionJson,jwtSecret)
	req.getSession().set('token', jwt.encode(sessionJson,jwtSecret))
}