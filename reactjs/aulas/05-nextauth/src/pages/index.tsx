import { GetServerSideProps } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { parseCookies } from 'nookies';

import { AuthContext } from '../context/AuthContext';

import { withSSRGuest } from '../utils/withSSRGuest';

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

// utilizando do conceito da progração funcional chamado higher order function
// que básicamente quando uma função(withSSRGuest) retorna uma outra função ou
// uma função recebe uma função como parâmetro
// essa higher order function server para quando eu quero garantir que uma página
// não possa ser acessada por um usuário que já está logado
export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
