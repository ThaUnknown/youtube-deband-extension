const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: ['./src/background/index.js'],
    content_scripts: ['./src/content_scripts/index.js'],
    popup: ['./src/popup/scripts/index.js', './src/popup/styles/popup.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json' },
        { from: './src/popup/popup.html' },
        { from: 'icons/*', to: path.resolve(__dirname, 'dist'), context: 'src/' }
      ]
    })
  ]
}
