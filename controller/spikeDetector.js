const fs = require('fs').promises;
const path = require('path');

// Path to the CSV log file
const logFilePath = path.join(__dirname, '../spike_log.csv');

// Object to store the last recorded prices
let lastPrices = {};

/**
 * Calculate the percentage change between two prices.
 * @param {number} oldPrice - The previous price.
 * @param {number} newPrice - The current price.
 * @returns {number} - The percentage change.
**/

const calculatePriceChange = (oldPrice, newPrice) => {
    return ((newPrice - oldPrice) / oldPrice) * 100;
};

/**
 * Convert a UTC timestamp to IST and return the date and time separately.
 * @param {Date} date - The UTC date to be converted.
 * @returns {Object} - An object containing formatted date and time strings.
**/

const formatDateAndTime = (date) => {
    const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(date).replace(',', '');
};

/**
 * Log price spike information to the CSV file.
 * @param {Array} logEntries - An array of log entries to be written.
**/

const logPriceSpikes = async (logEntries) => {
    try {
        await fs.appendFile(logFilePath, logEntries.join('\n') + '\n');
    } catch (error) {
        console.error('Error writing to log file:', error.message);
    }
};

/**
 * Detect price spikes based on price ticks and log them.
 * @param {Object} tick - An object where keys are instrument symbols and values are current prices.
 */
const detectSpikes = async (tick) => {
    const timestamp = formatDateAndTime(new Date());
    const logEntries = [];

    for (const instrument in tick) {
        const newPrice = tick[instrument];
        const oldPrice = lastPrices[instrument];

        if (oldPrice !== undefined) {
            const priceChange = calculatePriceChange(oldPrice, newPrice);
            if (Math.abs(priceChange) > 10) {
                logEntries.push(`${instrument},${oldPrice},${newPrice},${timestamp}`);
            }
        }

        lastPrices[instrument] = newPrice;
    }

    if (logEntries.length > 0) {
        await logPriceSpikes(logEntries);
    }
};

module.exports = detectSpikes;