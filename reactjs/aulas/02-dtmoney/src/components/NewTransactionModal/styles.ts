import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #D7D7D7;
    background: #E7E9EE;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    /* todo o input que tiver um input antes dele */
    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #FFF;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;

    transition: filter 0.2s;

    &:hover {
      /* brightness => luminosidade */
      filter: brightness(0.9);
    }
  }
`;

export const TrasactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns:  1fr 1fr;
  gap: 0.5rem;

  button {
    height: 4rem;
    border: 1px solid #D7D7D7;
    border-radius: 0.25rem;

    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: border-color 0.2s;

    &:hover {
      /* 
        o darken vai escurecer uma cor, nesse caso vai escurecer a cor #D7D7D7
        em 10%(0.1)
      */
      border-color: ${darken(0.1, '#D7D7D7')};
    }

    img {
      width: 20px;
      height: 20px;
    }

    span {
      display: inline-block;
      margin-left: 1rem;
      font-size: 1rem;
      color: var(--text-title);
    }
  }
`;