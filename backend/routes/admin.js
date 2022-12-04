const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const admin = new Admin({
        email: req.body.email,
        password: hash
      });
      admin.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        })
    });
});

router.post('/login', (req, res, next) => {
  //finding if the email address exist
  let fetchedAdmin;
  Admin.findOne({ email: req.body.email })
    .then(admin => {
      if (!admin) {
        return response.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedAdmin = admin;
      //returning admin password
      return bcrypt.compare(req.body.password, admin.password);
    })
    .then(result => {
      //if password is correct
      if (!result) {
        return res.status(401).json({
          message: "Authentication Failed! Not a valid password"
        });
      }
      //creating web token
      const token = jwt.sign({email: fetchedAdmin.email, id: fetchedAdmin._id}, 'secret_password', {expiresIn: '1h'});
      res.status(201).json({
        token,
        expiresIn: 3600
      })
    })
    //if there is an error
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Authentication Failed"
      });
    });
});
module.exports = router;
