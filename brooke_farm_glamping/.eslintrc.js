module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jest/recommended",
       // Optional, if using Airbnb rules
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react", "react-hooks", "jest"],
    settings: {
        react: {
          version: "detect", // Automatically detect the React version
        },
      },
    rules: {
      // Customize your rules here
      "react/react-in-jsx-scope": "off", // Not needed if using React 17+
      "react/prop-types": "off", // Turn off PropTypes if you use TypeScript
    },
  };
  