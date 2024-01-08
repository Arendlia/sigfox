require('express-group-routes');
require('dotenv').config();
const express = require('express')
const router = express.Router();
const app = express();

// Router imports
require('./router/router')(app);

module.exports = app;