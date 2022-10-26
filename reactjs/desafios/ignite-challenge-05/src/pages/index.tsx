import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | SpaceTraveling</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={styles.posts}>
          <a>
            <strong>Titulo do post</strong>
            <p>Subtitulo do post asdfeasdfeawfdsafeasdfeafdsfeadfaefasdfe</p>
            <div>
              <span>
                <FiCalendar size="1.5rem" />
                <time>15 Jan 2022</time>
              </span>

              <span>
                <FiUser size="1.5rem" />
                Author do post
              </span>
            </div>
          </a>

          <a>
            <strong>Titulo do post</strong>
            <p>Subtitulo do post asdfeasdfeawfdsafeasdfeafdsfeadfaefasdfe</p>
            <div>
              <span>
                <FiCalendar size="1.5rem" />
                <time>15 Jan 2022</time>
              </span>

              <span>
                <FiUser size="1.5rem" />
                Author do post
              </span>
            </div>
          </a>

          <a>
            <strong>Titulo do post</strong>
            <p>Subtitulo do post asdfeasdfeawfdsafeasdfeafdsfeadfaefasdfe</p>
            <div>
              <span>
                <FiCalendar size="1.5rem" />
                <time>15 Jan 2022</time>
              </span>

              <span>
                <FiUser size="1.5rem" />
                Author do post
              </span>
            </div>
          </a>
        </div>

        <div className={styles.containerButton}>
          {/* {
            postsPagination.next_page !== null
            &&
            <button>
              Carregar mais posts
            </button>
          } */}
          <button>Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  // const postsResponse = await prismic.getByType();

  return {
    props: {}
  }
};
