import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
};

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        {/* article é utilizada para quando temos artigos/posts */}
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          {
            /*
             dangerouslySetInnerHTML como nome já diz é muito perigoso, é sempre
             bom nos cuidarmos disso porque se estamos setando o HTML, se o backend
             permitir por exemplo que uma pessoa cadastre um script no conteudo
             esse script vai ser jogado aqui para dentro e a pessoa vai poder
             fazer um ajection do cookie da pessoa, como eu estou usando prismic
             e eu sei que o prismic tem uma tratativa do HTML para não permitir
             que a pessoa coloque scripts maliciosos no conteudo, ai sim eu
             posso utilizar essa propriedade
            */
          }
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </>
  );
};

// eu não vou pegar o conteúdo do post com o getStaticProps porque toda página
// que é gerada de forma estática, não é protegida, todo mundo vai conseguir ter
// acesso a ela, e para essa aplicação que para ter acesso ao conteudo inteiro
// do post é preciso que o usuário esteja logado e tenha uma assinatura,
// utilizando o getServerSideProps é a unica forma de eu garantir com total
// certeza que o usuário não vai ter acesso ao conteudo do post caso esse usuário
// não esteja logado ou não tenha uma assinatura porque com o getServerSideProps
// eu tenho acesso ao req e dentro dessa requisição eu consigo obter se o
// usuário está logado ou não mesmo que o getServerSideProps vai precisar ir na
// API do prismic toda vez para buscar o conteudo do post
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  // pegando o slug do post que vem na rota
  const { slug } = params;

  // if (!session) {

  // }

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  };

  return {
    props: {
      post,
    }
  }
};