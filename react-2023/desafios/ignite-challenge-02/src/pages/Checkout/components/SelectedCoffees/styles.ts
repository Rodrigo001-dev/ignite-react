import styled from "styled-components";

import { SectionBaseStyle } from "../../styles";

export const SelectedCoffeesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 40rem;
`;

export const Title = styled.strong`
  color ${(props) => props.theme["base-subtitle"]};
  font-size: 1.125rem;
  font-weight: 800;
`;

export const Text = styled.span`
  font-size: 1rem;
  font-weight: 400;
  font-family: "Roboto", sans-serif;

  color: ${(props) => props.theme["base-subtitle"]};
`;

export const DetailsContainer = styled(SectionBaseStyle)`
  border-radius: 6px 44px 6px 44px;
  display: flex;
  flex-direction: column;
`;

export const ConfirmationSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
