// jsx é a nomenclatura que damos quando utilizamos HTML dentro do JavaScript
import { render } from 'react-dom';
import { App } from './App';

// a função render recebe 2 parâmetros
// o primeiro é o que eu quero exibir em tela, o segundo é dentro de qual
// elemento eu quero renderiazar essa informação
render(<App />, document.getElementById('root'))
