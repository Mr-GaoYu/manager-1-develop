const path = require('path');
const paths = require('../config/paths');
const includePath = path.resolve(__dirname, '../../..');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],

    alias: {
      'src/': paths.appSrc,
      joi: 'joi-browser'
    },
    plugins: [new TsconfigPathsPlugin({ configFile: paths.appTsConfig })]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: includePath,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /(font-logos.svg)|(\.(woff|woff2|eot|ttf))$/,
        include: includePath,
        use: 'url-loader'
      },
      {
        test: /\.svg$/,
        exclude: [/font-logos.svg$/],
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                // by default preffixes classes with svg path or random string
                { prefixIds: false },
                // by default removes the viewbox attribute
                { removeViewBox: false }
              ]
            }
          }
        }
      },
      {
        test: /\.tsx?$/,
        include: paths.appSrc,
        exclude: [
          path.resolve(__dirname, 'src/components/__image_snapshots__'),
          path.resolve(__dirname, 'src/components/__snapshots__')
        ],
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
};
