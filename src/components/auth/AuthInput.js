import { forwardRef } from "react";
import styled from "styled-components";

const InputText = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputColor};
  padding: 7px;
  margin: 9px 0;
  border: 1px solid
    ${({ theme, isValid }) => {
      return isValid ? "red" : theme.borderColor;
    }};

  &:focus {
    border-color: ${({ theme }) => theme.fontColor};
  }
`;
const AuthInput = forwardRef((props, ref) => {
  return (
    <>
      <InputText ref={ref} {...props} />
    </>
  );
});

export default AuthInput;
