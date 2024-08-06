const express = require('express');
const path = require('path');
const fs = require('fs');
const initializeLogFile = require('./controller/initializeLogFile');
const generateTicks = require('./controller/tickGenerator');

// Initialize log file
initializeLogFile();


/**
 * Create an instance of Express and start the server.
**/
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, './public')));


/**
 * Endpoint to serve the log file.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
**/

app.get('/log', (req, res) => {
    const logFilePath = path.join(__dirname, './spike_log.csv');
    if (fs.existsSync(logFilePath)) {
        res.sendFile(logFilePath);
    } else {
        res.status(404).send('Log file not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Start generating ticks
generateTicks(); // Call the function to start tick generation