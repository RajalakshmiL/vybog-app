import React, { useState, useContext } from "react";
import * as StyledDOM from "./CreateAccount.jsx";
import Vyboglogo from "../../../../assets/image/Vyboglogo.svg";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LeftSideBanner from "../../../common/LeftSideBanner/LeftSideBanner.jsx";
import PhoneNumberInput from "../../../common/PhoneNumberInput/PhoneNumberInput.jsx";
import {
  phoneNumberValidation,
  scrollToErrorField,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { DynamicContext } from "../../../context/DynamicContext.js";
function CreateAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setCreateAccount } = useContext(DynamicContext);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for first name."),
    lastName: Yup.string()
      .required("Last name is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for last name.")
      .test(
        "not-equal",
        "First name and last name cannot be the same.",
        // function (value) {
        //   return (
        //     value?.trim().toLowerCase() !==
        //     this.parent.firstName?.trim().toLowerCase()
        //   );
        // }
        function (value) {
          return (
            value?.replace(/\s+/g, "").trim().toLowerCase() !==
            this.parent.firstName?.replace(/\s+/g, "").trim().toLowerCase()
          );
        }
      ),
    contact: Yup.string().required("Contact number is required."),
    // .transform((value) => value?.trim())
    // .matches(
    //   /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
    //   "Invalid phone number format."
    // )

    // .min(6, "Contact number must be atleast 6 digits.")
    // .max(20, "Contact number must not be over 20 digits."),

    email: Yup.string()
      .email("Invalid email address.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address."
      )
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special character."
      )
      .max(15, "Password must not exceed 15 characters."),
    domain: Yup.string()
      // .required("Domain / industry is required.")
      .matches(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed in Domain/ industry"
      ),
    company: Yup.string()
      .trim()
      .required("Company name is required.")
      .min(3, "Company name must be at least 3 characters long.")
      .max(75, "Company name must not exceed 75 characters.")
      .matches(/^[a-zA-Z0-9\s\-./]+$/, "Company name must be valid."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      password: "",
      company: "",
      domain: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Create Account", handleCustomTrim(values));
      setCreateAccount(true);
      navigate("/auth/register-code");
    },
  });
  const handlePhoneInputChange = React.useCallback(
    (phone, country) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("contact", phone);
      formik.setFieldTouched("contact", true, false);
      formik.validateField("contact");
    },
    [formik]
  );
  const EyeIconToggle = () => {
    setShowPassword(!showPassword);
  };
  console.log("phone number", formik.values.contact);
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
              Get Started Now
            </StyledDOM.StyledCreateAccountHeading>
            <StyledDOM.StyledCreateAccountForm className="create-account-form">
              <StyledDOM.StyledNameInput className="name-textfields">
                <StyledDOM.StyledTextInput
                  type="text"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && formik.errors.firstName}
                  errorMessage={formik.errors.firstName}
                  errorClassName="error-message-createaccount"
                  className="firstName-inputField"
                  autoComplete="new-password"
                  required={true}
                />
                <StyledDOM.StyledTextInput
                  type="text"
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && formik.errors.lastName}
                  errorMessage={formik.errors.lastName}
                  errorClassName="error-message-createaccount"
                  className="lastName-inputField"
                  autoComplete="new-password"
                  required={true}
                />
              </StyledDOM.StyledNameInput>
              <PhoneNumberInput
                value={formik.values.contact}
                onChange={handlePhoneInputChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && formik.errors.contact}
                touched={formik.touched.contact}
                placeholder="Contact Number"
                width="100%"
                height="40px"
                marginBottom="30px"
                countryListWidth="475px"
                label="Contact Number"
                required={true}
                backgroundColor="white"
                labelColor="black"
                phoneContainerStyle={{ marginBottom: "25px" }}
              />
              {/* <StyledDOM.StyledTextInput
                type="text"
                name="contact"
                id="contact"
                label="Contact Number"
                placeholder="Contact Number"
                onChange={formik.handleChange}
                value={formik.values.contact}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && formik.errors.contact}
                errorMessage={formik.errors.contact}
                errorClassName="error-message-createaccount"
                className="contact-inputField"
                autoComplete="new-password"
              /> */}
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
                required={true}
              />
              <StyledDOM.StyledTextInput
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                label="Password"
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
                required={true}
              />
              <StyledDOM.StyledTextInput
                type="text"
                name="company"
                id="company"
                label="Company"
                placeholder="Company"
                onChange={formik.handleChange}
                value={formik.values.company}
                onBlur={formik.handleBlur}
                error={formik.touched.company && formik.errors.company}
                errorMessage={formik.errors.company}
                autoComplete="new-password"
                className="Company-inputfield"
                required={true}
              />
              <StyledDOM.StyledTextInput
                type="text"
                name="domain"
                id="domain"
                label="Domain / Industry"
                placeholder="Domain / Industry"
                onChange={formik.handleChange}
                value={formik.values.domain}
                onBlur={formik.handleBlur}
                // error={formik.touched.domain && formik.errors.domain}
                // errorMessage={formik.errors.domain}
                autoComplete="new-password"
                className="domain-inputfield"
              />
              <StyledDOM.StyledTermsContainer className="terms-container">
                <DynamicCheckbox
                  name="terms"
                  id="terms"
                  label="I agree to the"
                  checked={formik.values.terms}
                  onChange={() =>
                    formik.setFieldValue(`terms`, !formik.values.terms)
                  }
                  className="terms-checkbox"
                  containerStyle={{ position: "relative", top: "5px" }}
                />
                <StyledDOM.StyledSpanTag className="terms-span">
                  Terms & Policy
                </StyledDOM.StyledSpanTag>
              </StyledDOM.StyledTermsContainer>
              {formik.touched.terms && formik.errors.terms && (
                <StyledDOM.StyledErrorMessage>
                  <StyledDOM.StyledCheckboxErrorMessage>
                    {formik.errors.terms}
                  </StyledDOM.StyledCheckboxErrorMessage>
                </StyledDOM.StyledErrorMessage>
              )}
              <StyledDOM.StyledButtonContainer className="createaccount-button-container">
                <StyledDOM.StyledCancelButton
                  label={"Cancel"}
                  isCancel="true"
                  className="cancel-button"
                  event={() => navigate("/auth/login")}
                />
                <StyledDOM.StyledButton
                  event={() => {
                    if (formik && Object.keys(formik.errors).length > 0) {
                      scrollToErrorField(formik);
                    }
                    formik.handleSubmit();
                  }}
                  label={"Create Account"}
                  className="create-account-button"
                />
              </StyledDOM.StyledButtonContainer>
            </StyledDOM.StyledCreateAccountForm>
          </StyledDOM.StyledRightFormContainer>
        </StyledDOM.StyledCreateAccountRightContainer>
      </StyledDOM.StyledCreateAccountMainContainer>
    </>
  );
}

export default CreateAccount;
