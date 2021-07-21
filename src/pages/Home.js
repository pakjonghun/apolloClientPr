import React from "react";
import { useHistory } from "react-router-dom";
import { darkModeVar, logoutActive } from "../apollo";

const Home = () => {
  const history = useHistory();
  return (
    <>
      <h1>로그아웃</h1>
      <button onClick={() => darkModeVar(true)}>다크모드</button>
      <button onClick={() => darkModeVar(false)}>라이트모드</button>
      <button onClick={() => logoutActive(history)}>로그아웃</button>
    </>
  );
};

export default Home;
