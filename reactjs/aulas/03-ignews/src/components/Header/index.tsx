// quando utilizamos Next todas as imagens ficam dentro da pasta public

import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.hedaerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          {
            /* 
              o prefetch vai fazer com que o Next por baixo dos panos deixe a
              página de posts pré-carregada
            */
          }
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            {/* se o asPath for igual a /posts eu coloco a classe active */}
            {/* <a className={asPath === '/posts' ? styles.active : ''}>Posts</a> */}
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
};