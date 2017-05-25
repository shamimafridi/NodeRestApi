var express = require('express');
var router = express.Router();
var data = require('../data/data')
var User = require('../models/user');
var jwt = require('jsonwebtoken');

var authenticate = {
    checkToken: (req, res, next) => {
        
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            console.log(req.path);
            // decode token
            if (token) {

                // verifies secret and checks exp
                jwt.verify(token, req.app.get('clientSecret'), function (err, decoded) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
                

            }
        
    }
}

module.exports = authenticate;