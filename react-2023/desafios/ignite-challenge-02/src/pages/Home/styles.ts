import styled from "styled-components";

export const HomeContainer = styled.main`
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

    color: ${(props) => props.theme["base-title"]};
  }
`;

export const SubTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 400;

  color ${(props) => props.theme["base-subtitle"]}
  font-family: 'Roboto', sans-serif;
`;
