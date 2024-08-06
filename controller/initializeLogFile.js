const fs = require('fs');
const path = require('path');

// Path to the CSV log file
const logFilePath = path.join(__dirname, '../spike_log.csv');

/**
 * Ensure that the CSV log file exists and initialize it with headers if necessary.
**/

const initializeLogFile = () => {
    if (!fs.existsSync(logFilePath)) {
        fs.createWriteStream(logFilePath).write('Instrument,Old Price,New Price,Date,Time\n');
    }
};

module.exports = initializeLogFile;
