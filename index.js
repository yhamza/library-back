const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConnection = require('./config/database');
require('dotenv').config();

// Get the current working directory
const cwd = process.cwd();
console.log(`Current working directory: ${cwd}`);

// Check if environment variable 'DEBUG' is set
if (process.env.DEBUG) {
  console.log('Debug mode enabled');
}

const fs = require('fs');



// Use CORS
app.use(cors());

// Use cookie parser
app.use(cookieParser());

// Use JSON parser
app.use(express.json());

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Path to the HTML file
const filePath = path.join(__dirname, '../dist/create.html');

// Connect to the database
const url = process.env.URL || 'your_default_database_url';
dbConnection(url);

// Routes
app.use(require('./routes/main'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});