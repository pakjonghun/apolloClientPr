import { gql, useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthTitle from "../components/auth/AuthTitle";
import BottomBox from "../components/auth/BottomBox";
import AuthLayout from "../components/auth/Container";
import TopBox from "../components/auth/TopBox";
import CommonButton from "../components/common/Button";
import FormError from "../components/common/FormError";
import Title from "../components/common/Helmet";
import Seprator from "../components/common/Sepator";
import routes from "../routes";

const CREATE_ACCOUNT = gql`
  mutation CreateAccountMutation(
    $createAccountUserName: String!
    $createAccountLastName: String!
    $createAccountFirstName: String!
    $createAccountEmail: String!
    $createAccountPassword: String!
    $createAccountBio: String
  ) {
    createAccount(
      userName: $createAccountUserName
      lastName: $createAccountLastName
      firstName: $createAccountFirstName
      email: $createAccountEmail
      password: $createAccountPassword
      bio: $createAccountBio
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const getData = (data) => {
    if (loading) {
      return;
    }

    const { email, password, username, firstname } = getValues();
    func({
      variables: {
        createAccountUserName: username,
        createAccountLastName: username,
        createAccountFirstName: firstname,
        createAccountEmail: email,
        createAccountPassword: password,
        createAccountBio: username,
      },
    });
  };

  const history = useHistory();

  const [func, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: ({ createAccount }) => {
      const { ok, error } = createAccount;
      const { password, username } = getValues();
      if (ok) {
        history.push(routes.home, {
          message: "회원가입 완료 로그인 하세요",
          username,
          password,
        });
      } else {
        setError("result", { message: error, username, password });
        return alert(error);
      }
    },
  });

  const validate = {
    required: {
      value: true,
      message: "빈칸안되요!",
    },
    minLength: {
      value: 3,
      message: "3글자 이상이에요!",
    },
  };

  return (
    <AuthLayout>
      <Title text={"SignUp"} />
      <TopBox>
        <AuthTitle size={17}>
          <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
          <CommonButton
            text={
              <>
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  style={{ marginRight: "5px" }}
                />
                <span>FaceBook 으로 로그인 </span>
              </>
            }
          />
        </AuthTitle>
        <Seprator />

        <form onSubmit={handleSubmit(getData)}>
          <FormError message={errors?.email?.message} />
          <AuthInput
            {...register("email", validate)}
            onFocus={() => clearErrors("result")}
            isValid={errors?.email}
            placeholder="휴대폰번호 또는 이메일 주소"
          />
          <FormError message={errors?.firstname?.message} />
          <AuthInput
            {...register("firstname", validate)}
            onFocus={() => clearErrors("result")}
            placeholder="성명"
            isValid={errors?.firstname}
          />
          <FormError message={errors?.username?.message} />
          <AuthInput
            {...register("username", validate)}
            onFocus={() => clearErrors("result")}
            placeholder="사용자 이름"
            isValid={errors?.username}
          />
          <FormError message={errors?.password?.message} />
          <AuthInput
            {...register("password", validate)}
            onFocus={() => clearErrors("result")}
            placeholder="비밀번호"
            isValid={errors?.password}
          />
          <CommonButton
            disabled={Object.keys(errors).length || loading}
            text={"가입"}
          />
        </form>
      </TopBox>

      <BottomBox
        linkTitle={"로그인"}
        linkDesc={"계정이 있으세요?"}
        linkRoute={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;
