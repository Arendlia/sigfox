require('express-group-routes');
require('dotenv').config({ path: `.env.local`, override: true });
const express = require('express')
const router = express.Router();
const app = express();

// Router imports
require('./router/router')(app);

module.exports = app;