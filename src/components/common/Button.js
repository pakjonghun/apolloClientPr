import styled from "styled-components";

const Button = styled.button`
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  text-align: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ theme }) => theme.buttonColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 7px;

  &:active {
    background-color: ${({ theme }) => theme.activeColor};
  }
`;

function CommonButton({ text, disabled }) {
  return <Button disabled={disabled}>{text}</Button>;
}
export default CommonButton;
