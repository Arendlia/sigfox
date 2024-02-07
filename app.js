/**
 * This file sets up the Express.js server and routes.
 */
require('express-group-routes');
// Load environment variables from .env file
require('dotenv').config({ path: `.env.local`, override: true });
const express = require('express')
const router = express.Router();
// Create Express.js app instance
const app = express();

// Router imports
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
app.use('/node_modules', express.static('node_modules'));

// Use routes
require('./router/router')(app);

// Export app instance
module.exports = app;