import { useSession, signIn } from 'next-auth/react';

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
};

// exite 3 lugares dentro do Next que podemos fazer uma operação que precise de
// segurança, uma operação que pode ser usada variaveis de ambiente secretas
// os 3 lugares são
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    // se não existir uma sessão do usuário, se o usuário não estiver logado
    if (!session) {
      // eu vou redirecionar ele para a autenticação com o github
      signIn('github');
      toast.success("Logado com Sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark"
      });
      // dando o return para o código parar de ser executado por aqui
      return;
    }

    // se o usuário está com uma sessão ativa, se ele está logado
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error('Algo deu errado!', {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark"
      });
      console.log(error.message);
    }
  };
  
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};