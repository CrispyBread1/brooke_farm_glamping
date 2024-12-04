module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Adjust to the version of Node.js you're using
        },
      },
    ],
    '@babel/preset-react', // Add this to handle JSX transformation
  ],
  plugins: [
    "@babel/plugin-syntax-jsx", // Optional: if you want to parse JSX syntax without transforming it
  ],
};
