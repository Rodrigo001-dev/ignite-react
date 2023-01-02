import { GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | IgNews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

// no Next quando falamos de geração de página estática, temos 3 formas
// fazer a geração das páginas estáticas durante a build que é quando estiver
// fazendo a build já vai gerar as páginas estáticas e vai estar pronta para ser
// acessada
// gerar a página estática no primeiro acesso que é quando tiver um primeiro
// usuário acessando a página vai ser gerada uma versão dela estática para os
// proximos usuários
// e tem a metade, exemplo: eu tenho 100 produtos, eu vou gerar metade de forma
// estática deles na build e metade no primeiro acesso
// o método getStaticPaths está totalmente ligado com tudo isso, ou seja o
// getStaticPaths retorna dentro do paths qual caminhos(nesse caso quais previews
// de posts eu quero gerar durante a build)
export const getStaticPaths: GetStaticPaths = async () => {
  // mas aqui eu poderia fazer uma chamada do posts mais acessados

  // e eu passaria o paths dentro do return assim
  // paths: [
  //   { params: { slug: 'slug-do-post' } }
  // ]
  return {
    // eu vou deixar o paths vazio porque eu quero que todos os posts sejam
    // carregados comforme a pessoa faz o primeiro acesso
    paths: [],
    // o fallback pode receber 3 valores
    // true, false e 'blocking'
    // o true quer dizer que se alguém tentar acessar um post que ainda não foi
    // gerado de forma estática, eu quero que carregue o conteudo desse post
    // pelo lado do browser(pelo lado do cliente) o true tem 2 problemas,
    // primeiro que ele vai carregar a página sem conteudo e depois vai preencher
    // o conteudo e o fallback: true não muito bom para SEO por conta de o
    // conteudo ser gerado no lado do cliente
    // o false faz com que se o post não foi gerado de forma estática ainda, ele
    // vai retornar um 404(not found)
    // o 'blocking' tem um funcionamente parecido com o true mas quando eu
    // acessar um conteudo que ainda não foi gerado de forma estática, ele vai
    // tentar carregar esse conteudo novo porém ele vai carregar na camada do
    // Next executando ServerSideRendering e ai quando o conteudo estiver pronto
    // vai mostrar o html da página
    fallback: "blocking",
  };
};

// aqui eu posso utilizar o getStaticProps porque o conteudo de preview do post
// é publico, todo mundo pode acessar, já que todo mundo pode acessar eu não
// preciso de segurança que o getServerSideProps me oferece já que eu não vou
// verificar se ele está logado com uma assinatura ativa
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("publication", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
    revalidate: 30 * 60, // 30 minutes
  };
};
