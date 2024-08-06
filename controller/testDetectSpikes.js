const detectSpikes = require('./spikeDetector');

// Simulated ticks
const simulatedTicks = [
    { 'NSE:TCS': 320.17 },  // Initial price
    { 'NSE:TCS': 350.00 },  // No spike
    { 'NSE:TCS': 400.00 },  // Spike
    { 'NSE:TCS': 280.00 }   // Spike
];

(async () => {
    console.log('Starting spike detection test...');

    for (const tick of simulatedTicks) {
        await detectSpikes(tick);
    }

    console.log('Spike detection test completed.');
})();
