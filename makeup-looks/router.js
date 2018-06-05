'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const {MakeupLook} = require('./models');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const jwtAuth = passport.authenticate('jwt', {session: false});

// add jwt
router.post('/create', jwtAuth, (req, res) => {
    let object = {
        image: req.body.image,
        title: req.body.title,
        username: req.user.username,
        steps: req.body.steps,
        products: req.body.products,
        skintype: req.body.skintype,
        colortheme: req.body.colortheme
    };
    return MakeupLook  
        .create(object)
        .then(newLook => {
            res.json({newLook});
        })
        .catch(error => {
            res.send(sendError);
        })

})


module.exports = {router};
