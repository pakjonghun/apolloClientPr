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
            message={`${location.state?.username}??? ???????????? ??????!! ????????? ?????????!`}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.username && <FormError message={errors.username.message} />}
          <AuthInput
            {...register("username", {
              required: {
                value: true,
                message: "??? ?????? ???????????? ????????? ?????? x",
              },
              minLength: {
                value: 5,
                message: "5?????? ????????? ?????????!!",
              },
            })}
            onFocus={clearLoginError}
            isValid={errors.username}
            type="text"
            required={true}
            placeholder="????????? ?????????"
          />

          {errors.password && <FormError message={errors.password.message} />}
          <AuthInput
            {...register("password", {
              required: {
                value: true,
                message: "????????????!",
              },
              minLength: {
                value: 3,
                message: "3????????????",
              },
            })}
            onFocus={clearLoginError}
            type="password"
            required
            placeholder="????????????"
            isValid={errors?.password}
          />
          <CommonButton
            disabled={!isValid || loading || errors.result}
            text={loading ? "?????????????????????." : "?????????"}
          />
        </form>
        <FormError message={errors?.result?.message} />

        <Sepator />
        <SocialBox>
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
            <span style={{ marginLeft: "3px" }}>???????????? ?????????</span>
          </a>
          <a href="#">??????????????? ??????????????????????</a>
        </SocialBox>
      </TopBox>

      <BottomBox
        linkDesc={"????????? ?????????????"}
        linkRoute={routes.signup}
        linkTitle={"????????????"}
      />
    </AuthLayout>
  );
};

export default Login;
