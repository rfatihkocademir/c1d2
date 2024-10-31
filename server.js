// server.js

const http = require('http');
const app = require('./app');
const config = require('./src/config/app.config');

const PORT = config.PORT;

if (!process.env.PORT) {
  console.log(`No PORT environment variable set, using default port ${PORT}`);
}

// Create HTTP server
const server = http.createServer(app);

let retryCount = 0;
const MAX_RETRIES = 5;

// Function to handle server start
const startServer = (err) => {
  if (err) {
    console.error(`Failed to start server: ${err.message}`);
    gracefulShutdown();
  } else {
    console.log(`Server is running on port ${PORT}`);
    handleMonitoring();
  }
};

// Function to handle monitoring setup
const handleMonitoring = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Production environment detected, monitoring enabled.');
    // Placeholder for monitoring setup
    // Example: setupMonitoring(server);
  }
};

// Function for graceful shutdown
const gracefulShutdown = () => {
  console.log('Initiating graceful shutdown...');
  server.close(() => {
    console.log('Server has been closed. Exiting process.');
    process.exit(1);
  });
};

// Start server
server.listen(PORT, startServer);

// Handle server errors
server.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
  // Implement retry mechanism or graceful shutdown
  if (error.code === 'EADDRINUSE') {
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.error(`Port ${PORT} is already in use. Retrying in 5 seconds... (Attempt ${retryCount}/${MAX_RETRIES})`);
      setTimeout(() => {
        server.close();
        server.listen(PORT);
      }, 5000);
    } else {
      console.error('Max retry attempts reached. Initiating graceful shutdown...');
      gracefulShutdown();
    }
  } else if (error.code === 'EACCES') {
    console.error(`Permission denied. Cannot bind to port ${PORT}. Please check your privileges.`);
    gracefulShutdown();
  } else {
    console.error('Unexpected server error. Initiating graceful shutdown...');
    gracefulShutdown();
  }
});
