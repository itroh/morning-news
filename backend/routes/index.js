var express = require('express');
var router = express.Router();
//var bdd = require("./BDD");
var userModel = require('../models/user');
var request = require('async-request');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

// route connexion
router.get('/signin', async function(req, res, next) {
	var toto = await userModel.findOne({
		email: req.query.email,
		password: req.query.password
	});
	toto == null
		? res.json({ result: 'non logué', isUserExist: false, mail: req.query.email })
		: res.json({ result: 'logué!', isUserExist: true, mail: req.query.email });
});

// route inscription
router.post('/signup', async function(req, res, next) {
	var newUser = new userModel({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password
	});
	await newUser.save();
	console.log('je suis dans la route POST signup');
	res.json({ result: 'compte créé!', isUserExist: true, mail: newUser.email });
});

module.exports = router;
