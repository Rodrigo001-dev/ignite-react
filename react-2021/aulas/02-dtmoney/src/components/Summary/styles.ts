import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  /* repeat(3, 1fr) três colunas de tamanhos iguais */
  grid-template-columns: repeat(3, 1fr);
  /* gap é o espaçamento entre os items do grid */
  gap: 2rem;
  margin-top: -10rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    /* a div que tiver a classe highlight-backgorund */
    &.highlight-backgorund {
      background: var(--green);
      color: #FFF;
    }
  }
`;
