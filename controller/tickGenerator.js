const detectSpikes = require('./spikeDetector');
const instruments = ['NSE:ACC', 'NSE:SBIN', 'NSE:TCS', 'NSE:INFY'];
const tickFrequency = 1000; // 1000 ticks per second

/**
 * Generate a random price between min and max.
 * @param {number} min - Minimum price.
 * @param {number} max - Maximum price.
 * @returns {number} - Random price.
**/
const getRandomPrice = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
}

/**
 * Generate and process price ticks at a specified frequency.
 **/
const generateTicks = () => {
    setInterval(async () => {
        const tick = {};
        instruments.forEach(instrument => {
            tick[instrument] = getRandomPrice(100, 1000);
        });
        await detectSpikes(tick);
    }, 1000 / tickFrequency);
}

module.exports = generateTicks;
