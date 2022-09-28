const path = require('path');

// o webpack vai estipular uma série de configurações que é chamado de loaders
// que vão ensinar para a nossa aplicação como deve tratar cada um dos tipos
// de arquivos importados, básicamente o webpack vai pegar todos esses arquivos
// e vai converter em arquivos que são entendíveis pelo browser diretemente
module.exports = {
  mode: 'development',
  // o entry é para falar qual é o arquivo inicial da aplicação
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  // o output é para falar qual arquivo que eu vou gerar com o webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // estou falando qual o tipo de arquivo ele vai ler
    extensions: ['.js', '.jsx'],
  },
  // no module vão ficar as configurações de como a aplicação vai se comportar
  // quando eu estiver importando cada um dos tipos de arquivos
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        // o babel-loader é a integração entre o babel e o webpack
        use: 'babel-loader',
      }
    ],
  }
};