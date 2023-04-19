import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  const [pagination, setPagination] = useState(postsPagination);

  function loadMorePosts() {
    fetch(pagination.next_page, {}).then((response) => {
      return response.json();
    }).then((result) => {
      const newPagination: PostPagination = {
        next_page: result.next_page,
        results: [
          ...pagination.results,
          ...result.results,
        ],
      };
      setPagination(newPagination);
    })
    .catch((error) => {
      return console.log(error.message);
    })
  };

  return (
    <>
      <Head>
        <title>Home | SpaceTraveling</title>
      </Head>

      <main className={commonStyles.container}>
        <div className={styles.posts}>
          {pagination.results.map((post) => {
            return (
              <Link key={post.uid} href={`/post/${post.uid}`}>
                <a>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
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
                  </div>
                </a>
              </Link>
            )
          })}
        </div>

        <div className={styles.containerButton}>
          {pagination.next_page && (
            <button onClick={() => loadMorePosts()}>
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 5,
  });

  return {
    props: {
      postsPagination: postsResponse
    },
    revalidate: 60 * 30 // 30 minutes
  }
};
