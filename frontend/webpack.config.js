const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
};
