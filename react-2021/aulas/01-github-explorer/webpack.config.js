const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production'

// o webpack vai estipular uma série de configurações que é chamado de loaders
// que vão ensinar para a nossa aplicação como deve tratar cada um dos tipos
// de arquivos importados, básicamente o webpack vai pegar todos esses arquivos
// e vai converter em arquivos que são entendíveis pelo browser diretemente
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  // o entry é para falar qual é o arquivo inicial da aplicação
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  // o output é para falar qual arquivo que eu vou gerar com o webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // estou falando qual o tipo de arquivo ele vai ler
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    // no static eu tenho que falar onde está o arquivo com o conteúdo
    // estático da aplicação
    static: path.resolve(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  // no module vão ficar as configurações de como a aplicação vai se comportar
  // quando eu estiver importando cada um dos tipos de arquivos
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        // o babel-loader é a integração entre o babel e o webpack
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  }
};