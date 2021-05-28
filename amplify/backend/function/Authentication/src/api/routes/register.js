const express = require('express');
const myRouter = express.Router();
const moongoose = require("mongoose");
const encryption = require("bcryptjs");


const User = require('../models/users');

//Posting to this route
myRouter.post('/register', (req, res) => {

    //Check is made to determine if email already exists in database
    //A promise is returned 
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                //User already exists - 409 conflict error returned
                return res.status(409).json({
                    message: 'Conflicting emails'
                });
            } else {
                // Email is unique
                // We must encrypt the user's password for security
                encryption.hash(req.body.password, 10, (err, hash) => {

                    // Password was not hashed successfully
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        // Password was hashed so the user can be created.
                        const user = new User({
                            _id: new moongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                            //hash and salt the user's password
                            password: hash
                        });

                        //Everything checks out, save user within our database
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    message: 'User created successfully.'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    err: err,
                                    message: 'User was not saved.'
                                });
                            });
                    }
                });
            }
        });


});


module.exports = myRouter;
