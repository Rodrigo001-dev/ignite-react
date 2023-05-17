import styled from "styled-components";

export const SectionTitleContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Text = styled.p`
  color: ${(props) => props.theme[`base-text`]};
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.3;
`;

export const Title = styled.strong`
  color: ${(props) => props.theme[`base-text`]};
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.3;
`;
