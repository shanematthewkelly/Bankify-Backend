const express = require('express');
const myRouter = express.Router();

const User = require('../models/users');

myRouter.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(userRetrieved => {
            if (!userRetrieved) {
                return res.status(404).json({
                    message: "User was not retrieved"
                }).end();
            } else {
                return res.status(200).json({
                    userRetrieved
                });
            }
        });
});

module.exports = myRouter;