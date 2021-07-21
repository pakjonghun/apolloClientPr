import React from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/Container";
import routes from "../routes";
import TopBox from "../components/auth/TopBox";
import { BaseBox } from "../components/shared/shared";
import AuthInput from "../components/auth/AuthInput";
import CommonButton from "../components/common/Button";
import BottomBox from "../components/auth/BottomBox";
import Sepator from "../components/common/Sepator";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../components/common/Helmet";
import { useForm } from "react-hook-form";
import FormError from "../components/common/FormError";
import { gql, useMutation } from "@apollo/client";
import { loginActive } from "../apollo";
import { useLocation } from "react-router-dom";

const SocialBox = styled(BaseBox)`
  color: ${({ theme }) => theme.faceBookColor};
  font-weight: 800;

  a:last-child {
    margin: 10px;
    font-weight: 500;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location.state?.username || "",
      password: location.state?.username || "",
    },
  });

  const clearLoginError = () => {
    clearErrors("result");
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { ok, error, token },
      } = data;

      loginActive(token);
      if (!ok) {
        return setError("result", { message: error });
      }
    },
  });

  const onSubmit = (data) => {
    const { username, password } = getValues();
    if (loading) {
      return;
    }
    login({
      variables: {
        email: username,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <Title text={"Login"} />
      <TopBox>
        {location.state?.username && (
          <FormError
            message={`${location.state?.username}님 회원가입 완료!! 로그인 하세요!`}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.username && <FormError message={errors.username.message} />}
          <AuthInput
            {...register("username", {
              required: {
                value: true,
                message: "꼭 적어 넣으셔야 합니다 빈칸 x",
              },
              minLength: {
                value: 5,
                message: "5글자 넘거야 합니다!!",
              },
            })}
            onFocus={clearLoginError}
            isValid={errors.username}
            type="text"
            required={true}
            placeholder="이메일 아이디"
          />

          {errors.password && <FormError message={errors.password.message} />}
          <AuthInput
            {...register("password", {
              required: {
                value: true,
                message: "빈칸안돼!",
              },
              minLength: {
                value: 3,
                message: "3글자이상",
              },
            })}
            onFocus={clearLoginError}
            type="password"
            required
            placeholder="비밀번호"
            isValid={errors?.password}
          />
          <CommonButton
            disabled={!isValid || loading || errors.result}
            text={loading ? "로그인중입니다." : "로그인"}
          />
        </form>
        <FormError message={errors?.result?.message} />

        <Sepator />
        <SocialBox>
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
            <span style={{ marginLeft: "3px" }}>페이스북 로그인</span>
          </a>
          <a href="#">패스워드를 잊어버리셨나요?</a>
        </SocialBox>
      </TopBox>

      <BottomBox
        linkDesc={"계정이 없으세요?"}
        linkRoute={routes.signup}
        linkTitle={"회원가입"}
      />
    </AuthLayout>
  );
};

export default Login;
