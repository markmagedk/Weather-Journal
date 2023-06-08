// Import required modules
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// Initialize empty array to act as endpoint for all routes
const projectData = [];

// Start up an instance of the app
const app = express();

/* Middleware */
// Configure express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for cross origin allowance
app.use(cors());

// Serve static files from the 'website' folder
app.use(express.static('website'));

// Set up server
const port = 4800;
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});

// Set up GET route to retrieve all data
app.get('/all', (_req, res) => {
    res.status(200).send(projectData);
});

// Set up POST route to add data
app.post('/addData', (req, res) => {
    // Create a new object with data from the request body
    const newData = {
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings
    };
    // Add the new data to the projectData array
    projectData.push(newData);
    // Send a response to the client
    res.status(200).send(newData);
});

