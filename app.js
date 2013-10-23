
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/cafefood');

var Applicant = mongoose.model('Applicant',{
	name : String,
	bio: String,
	skills: String,
	years: Number,
	why: String,
});  	

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find(function (err, applicants){
		if(err){console.log('ERROR')}
		else{
			console.log('apps', applicants);
			res.render('applicants', {applicants : applicants});
		}
	});
});

// creates and applicant
app.post('/applicant', function(req, res){
	var submitInfo = req.body
	console.log(submitInfo);
	console.log('hi from app.post');
	var applicant = new Applicant(submitInfo);
	applicant.save();
	res.send({success : 'Success!'});	
});

//deletes applicant
app.post('/appdelete', function (req, res){
	var deleted = req.body;
	console.log("deleted", deleted);
	Applicant.findByIdAndRemove(deleted._id, function(err, id){
		console.log(err, id);
		if(err){res.send('ERROR!')}
		else{
			res.send({success : 'deleted'});
		}
	});
});

//application renderer
app.get('/:_id', function (req, res){
	console.log(req.params._id);
	var urlId = req.params._id;
	Applicant.findById(urlId, function (err, applicant){
		if(err){res.send('ERROR!')}
		else{
			console.log(applicant);
			res.render('applicationview', applicant)
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
