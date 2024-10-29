import React, { useContext } from "react";
import * as StyledDOM from "../Login/Login.jsx";
import Vyboglogo from "../../../../assets/image/Vyboglogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LeftSideBanner from "../../../common/LeftSideBanner/LeftSideBanner.jsx";
import { DynamicContext } from "../../../context/DynamicContext.js";
function ForgotPassword() {
  const { setVerifyEmail } = useContext(DynamicContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address."
      )
      .required("Email is required."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Email is", values.email);
      if (values.email) {
        setVerifyEmail(true);
        navigate("/auth/code");
      }
    },
  });

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
            <StyledDOM.StyledVybogLogoForgotPwd
              className="vybog-logo"
              src={Vyboglogo}
            />
            <StyledDOM.StyledCreateAccountHeading className="create-account-heading-text">
              Forgot Password? No Worries!
            </StyledDOM.StyledCreateAccountHeading>
            <StyledDOM.StyledForgotPwdDiv>
              Enter your email to receive your reset code
            </StyledDOM.StyledForgotPwdDiv>
            <StyledDOM.StyledForgotPasswordForm className="create-account-form">
              <StyledDOM.StyledTextInput
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
                required={true}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                errorMessage={formik.errors.email}
                errorClassName="error-message-createaccount"
                className="email-inputField"
                autoComplete="new-password"
              />
              <StyledDOM.StyledButtonContainer className="forgotpassword-button-container">
                <StyledDOM.StyledCancelButton
                  label={"Cancel"}
                  isCancel="true"
                  className="cancel-button"
                  event={() => navigate("/auth/login")}
                />
                <StyledDOM.StyledButtonForgotPwd
                  event={formik.handleSubmit}
                  label={"Request Code"}
                  className="request-code-button"
                />
              </StyledDOM.StyledButtonContainer>
            </StyledDOM.StyledForgotPasswordForm>
          </StyledDOM.StyledRightFormContainer>
        </StyledDOM.StyledCreateAccountRightContainer>
      </StyledDOM.StyledCreateAccountMainContainer>
    </>
  );
}

export default ForgotPassword;
