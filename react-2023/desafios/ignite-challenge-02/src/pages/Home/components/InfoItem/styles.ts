import styled from "styled-components";

const BACKGROUND_COLOR = {
  yellowDark: "yellow-600",
  yellow: "yellow-500",
  textBase: "base-text",
  purple: "purple-500",
} as const;

interface BackgroundColor {
  backgroundColor: keyof typeof BACKGROUND_COLOR;
}

export const InfoItemContainer = styled.div`
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  display: flex;
  align-items: center;

  span {
    color: ${(props) => props.theme["base-text"]};

    font-size: 1rem;
    font-weight: 400;
    font-family: "Roboto", sans-serif;
  }
`;

export const ChildrenContainer = styled.div<BackgroundColor>`
  display: flex;
  border-radius: 50%;
  padding: 8px;
  background: ${(props) =>
    props.theme[BACKGROUND_COLOR[props.backgroundColor]]};
`;
