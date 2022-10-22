// quando utilizamos Next todas as imagens ficam dentro da pasta public

import Link from 'next/link';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.hedaerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          {
            /*
              utilizando a tag Link do Next fazemos o uso do conceito de SPA do
              React(basicamente estou reaproveitando o core da aplicação, a 
              estrutura da aplicação, mudando só o conteúdo)
            */
          }
          <Link href="/">
            <a className={styles.active} href="">Home</a>
          </Link>

          {
            /* 
              o prefetch vai fazer com que o Next por baixo dos panos deixe a
              página de posts pré-carregada
            */
          }
          <Link href="/posts" prefetch>
            <a>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
};