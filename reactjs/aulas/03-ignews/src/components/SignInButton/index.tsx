import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {
  // o hook useSession do nextAuth vai retornar informações se o usuário tem uma
  // seção ativa ou não, ou seja, se ele tá logado ou não
  const { data: session } = useSession();

  console.log(session);

  // se o usuário tem uma seção eu mostro o button com as informações dele
  return session ? (
    <button 
      type="button"
      className={styles.signInButton}
      // o signOut vai deslogar o usuário
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      // o signIn é uma função que vai fazer a autenticação do usuário
      onClick={() => signIn('github')}
    >
      <FaGithub color="#EBA417" />
      Signin with Github
    </button>
  );
};