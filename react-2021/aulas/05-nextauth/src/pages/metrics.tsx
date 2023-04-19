import { setupAPIClient } from "../services/api";

import { withSSRAuth } from "../utils/withSSRAuth";

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  );
};


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  
  return {
    props: {}
  }
  // como segundo parâmetro eu vou enviar um objeto
}, {
  // que tem uma opção permissions que são quais permissões eu quero verificar
  // que o usuário tem para poder acessar essa tela
  permissions: ['metrics.list'],
  // e pode recerber algumas roles
  roles: ['administrator']
});