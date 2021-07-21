import styled from "styled-components";

const Message = styled.span`
  margin: 1px;
  color: red;
`;

const FormError = ({ message }) => <Message>{message}</Message>;

export default FormError;
