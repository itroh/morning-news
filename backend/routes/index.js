var express = require('express');
var router = express.Router();
//var bdd = require("./BDD");
var userModel = require('../models/user');
var request = require('async-request');
var uid2 = require('uid2');
var SHA256 = require('crypto-js/sha256');
var encBase64 = require('crypto-js/enc-base64');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

// route connexion
router.get('/signin', async function(req, res, next) {
	var toto = userModel
		.findOne({
			email: req.query.email
		})
		.exec(function(err, user) {
			if (err) {
				res.json({ result: "err // user n'existe pas", isUserExist: false, mail: req.query.email });
			}
			if (user) {
				var hash = SHA256(req.query.password + user.salt).toString(encBase64);
				hash === user.password
					? res.json({ result: 'logué!', isUserExist: true, mail: req.query.email })
					: res.json({ result: 'mauvais mdp', isUserExist: false, mail: req.query.email });
			} else {
				res.json({ result: "user n'existe pas", isUserExist: false, mail: req.query.email });
			}
		});
});

// route inscription
router.post('/signup', async function(req, res, next) {
	var salt = uid2(32);
	var newUser = new userModel({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: SHA256(req.body.password + salt).toString(encBase64),
		salt: salt,
		token: uid2(32)
	});
	await newUser.save();
	console.log('je suis dans la route POST signup');
	res.json({ result: 'compte créé!', isUserExist: true, mail: newUser.email });
});

module.exports = router;
