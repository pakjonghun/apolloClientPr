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
          message: "???????????? ?????? ????????? ?????????",
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
      message: "???????????????!",
    },
    minLength: {
      value: 3,
      message: "3?????? ???????????????!",
    },
  };

  return (
    <AuthLayout>
      <Title text={"SignUp"} />
      <TopBox>
        <AuthTitle size={17}>
          <span>???????????? ????????? ???????????? ????????? ???????????????.</span>
          <CommonButton
            text={
              <>
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  style={{ marginRight: "5px" }}
                />
                <span>FaceBook ?????? ????????? </span>
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
            placeholder="??????????????? ?????? ????????? ??????"
          />
          <FormError message={errors?.firstname?.message} />
          <AuthInput
            {...register("firstname", validate)}
            onFocus={() => clearErrors("result")}
            placeholder="??????"
            isValid={errors?.firstname}
          />
          <FormError message={errors?.username?.message} />
          <AuthInput
            {...register("username", validate)}
            onFocus={() => clearErrors("result")}
            placeholder="????????? ??????"
            isValid={errors?.username}
          />
          <FormError message={errors?.password?.message} />
          <AuthInput
            {...register("password", validate)}
            onFocus={() => clearErrors("result")}
            placeholder="????????????"
            isValid={errors?.password}
          />
          <CommonButton
            disabled={Object.keys(errors).length || loading}
            text={"??????"}
          />
        </form>
      </TopBox>

      <BottomBox
        linkTitle={"?????????"}
        linkDesc={"????????? ?????????????"}
        linkRoute={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;
