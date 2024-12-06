module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transpile .js and .jsx files
  },
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/jest.setup.js"],
  collectCoverage: true, // Enable code coverage collection
  collectCoverageFrom: [
    "src/**/*.js", // Specify which files to collect coverage from (adjust based on your file structure)
    "!src/**/*.test.js", 
    "!src/reportWebVitals.js",
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', 
    '\\.(png|jpg|jpeg|gif|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
