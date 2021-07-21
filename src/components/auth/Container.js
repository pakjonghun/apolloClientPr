import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar } from "../../apollo";
import { BaseBox } from "../shared/shared";

const Container = styled(BaseBox)`
  height: 100vh;
`;

const Wrapper = styled(BaseBox)`
  width: 350px;
  height: 450px;
`;

const ModeContainer = styled.div`
  cursor: pointer;
  margin: 10px;
`;

const DarkIcon = styled.span``;

function AuthLayout({ children }) {
  const dark = useReactiveVar(darkModeVar);

  const changeMode = () => {
    localStorage.setItem("dark", !dark);
    darkModeVar(!dark);
  };

  return (
    <Container>
      <ModeContainer>
        <DarkIcon>
          <FontAwesomeIcon onClick={changeMode} icon={dark ? faMoon : faSun} />
        </DarkIcon>
      </ModeContainer>

      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default AuthLayout;
