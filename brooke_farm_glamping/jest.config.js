module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transpile .js and .jsx files
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true, // Enable code coverage collection
  collectCoverageFrom: [
    "src/**/*.js", // Specify which files to collect coverage from (adjust based on your file structure)
    "!src/**/*.test.js", 
    "!src/reportWebVitals.js",
    "!src/Scripts/routes.js"
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', 
    "\\.(JPG|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
};
