import styled from "styled-components";

const Title = styled.h1`
  font-size: ${({ size }) => `${size}px`};
  text-align: center;
  margin: 5px 0;
`;

function AuthTitle({ children, size = 20 }) {
  return <Title size={size}>{children}</Title>;
}

export default AuthTitle;
