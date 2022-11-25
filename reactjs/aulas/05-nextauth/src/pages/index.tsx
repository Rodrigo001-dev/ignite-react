import { GetServerSideProps } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { parseCookies } from 'nookies';

import { AuthContext } from '../context/AuthContext';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    const data = {
      email,
      password,
    };

    await signIn(data);
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        className={styles['input-password']}
      />

      <button type="submit">Entrar</button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // por eu estar pelo lado do servidor no Next, toda vez que eu for utilizar
  // as funções do nookies, eu sempre vou passar como primeiro parâmetro o contexto(ctx)
  // antes, quando eu estava utilizando pelo lado do browser eu passada undefined
  const cookies = parseCookies(ctx);

  // se dentro dos cookies existe o token
  if (cookies['nextauth.token']) {
    return {
      // eu vou redirecionar o usuário para a página de dashboard
      redirect: {
        destination: '/dashboard',
        // colocando o permanent como false eu falo que o redirecionamento não é
        // permanente por conta do HTTP code para o browser entender se é um
        // redirecionamento que sempre vai acontecer ou se só aconteceu dessa vez
        // por conta de alguma condição
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
