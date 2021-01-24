const path = require('path');
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@rua/api-v1',
    libraryTarget: 'umd'
  },
  plugins: [
    new NpmDtsPlugin({
      logLevel: 'warn',
      output: path.resolve(__dirname, 'dist/index.d.ts')
    })
  ]
};
