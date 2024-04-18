const path = require('path');

module.exports = {
  entry: './src/index.js', // Your library's entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'aichat.js', // Output file name
    library: 'AIChat', // Global variable name for your library
    libraryTarget: 'umd', // Universal Module Definition, for compatibility with various module systems
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process .js and .jsx files
        exclude: /node_modules/, // Don't process files in node_modules
        use: {
          loader: 'babel-loader', // Use babel-loader
        },
      },
    ],
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
};
