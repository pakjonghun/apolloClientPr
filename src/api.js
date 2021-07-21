import axios from "axios";

const url = "https://bestclone.herokuapp.com";
const api = axios.create({
  baseURL: url,
  headers: {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImhhbGJlIiwiaWF0IjoxNjI2NTU4MDY0fQ.1VGoOT0fdkFdzw5MqQQMl0hvlA3nSXcK9kg_YPutyyA",
  },
});

const hashtag = "꿀초코";
const keyword = "초";
const select = ["우유", "봉숭아"];
const page = 2;

//아이스크림 검색
// api.post("menu/search", { keyword, page }).then((res) => console.log(res));

//모든 아이스크림 리스트
// api.get(`menu/icecream/?page=${page}`).then((res) => console.log(res));

//제품디테일 페이지
// const title = encodeURIComponent(keyword);
// api.get(`menu/icecream/${title}`).then((res) => console.log(res));

const id = "halbe1";
const password = "123";
const email = "halbe@hal.hal1";
const passwordconfirm = "123";
const nickname = "halbe1";

// 회원가입
// api
//   .post("api/join", { id, password, email, passwordconfirm, nickname })
//   .then((res) => console.log(res));

//로그인
// api.post("api/login", { id, password }).then((res) => console.log(res));

//마이페이지
// api.get("api/mypage").then((res) => console.log(res));

const title = "titldde";
const description = "descripdtion";
//리뷰적기
// api
//   .post("/review/write", { title, description })
//   .then((res) => console.log(res));

const newId = 1;
//리뷰수정하기
// api
//   .put(`review/write/${newId}`, { title, description })
//   .then((res) => console.log(res));

// 리뷰 삭제하기
// api.delete(`review/delete/${newId}`).then((res) => console.log(res));

// 리뷰 디테일 페이지
// api.get(`review/${newId}`).then((res) => console.log(res));

//모든 리뷰 불러오기
// api.get(`review/?page=${page}`).then((res) => console.log(res));
