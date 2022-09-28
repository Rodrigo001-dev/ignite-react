import { RepositoryList } from './components/RepositoryList';
import { Counter } from './components/Counter';

import './styles/global.scss';

// imutabilidade
// quando falamos de imutabilidade, nesse conceito queremos dizer que não é 
// possível alterar diretamente uma informação de uma 
// variável(que já está salva na memória) e sim criar um
// novo espaço na memória contendo a minha nova informação

export function App() {

  return (
    <>
      <RepositoryList />
      <Counter />
    </>
  );
};