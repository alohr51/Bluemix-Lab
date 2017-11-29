var express = require('express');
var app = express();
var cfenv = require("cfenv");
var http = require('http').Server(app);
// bodyParser is middleware that creates a new body object containing key-value pairs,
// where the value can be a string or array (when extended is false), or any type (when extended is true)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

// use the cfenv package to grab our application environment obj
var appEnv = cfenv.getAppEnv();

// get the bounded Bluemix service credentials
// var watsonService = appEnv.getService("MyPersonalityInsights");
// var username = watsonService.credentials.username;
// var password = watsonService.credentials.password;

// var personality_insights = new PersonalityInsightsV3({
// 	username: username,
// 	password: password,
// 	version_date: '2016-10-19'
// });

// Configure views
var path = require('path');
app.use(express.static(path.join(__dirname, 'views')));

// Handle HTTP GET request to the "/" URL
app.get('/', function(req, res) {
	res.render('index');
});

// Handle HTTP POST request to the "/watson" endpoint
// app.post('/watson', function(req, res) {
// 	var bioText = req.body.bioText;

// 	// do some server side input checking
// 	if(getWordCount(bioText) < 100){
// 		return res.status(400).json({msg: "Your bio must be at least 100 words"});
// 	}

// 	// get the personality data from Watson using the bio text
// 	getPersonality(bioText, function(err, personalityJSON){
// 		if(err)
// 			console.log('error getting watson personality', err);
// 		else
// 			res.json(personalityJSON);
// 	})
// });

// Simple function to get the word count of a string.
function getWordCount(text){
	var regex = /\s+/gi;
	var replaced = text.trim().replace(regex, ' ');
	// if repalaced is "" then split ' ' will return length of 1 which is incorrect
	if(replaced.length === 0){
		return 0;
	}
	else{
		return replaced.split(' ').length;
	}
}

// Use the watson package to made the call to watson. The response will be the personality JSON that Watson computes.
// function getPersonality(text, callback){
// 	personality_insights.profile({
// 		text: text,
// 		consumption_preferences: true
// 	},
// 	function (err, response) {
// 		if (err)
// 			return callback(err, null);
// 		else
// 			return callback(null, response);
// 	});
// }

http.listen(appEnv.port, appEnv.bind);
console.log('App started on ' + appEnv.bind + ':' + appEnv.port);