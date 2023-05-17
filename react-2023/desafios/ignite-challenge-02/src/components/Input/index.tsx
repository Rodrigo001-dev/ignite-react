import { forwardRef, InputHTMLAttributes } from "react";

import {
  InputWrapper,
  InputStyleContainer,
  InputStyled,
  RightText,
} from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  rightText?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ rightText, className, ...props }, ref) => {
    return (
      <InputWrapper>
        <InputStyleContainer>
          <InputStyled ref={ref} {...props} />
          {rightText && <RightText>{rightText}</RightText>}
        </InputStyleContainer>
      </InputWrapper>
    );
  }
);
