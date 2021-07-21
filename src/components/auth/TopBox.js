import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { BaseBox } from "../shared/shared";
import AuthTitle from "./AuthTitle";

const Container = styled(BaseBox)`
  justify-content: space-around;
  padding: 5ex;
  height: 500px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
  background-color: white;
`;

function TopBox({ children }) {
  return (
    <Container>
      <AuthTitle>
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </AuthTitle>
      {children}
    </Container>
  );
}

export default TopBox;
