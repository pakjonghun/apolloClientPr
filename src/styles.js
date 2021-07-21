import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const ligthTheme = {
  bgColor: "#FAFAFA",
  fontColor: "gray",
  inputColor: "#E8F0FE",
  buttonColor: "#0095F6",
  activeColor: "#4CB5F9",
  faceBookColor: "#385185",
  borderColor: "rgb(219 ,219 ,219)",
};
export const darkTheme = {
  bgColor: "gray",
  fontColor: "lightgray",
  inputColor: "#E8F0FE",
  buttonColor: "#0095F6",
  activeColor: "#4CB5F9",
  faceBookColor: "#385185",
  borderColor: "ligthgray",
};

export const GlobalStyle = createGlobalStyle`
${reset}

*{
  box-sizing: border-box;
}

a{
  text-decoration: none;
  color:inherit;
}

a:active{
  opacity:.8
}

input{
  all:unset;

}

body{
  font-size: 14px;

  background-color: ${({ theme }) => theme.bgColor};
  color:${({ theme }) => theme.fontColor}
  
}


`;
