var express = require('express');
var router = express.Router();
const query = require('../db/query.js');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
/* GET home page. */
router.get('/profile', function(req, res, next) {
    query.returnAll().then(data => {
        res.send(data);
    });

});

router.post('/auth/login', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        next(new Error('Need to submit a password and email'))
    } else
        query.checkEmail(req.body.email).then(data => {
            if (data.length === 0) {
                next(new Error('Email Incorrect'))
            } else
                console.log(data);
            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                if (!result) {
                    next(new Error('Incorrect Password'))
                } else if (result) {
                    data[0].password = req.body.password;
                    res.send(data[0]);
                }
            });
        });
});

router.post('/auth/signup', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        next(new Error('Need both an email and password to sign up!'))
    } else
        query.checkEmail(req.body.email).then(data => {
            if (data.length !== 0) {
                next(new Error('Email already in use!'))
            } else
                bcrypt.hash(req.body.password, 10).then(function(hash) {
                let user = {
                  email:req.body.email,
                  password: hash
                }
                query.storeUser(user).then(result=>{
                  res.send(result)
                })
                })
        })
});
module.exports = router;
