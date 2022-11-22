import { FormEvent, useState } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    const data = {
      email,
      password,
    };

    console.log(data);
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
