import React, { useContext } from "react";
import * as StyledDOM from "../Login/Login.jsx";
import Vyboglogo from "../../../../assets/image/Vyboglogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LeftSideBanner from "../../../common/LeftSideBanner/LeftSideBanner.jsx";
import { DynamicContext } from "../../../context/DynamicContext.js";
import CreateAccount from "./CreateAccount.js";
function VerifyEmail() {
  const navigate = useNavigate();
  const { setCreateAccount, createAccount } = useContext(DynamicContext);
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]+$/, "Verification code must contain only numbers.")
      .min(4, "The verification code must be contain minimum 4 digits.")
      .max(6, "The verification code does not exist more than 6 digits.")
      .required("Code is required."),
  });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.code) {
        navigate("/auth/login");
        setCreateAccount(false);
      }
    },
  });
  const handleCancel = () => {
    navigate("/auth/register");
  };

  return (
    <>
      {createAccount ? (
        <StyledDOM.StyledCreateAccountMainContainer className="create-account-main-container">
          <LeftSideBanner
            normalContentText="You're just"
            boldContentText="one step away!"
            downContentText="Simply validate the code sent to your email to unleash our tool's power and supercharge your recuirment process !"
          />
          <StyledDOM.StyledCreateAccountRightContainer className="create-account-right-container">
            <StyledDOM.StyledRightFormContainer className="create-account-form-container">
              <StyledDOM.StyledVybogLogoForgotPwd
                className="vybog-logo"
                src={Vyboglogo}
              />
              <StyledDOM.StyledVerifyEmailHeading className="Verify-email-heading-text">
                Verify your email
              </StyledDOM.StyledVerifyEmailHeading>
              <StyledDOM.StyledForgotPasswordForm className="create-account-form">
                <StyledDOM.StyledForgotPwdDiv>
                  Please enter the code you received in your email
                </StyledDOM.StyledForgotPwdDiv>
                <StyledDOM.StyledTextInput
                  type="text"
                  name="code"
                  label="Code"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  onBlur={formik.handleBlur}
                  error={formik.touched.code && formik.errors.code}
                  errorMessage={formik.errors.code}
                  placeholder="Code"
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
                    label={"Verify Code"}
                    className="Validate-button"
                  />
                </StyledDOM.StyledButtonContainer>
              </StyledDOM.StyledForgotPasswordForm>
            </StyledDOM.StyledRightFormContainer>
          </StyledDOM.StyledCreateAccountRightContainer>
        </StyledDOM.StyledCreateAccountMainContainer>
      ) : (
        <CreateAccount />
      )}
    </>
  );
}

export default VerifyEmail;
