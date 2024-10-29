import React, { useContext } from "react";
import * as StyledDOM from "../Login/Login.jsx";
import Vyboglogo from "../../../../assets/image/Vyboglogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LeftSideBanner from "../../../common/LeftSideBanner/LeftSideBanner.jsx";
import { DynamicContext } from "../../../context/DynamicContext.js";
import Login from "../../pages/Login/Login.js";
function PasswordCode() {
  const { setVerifyEmail, verifyEmail } = useContext(DynamicContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]+$/, "Verification code must contain only numbers.")
      .min(4, "The verfication code must be contain minimum 4 digits.")
      .max(6, "The verfication code does not exist  more than 6 digits.")
      .required("Code is required."),
  });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Code is", values.code);
      if (values.code) {
        setVerifyEmail(true);
        navigate("/auth/reset");
      }
    },
  });

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
                Please enter the code received in your email!
              </StyledDOM.StyledCreateAccountHeading>
              <StyledDOM.StyledForgotPasswordForm className="create-account-form">
                <StyledDOM.StyledTextInput
                  label="Code"
                  type="text"
                  name="code"
                  placeholder="Code"
                  required={true}
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  onBlur={formik.handleBlur}
                  error={formik.touched.code && formik.errors.code}
                  errorMessage={formik.errors.code}
                />
                <StyledDOM.StyledButtonContainer className="forgotpassword-button-container">
                  <StyledDOM.StyledCancelButton
                    label={"Cancel"}
                    isCancel="true"
                    className="cancel-button"
                    event={() => navigate("/auth/forgot")}
                  />
                  <StyledDOM.StyledButton
                    event={formik.handleSubmit}
                    label={"Validate"}
                    className="Validate-button"
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

export default PasswordCode;
