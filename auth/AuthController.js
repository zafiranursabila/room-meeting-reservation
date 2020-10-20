// AuthController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
userRouter.use(bodyParser.urlencoded({ extended: false }));
userRouter.use(bodyParser.json());
var User = require('../models/user');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');



userRouter.post('/add', function(req, res) {
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    nama : req.body.nama,
    username : req.body.username,
    id_karyawan : req.body.id_karyawan,
    divisi : req.body.divisi,
    password : hashedPassword
  },
  function (err, user) {
    console.log(err)
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

export default userRouter;