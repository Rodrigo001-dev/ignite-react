import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const HeroContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-top: 160px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.3;

    color: ${(props) => props.theme["base-title"]};
  }
`;

export const SubTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 400;

  color ${(props) => props.theme["base-subtitle"]}
  font-family: 'Roboto', sans-serif;
`;

export const Descriptions = styled.div`
  width: 35.5rem;
  display: flex;

  margin-top: 3.75rem;

  gap: 2.5rem;
`;

export const CoffeeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 9rem;

  strong {
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.6;
  }
`;
