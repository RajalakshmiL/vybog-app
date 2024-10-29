import React, { useState } from "react";
import * as StyledDOM from "./Login.jsx";
import Vyboglogo from "../../../../assets/image/Vyboglogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../../common/common.css";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar.js";
import LeftSideBanner from "../../../common/LeftSideBanner/LeftSideBanner.jsx";
import // LOGIN_URL,
  // RESUME_PARSER_BASE_URL,
  "../../../../helper/url_helper.js";
// import { post } from "../../../../helper/Api_helper.js";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address."
      )
      .required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  const handleCreateUser = () => {
    navigate("/auth/register");
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // post(RESUME_PARSER_BASE_URL, LOGIN_URL, {
      //   email: formik.values.email,
      //   password: formik.values.password,
      // })
      //   .then((response) => {
      //     const { access_token } = response;
      //     localStorage.setItem("token", access_token);
      //     console.log("LOGIN_SUCCESS_RESPONSE >>>>", response);
      //     navigate("/candidates");
      //   })
      //   .catch((res_error) => {
      //     const { response = {} } = res_error || {};
      //     const { data = {} } = response || {};
      //     const { error = "" } = data || {};
      //     console.log("LOGIN_ERROR_RESPONSE >>>>", error);
      //     Toast("error", "Invalid Crendetial.", { toastId: "error" });
      //   });

      if (
        values.email === "vybog@gmail.com" &&
        values.password === "Vybog@2024"
      ) {
        localStorage.setItem("temporaryToken", values.email);
        navigate("/candidates");

        console.log("Form data onsubmit", values);
        Toast("success", "Login successfully");
      } else {
        Toast("error", "Invalid credential");
      }
    },
  });

  const EyeIconToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <StyledDOM.StyledCreateAccountMainContainer className="create-account-main-container">
        <LeftSideBanner
          normalContentText="Unlock your"
          boldContentText="recruitment potential!"
          downContentText="Sign up today and streamline your hiring process effortlessly."
        />
        <StyledDOM.StyledCreateAccountRightContainer className="create-account-right-container">
          <StyledDOM.StyledRightFormContainer className="create-account-form-container">
            <StyledDOM.StyledVybogLogo className="vybog-logo" src={Vyboglogo} />
            <StyledDOM.StyledCreateAccountHeading className="create-account-heading-text">
              Welcome! Sign in to continue to Vybog
            </StyledDOM.StyledCreateAccountHeading>
            <StyledDOM.StyledCreateAccountForm
              className="create-account-form"
              onSubmit={formik.handleSubmit}
            >
              <StyledDOM.StyledTextInput
                type="text"
                name="email"
                id="email"
                label="Email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                errorMessage={formik.errors.email}
                errorClassName="error-message-createaccount"
                className="email-inputField"
                autoComplete="new-password"
                required={true}
              />
              <StyledDOM.StyledTextInput
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                id="Password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                errorMessage={formik.errors.password}
                autoComplete="new-password"
                className="password-inputfield"
                passWordIcon={true}
                open={showPassword}
                eyeicontoggle={EyeIconToggle}
                eyetoggleclassname="login-eyetoggle"
                required={true}
              />
              <StyledDOM.StyledForgotPassworddiv onClick={handleForgotPassword}>
                Forgot Password?
              </StyledDOM.StyledForgotPassworddiv>
              <StyledDOM.StyledButton
                type="submit"
                label={"Sign in"}
                className="create-account-button"
                style={{ marginTop: "30px" }}
              />
              <StyledDOM.StyleTroubleLoggingdiv onClick={handleCreateUser}>
                Trouble logging?
              </StyledDOM.StyleTroubleLoggingdiv>
              <StyledDOM.StyledUser>
                New to Vybog?
                <StyledDOM.StyledNewUserSpan onClick={handleCreateUser}>
                  Create User
                </StyledDOM.StyledNewUserSpan>
              </StyledDOM.StyledUser>
            </StyledDOM.StyledCreateAccountForm>
          </StyledDOM.StyledRightFormContainer>
        </StyledDOM.StyledCreateAccountRightContainer>
      </StyledDOM.StyledCreateAccountMainContainer>
    </>
  );
}

export default Login;
