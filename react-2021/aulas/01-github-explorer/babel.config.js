// o babel serve básicamente para converter o código para uma maneira que todos
// os browsers e todo o ambiente da aplicação consiga entender todos os códigos
// o JavaScript é uma linguagem que se atualiza muito e tem várias funcionalidades
// do react por exemplo a escrita de HTML dentro do próprio código JavaScript
// que os navegadores ainda não entendem, o babel faz o papel de converter o
// nosso código para uma maneira que os navegadores mais modernos possam entender 
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', {
      runtime: 'automatic'
    }],
  ]
};