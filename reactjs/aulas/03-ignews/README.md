![gif-ignews]()

## :page_with_curl: Projeto

> <b>IgNews</b> é a terceira aplicação criada no chapter 3 da trilha ReactJS de 2021 do Ignite da [Rocketseat](https://github.com/Rocketseat). Essa aplicação é sobre Notícias sobre tecnologias onde se o usuário realizar a inscrição, vai ter acesso aos posts por completo.

Nessa aplicação foi utilizado o fremework NextJS que é um fremework em cima do React.
O Next surgiu principalmente por causa de SSR(Server-Side-Rendering) mas nessa aplicação foi utilizado tanto SSR quanto SSG(Static-Site-Generation), usamos também um recurso do Next para criar um backend a partir somente desse fremework utilizando API Routes e a integração com a API de pagamentos do stripe.

<LINKEDIN>
Mas como saber quando devo utilizar o SSR ou o SSG?

Nós utilizamos o SSG(Static-Site-Generation) para casos que conseguimos gerar o
HTML de uma página a fim de compartilhar esse mesmo HTML com todas as pessoas
que estão acessando aquela aplicação(ex: a Home de um blog, o post do blog, a página de um produto dentro de um e-commerce, a página de uma categoria do e-commerce, essas páginas são iguais para todo mundo, e elas precisam de indexação do google).

SSR(Server-Side-Rendering) vai ser utilizando principalmente quando precisamos de indexação do google poré vai ser necessário dados dinâmicos, informações em tempo real do usuário que está acessando por exemplo.

E Client-Side(buscar dados pelo front) vamos utilizar quando eu não preciso de indexação e quando é uma informação que é carregada através de alguma ação do usuário e não necessariamente quando a página carrega, uma informação que não tem necessidade de já estár ali quando a página é carregada

Ex:
  Dentro de um Post no blog o Conteúdo pode ser SSR porque vai ser igual para todos que acessarem.
  Mas agora imagine que em baixo desse conteúdo no Post eu tenha uma seção de Comentários, vai ser Client-Side porque eu não preciso dos comentários assim que o usuário acessar o blog.
</LINKEDIN>

## 🚀 Tecnologias/Bibliotecas utilizadas

<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript"> </a>
<a href="https://nextjs.org/" target="_blank"> <img src="https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white" alt="Next"> </a>
<a href="https://fauna.com/" target="_blank"> <img src="https://img.shields.io/badge/-FaunaDB-604BE9?style=flat-square&logo=fauna&logoColor=white" alt="FaunaDB"> </a>
<a href="https://sass-lang.com/guide" target="_blank"> <img src="https://img.shields.io/badge/-Scss-pink?style=flat-square&logo=sass&logoColor=white" alt="SCSS"> </a>

# :construction_worker: Executando

```bash
# Clone o Repositório
$ git@github.com:Rodrigo001-dev/ignite.git
```

```bash
# Acesse a pasta do projeto
$ cd reactjs/aulas/03-ignews
```

```bash
# Baixe as dependendências
$ yarn
```

```bash
# Execute
$ yarn dev
```

# :atom_symbol: Desafios


## 💻 Autor

Feito com 💜 by Rodrigo Rael

<a href="https://www.linkedin.com/in/rodrigo-rael-a7a4b51a9/" target="_blank"> <img src="https://img.shields.io/badge/-RodrigoRael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https" alt="Linkedin Rodrigo"> </a>
<a href="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" target="_blank"> <img src="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" alt="Gmail Rodrigo"> </a>