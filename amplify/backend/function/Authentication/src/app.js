var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var dotenv = require('dotenv');

const express = require('express');
const logging = require('morgan');
const mongoose = require('mongoose')
const register = require('./api/routes/register');
const login = require('./api/routes/login');
const singleUser = require('./api/routes/singleUser');

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext())

dotenv.config();
var url = process.env.MONGO_URI;

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Parse the response body
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//logging request
app.use(logging('dev'));

// Requests handled at the following routes
app.use('/users', register, login);
app.use('/retrieve', singleUser)

// Home directory
app.use('/', (req, res) => {
  res.status(200).json({
    message: "Database connection established"
  });
});


// Request not handled
app.use((req, res, next) => {
  const error = new Error('Error encountered');
  error.status = 404;
  next(error);
})

// Errors within the application
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app
