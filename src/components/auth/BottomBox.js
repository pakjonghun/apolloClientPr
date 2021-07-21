import styled from "styled-components";
import { BaseBox } from "../shared/shared";
import { Link } from "react-router-dom";

const Container = styled(BaseBox)`
  padding: 10px 0;
  margin-top: 20px;
  width: 100%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  flex-direction: row;
  height: 61px;

  a {
    color: ${({ theme }) => theme.buttonColor};
    margin-left: 5px;
  }
`;

function BottomBox({ linkDesc, linkRoute, linkTitle }) {
  return (
    <Container>
      <span>{linkDesc}</span>
      <Link to={linkRoute}>{linkTitle}</Link>
    </Container>
  );
}

export default BottomBox;
