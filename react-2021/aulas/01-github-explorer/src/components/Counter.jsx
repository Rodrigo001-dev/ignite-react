import { useState } from 'react';

// imutabilidade
// quando falamos de imutabilidade, nesse conceito queremos dizer que não é 
// possível alterar diretamente uma informação de uma 
// variável(que já está salva na memória) e sim criar um
// novo espaço na memória contendo a minha nova informação

// por isso que é colocado setCounter que é uma forma de alterar o valor de
// counter, como o nome já diz eu posso setar(set) um novo valor para counter
// não adicionar(addCounter), não incrementar(incrementCounter)
// é como se eu tivesse criando uma nova variável counter toda vez que eu executar
// o setCounter

export function Counter() {
  // const => constant
  // let => let it change(deixe isso mudar)
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
};