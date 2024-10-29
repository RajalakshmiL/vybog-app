import React, { useState, useContext } from "react";
import * as StyledDOM from "../Login/Login.jsx";
import Vyboglogo from "../../../../assets/image/Vyboglogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LeftSideBanner from "../../../common/LeftSideBanner/LeftSideBanner.jsx";
import { DynamicContext } from "../../../context/DynamicContext.js";
import Login from "../Login/Login.js";
function ResetPassword() {
  const { verifyEmail } = useContext(DynamicContext);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("New password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special character."
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Password must match with New Password."
      )
      .required("Confirm password is required."),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("the new password is", values);
      navigate("/auth/login");
    },
  });

  const handleCancel = () => {
    navigate("/auth/code");
  };

  const EyeIconToggle = () => {
    setShowPassword(!showPassword);
  };

  const EyeIconConfirmToggle = () => {
    setConfirmPassword(!confirmPassword);
  };

  return (
    <>
      {verifyEmail ? (
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
                Reset Password
              </StyledDOM.StyledCreateAccountHeading>
              <StyledDOM.StyledForgotPasswordForm className="create-account-form">
                <StyledDOM.StyledTextInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="newPassword"
                  placeholder="New Password"
                  label="New Password"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && formik.errors.password}
                  errorMessage={formik.errors.password}
                  autoComplete="new-password"
                  passWordIcon={true}
                  open={showPassword}
                  eyeicontoggle={EyeIconToggle}
                  eyetoggleclassname="reset-eyetoggle"
                />
                <StyledDOM.StyledTextInput
                  type={confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  errorMessage={formik.errors.confirmPassword}
                  autoComplete="new-password"
                  passWordIcon={true}
                  open={confirmPassword}
                  eyeicontoggle={EyeIconConfirmToggle}
                  eyetoggleclassname="reset-eyetoggle"
                />
                <StyledDOM.StyledButtonContainer className="forgotpassword-button-container">
                  <StyledDOM.StyledCancelButton
                    label={"Cancel"}
                    isCancel="true"
                    className="cancel-button"
                    event={handleCancel}
                  />
                  <StyledDOM.StyledButton
                    event={formik.handleSubmit}
                    label={"Request Code"}
                    className="request-code-button"
                  />
                </StyledDOM.StyledButtonContainer>
              </StyledDOM.StyledForgotPasswordForm>
            </StyledDOM.StyledRightFormContainer>
          </StyledDOM.StyledCreateAccountRightContainer>
        </StyledDOM.StyledCreateAccountMainContainer>
      ) : (
        <Login />
      )}
    </>
  );
}

export default ResetPassword;
