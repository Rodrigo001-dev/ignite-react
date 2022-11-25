import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }, []);
  
  return (
    <h1>Dashboard: {user?.email}</h1>
  );
};


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  // como o refresh acontece aqui nesse momento do getServerSideProps
  // e o servidor e o client compartilham dos cookies, quando essa requisição
  // (apiClient.get('/me')) fez o refresh do token a requisição do useEffect que
  // acontece do lado do browser que acontece logo depois dessa(response), ela
  // não precisa mais fazer o refresh
  const response = await apiClient.get('/me');

  console.log(response.data);
  
  return {
    props: {}
  }
});