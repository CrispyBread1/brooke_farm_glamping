module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transpile .js and .jsx files
  },
  testEnvironment: 'node', // Use Node environment for testing
  collectCoverage: true, // Enable code coverage collection
  collectCoverageFrom: [
    "src/**/*.js", // Specify which files to collect coverage from (adjust based on your file structure)
    "!src/**/*.test.js", 
    "!src/reportWebVitals.js",
  ],
};
