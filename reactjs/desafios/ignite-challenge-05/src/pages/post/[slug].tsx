import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
      alt: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  // se algun post cair no fallback e o fallback for true então eu vou apresentar
  // um <p>Carregando</p>
  if (router.isFallback) {
    <p>Carregando...</p>
  };

  function timeReading() {
    const words = post.data.content.reduce((previous, current, index) => {
      const headingWords = current.heading.split(' ');
      let bodyWords = 0;
      current.body.forEach((body, index) => {
        const myBodyWords = body.text.split(' ');
        bodyWords += myBodyWords.length;
        return;
      });
      return previous += bodyWords;
    }, 0);
    // o ser humano lê em média 200 palavras por minuto
    // estou pegando o total de palavras e divivindo por 200 para arredondar o
    // resultado para cima para saber quanto tempo levaria para ler o post
    const time = Math.ceil(words / 200);
    return time;
  };

  return (
    <>
      <Head>
        <title>{post.data.title} | SpaceTraveling</title>
      </Head>

      <img src={post.data.banner.url} alt={post.data.banner.alt} />
      <main className={commonStyles.container}>
        <article className={styles.post}>
          <h1>{post.data.title}</h1>
          <div>
            <span>
              <FiCalendar size="1.5rem" />
              <time>
                {format(
                  new Date(post.first_publication_date),
                  'PP',
                  { locale: ptBR }
                )}
              </time>
            </span>

            <span>
              <FiUser size="1.5rem" />
              {post.data.author}
            </span>

            <span>
              <FiClock size="1.5rem" />
              {`${timeReading()} min`}
            </span>
          </div>

          {post.data.content.map((content) => {
            return (
              <section key={content.heading}>
                <h2>{content.heading}</h2>
                {content.body.map((body) => {
                  return (
                    <p key={body.text}>{body.text}</p>
                  );
                })}
              </section>
            );
          })}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const { results } = await prismic.getByType('posts');

  const paths = results.map((post) => {
    return { params: { slug: post.uid } };
  });

  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response,
    },
    revalidate: 60 * 30 // 30 minutes
  }
};
