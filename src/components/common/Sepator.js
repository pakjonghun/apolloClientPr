import styled from "styled-components";
import { BaseBox } from "../shared/shared";

const OR = styled(BaseBox)`
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-around;
  width: 100%;
  span {
    margin: 5px;
  }
  div {
    width: 100%;
    height: 1px;
    background-color: lightgray;
  }
`;

function Sepator() {
  return (
    <OR>
      <div></div>
      <span>OR</span>
      <div></div>
    </OR>
  );
}

export default Sepator;
