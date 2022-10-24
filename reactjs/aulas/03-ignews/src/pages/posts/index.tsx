import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            // agora a partir do slug que está vindo da rota para a página do
            // determinado post, no arquivo [slug].tsx eu vou pegar e apresentar
            // em tela o conteudo do post
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          )) }
        </div>
      </main>
    </>
  );
};

// essa página vai ser estática porque não faz sentido toda vez que alguém
// acessar essa página, eu ir lá no prismic e buscar os dados, porque o prismic
// tem um limite de largura de banda(no caso 100GB), cada vez que eu vou no
// prismic e busco os dados eu vou consumindo a largura de banda, mas se eu faço
// essa página ser estática, ela consome o prismic, gera uma versão estática
// dessa página, as próximas pessoas que acessarem, a página não vai ter que ir
// lá no prismic na API buscar os dados, ou seja, nós vamos consumir menos banda 
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getByType('publication');

  // console.log(JSON.stringify(response, null, 2));

  // vou fazer a formatação dos dados que foram retornados do prismic
  // se eu fazer a formatação no html, a cada vez que tiver um acesso vai 
  // realizar a formatação, mas se eu fizer a formatação aqui, ela só vai ser
  // feita uma única vez
  // results são todos os resultados de post que vieram
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      // o RichText é um conversor do formato que são retornados os dados do
      // prismic para texto ou HTML
      title: RichText.asText(post.data.title),
      // ele vai percorrer o array de content até encontrar o primeiro em que o
      // tipo seja paragraph e vai pegar o texto daquele paragraph caso o
      // paragraph seja encontrado, senão eu quero que ele me retorne uma string
      // vazia 
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  return {
    props: {
      posts
    }
  };
};