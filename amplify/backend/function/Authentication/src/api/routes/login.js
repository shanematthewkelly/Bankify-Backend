const express = require('express');
const myRouter = express.Router();
const encryption = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");


const User = require('../models/users');


myRouter.post('/login', (req, res) => {

    //We must retrieve a single user from the DB
    User.find({
        email: req.body.email,
    })
        .exec()
        .then(user => {
            //check made to determine if we retrieved no user
            if (user.length < 1) {
                //Unauthorized status returned
                return res.status(401).json({
                    message: 'Email does not exist, or password was incorrect'
                });
            }
            // User was found - password in request body must be now compared to exisitng user password in DB
            encryption.compare(req.body.password, user[0].password, (err, result) => {
                // Error in comparing passwords
                if (err) {
                    return res.status(401).json({
                        message: 'Authentication failed, error comparing passwords'
                    });
                }
                // Correct password
                if (result) {
                    // Assigning a token to the logged in user
                    // Token holds certain user credentials for identification
                    const token = jsonWebToken.sign({
                        email: user[0],
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        },

                    )


                    //Sending the token back in the response
                    return res.status(200).json({
                        message: 'Authentication was successful.',
                        id: user[0]._id,
                        token: token
                    });
                }
                //Incorrect password
                res.status(401).json({
                    message: 'Authentication failed, incorrect password.'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = myRouter;