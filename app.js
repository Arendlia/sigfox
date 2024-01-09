require('express-group-routes');
require('dotenv').config({ path: `.env.local`, override: true });
const express = require('express')
const router = express.Router();
const app = express();

// Router imports
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

require('./router/router')(app);

module.exports = app;