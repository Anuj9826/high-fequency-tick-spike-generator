# High-Frequency Data Processing and Visualization

This project involves generating high-frequency financial data ticks, detecting significant price spikes, and visualizing these spikes in a web dashboard. It is designed to handle high-frequency data efficiently and scale as needed.

## Overview

### System Components

1. **Tick Generator**: Continuously generates random price ticks for predefined financial instruments at a rate of 1000 ticks per second.
2. **Spike Detector**: Detects significant price spikes and logs them to a CSV file.
3. **Web Dashboard**: Displays the logged spikes in a table format and updates periodically.

## System Design

### High-Frequency Data Processing

- **Tick Generation**: The tick generator produces data at a high frequency. To manage this, it uses asynchronous operations and sets an interval to generate and process ticks.
- **Spike Detection**: Spikes are detected based on price changes exceeding a defined threshold. The detection is performed asynchronously to handle the high volume of data efficiently.

### Scalable System Design

- **Worker Threads**: To handle high-frequency data processing and spike detection, worker threads can be employed. This allows concurrent processing without blocking the main thread.
- **Batch Processing**: Data is processed in batches to reduce the overhead of frequent I/O operations and improve performance.

### Visualization

- **Web Dashboard**: A simple HTML page with embedded JavaScript fetches the log data from the server and updates the table every 5 seconds. This provides real-time visualization of detected price spikes.

## Setup and Installation

### Prerequisites

1. **Node.js**: Ensure Node.js is installed. You can download it from [Node.js official site](https://nodejs.org/).
2. **CSV Log File**: The application generates a CSV file to log price spikes. Ensure proper file permissions are set.

### Running the Application

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Anuj9826/high-fequency-tick-spike-generator.git
   cd high-fequency-tick-spike-generator

2. **Install Dependencies**:
   Install the required Node.js packages by running:
    ```sh
    npm install

3. **Start the Web Dashboard Server**:
   Open terminal, start the web server that serves the dashboard:
   ```sh
   node index.js

### Code Components
1. **tickGenerator.js** Generates high-frequency price ticks and sends them to the spike detector.
2. **spikeDetector.js** Detects significant price spikes and logs them to a CSV file.
3. **index.js** Serves the CSV log file to the web dashboard and handles HTTP requests.
4. **public/index.html** Provides a web interface to display price spikes. It fetches log data from the server and updates the table every 5 seconds.