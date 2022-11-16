![gif-dashgo]()

## :page_with_curl: Projeto

> <b>Dashgo</b> é a quarta aplicação criada no chapter 4 da trilha React de 2021 da [Rocketseat](https://github.com/Rocketseat), nessa aplicação o objetivo foi criar um dashboard totalmente responsivo abordando o conceito de UI-declarativa utilizando Chakra UI.

Nessa aplicação utilizamos Next com o Chakra-UI, o Chakra não nos entrega uma convenção sobre o layout, ele vem com elementos muitos secos para sair utilizando, é possível construir qualquer layout utilizando Chakra, não é como o material-UI que é necessário seguir uma convenção de layout, o Chakra trás componentes muito limpos em que nós definimos a estilização no formato em que preferirmos. Logo depois de construir a interface totalmente responsiva utilizamos o react-query para realizar o data-fething, o React Query é um server-state library, ou seja, ele controla o estado da comunicação do frontend com o servidor.

<LINKEDIN>
  Mas afinal, o que é interface declarativa?

  Interface declarativa é quando conseguimos principalmente definir a estilização dos nossos elementos direto pela tag dele.

  Mas isso não iria sujar muito o nosso HTML?

  Tem duas coisas que vão evitar que o nosso HTML fique muito sujo com muita estilização:

  A primeira dessas coisas é que a grande maioria dessas bibliotecas de interface declarativa vem com um pacote de componentes muito legal para sair utilizando.
  E a segunda coisa para realmente evitar ter muita estilização junto no HTML deixando o código com uma manutenibilidade muito baixa é componentizar ainda mais a nossa aplicação, ou seja, dividir ainda mais a nossa aplicação em pequenos componentes.

  Utilizando uma biblioteca de interface declarativa tira um pouco de complexidade quando o projeto cresce, porque quando acontece do projeto crescer muito e é necessário editar uma parte pequena, vai ter tanto css em tantos lugares da aplicação que fica difícil de mexer em todas as partes de um componente de uma só vez de uma maneira rápida, por isso que a interface declarativa deixa isso declarativo, mais claro para gente onde é preciso mexer nas coisas para mudar algo.

  Mas por que utilizar o react-query para as consultas no backend?

  A partir do momento que utilizamos o React-Query, quando for feito uma
  requisição para o backend os dados dessa requisição vão ficar armazenados
  em um cache dentro do frontend, e esse cache pode ser utilizado quando precisar dos mesmos dados, dentro de um certo intervalo de tempo, não vai ser necessário
  ir lá novamente no backend buscar esses dados porque já vai ter uma vesão
  deles em cache.
</LINKEDIN>


## 🚀 Tecnologias/Bibliotecas utilizadas

<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript"> </a>
<a href="https://nextjs.org/" target="_blank"> <img src="https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white" alt="Next"> </a>
<a href="https://chakra-ui.com/" target="_blank"> <img src="https://img.shields.io/badge/-ChakraUI-%234ED1C5?style=flat-square&logo=chakraui&logoColor=white" alt="Chakra UI"> </a>
<a href="https://react-query-v3.tanstack.com/" target="_blank"> <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=flat-square&logo=react%20query&logoColor=white" alt="React Query"> </a>

## :construction_worker: Executando

```bash
# Clone o Repositório
$ git@github.com:Rodrigo001-dev/ignite.git
```

```bash
# Acesse a pasta do projeto
$ cd reactjs/aulas/04-dashgo
```

```bash
# Baixe as dependendências
$ yarn
```

```bash
# Execute
$ yarn dev
```
## :atom_symbol: Desafios

[Desafio 1](https://github.com/Rodrigo001-dev/ignite/tree/main/reactjs/desafios/ignite-challenge-06): Primeiro desafio com o objetivo de criar uma aplicação totalmente responsiva utilizando Chakra-UI

## 💻 Autor

Feito com 💜 by Rodrigo Rael

<a href="https://www.linkedin.com/in/rodrigo-rael-a7a4b51a9/" target="_blank"> <img src="https://img.shields.io/badge/-RodrigoRael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https" alt="Linkedin Rodrigo"> </a>
<a href="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" target="_blank"> <img src="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" alt="Gmail Rodrigo"> </a>
