![gif-performance-react](https://github.com/Rodrigo001-dev/ignite/blob/main/reactjs/aulas/06-performance-react/.github/performance.gif)

## :page_with_curl: Projeto

> <b>Performance react</b> é a sexta aplicação criada no chapter 4 da trilha React de 2021 da [Rocketseat](https://github.com/Rocketseat), nela o objetivo foi aprender como otimizar um aplicação React aprendendo sobre os ciclos de renderização no react e sobre o algoritimo de Reconciliation.

Mas para começar a falar de performance dentro do React precisamos entender os principais momentos onde o react acaba realizando uma nova renderização de um componente.

Renderização é basicamente um fluxo de comparar um componente da sua versão anterior com uma nova versão para então exibir uma nova versão daquele componente em tela, ou seja, recalcular toda a interface de um componente.

As 3 principais formas que temos de um componente renderizar na nossa aplicação são: 

Pai para Filho

Uma renderização de pai para filho é quando temos um componente pai e dentro dele temos componentes filhos, sempre que o componente pai tiver uma nova renderização
porque alguma coisa aconteceu(alterou algum contexto, algum estado, alguma propriedade), o componente filho vai automaticamente vai ser renderizado novamente, ou seja, ele vai ser recalculado.

Propriedade

Quando algum componente tiver uma propriedade e essa propriedade por algum motivo mudou, esse componente vai ser renderizado novamente no React.

Hooks(hooks que armazenam informação ex: useState, useContext, useReducer)

Alguns hooks podem acabar causando novas alterações que vai ocasionar uma nova renderização.

O fluxo de renderização no react é basicamente um algoritimo.

Quando o react percebe que precisa renderizar de novo um componente ele vai fazer:

1. Gerar uma nova versão do componente que precisa ser renderizado;
   Obs: a nova versão do componente não é guardada em tela ou qualquer coisa assim, ela guardada em memória, é uma representação da DOM daquele componente.

2. Comparar essa nova versão com a versão anterior já salva na página;

3. Se houverem alterações, o React renderiza essa nova versão em tela;

O react usa um algoritimo que chamamos de Reconciliation(Reconciliação), esse algoritimo é um algoritimo de diffing, ou seja, um algoritimo de calcular a diferença entre duas estruturas.

Imagene que temos uma lista muito grande, agora imagine que algum item dentro dessa lista foi deletado, quando o react for fazer a nova renderização ele vai comparar as duas árvores(DOM), então a árvore de antes que tinha o item é diferente dessa nova árvore que não tem mais o item, se o react não utilizasse um algoritimo de diffing ele simplesmente iria renderizar toda a lista de novo, ou seja, todos os itens da lista precisariam ser recriados no HTML. Com o algoritimo de Reconciliação o react vai definir algumas regras de encontrar componentes que podem ter sido alterados ou podem ter sido removidos da tela e vai alterar somente o necessário para levar os componentes ao estado desejado.

## 🚀 Tecnologias/Bibliotecas utilizadas

<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript"> </a>
<a href="https://nextjs.org/" target="_blank"> <img src="https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white" alt="Next"> </a>

## :construction_worker: Executando

```bash
# Clone o Repositório
$ git@github.com:Rodrigo001-dev/ignite.git
```

```bash
# Acesse a pasta do projeto
$ cd reactjs/aulas/06-performance-react
```

```bash
# Baixe as dependendências
$ yarn
```

```bash
# Execute
$ yarn dev
```

## 💻 Autor

Feito com 💜 by Rodrigo Rael

<a href="https://www.linkedin.com/in/rodrigo-rael-a7a4b51a9/" target="_blank"> <img src="https://img.shields.io/badge/-RodrigoRael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https" alt="Linkedin Rodrigo"> </a>
<a href="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" target="_blank"> <img src="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" alt="Gmail Rodrigo"> </a>
