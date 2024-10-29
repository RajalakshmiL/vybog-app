import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as StyledDOM from "./BasicInfoPage.jsx";
import NormalRadio from "../../../common/RadioButton/RadioButton";
import Button from "../../../common/Button/Button.js";
import PhoneNumberInput from "../../../common/PhoneNumberInput/PhoneNumberInput.jsx";
import CustomDatePicker from "../../../common/DatePicker/DatePicker";
import {
  phoneNumberValidation,
  useFocusFirstInput,
  scrollToErrorField,
  calculateAge,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { DynamicContext } from "../../../context/DynamicContext.js";
const BasicInfoSchema = Yup.object()
  .shape({
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
        //   const { firstName } = this.parent;
        //   if (firstName) {
        //     return value.toLowerCase() !== firstName.toLowerCase();
        //   }
        //   return true;
        // }
        function (value) {
          return (
            value?.replace(/\s+/g, "").trim().toLowerCase() !==
            this.parent.firstName?.replace(/\s+/g, "").trim().toLowerCase()
          );
        }
      ),
    email: Yup.string()
      .email("Invalid email address.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address."
      )
      .nullable(),
    mobile: Yup.string()
      //   .transform((value) => value?.trim())
      //   .matches(
      //     /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
      //     "Invalid phone number format."
      //   )

      //   .min(6, "Contact number must be atleast 6 digits.")
      //   .max(20, "Contact number must not be over 20 digits.")
      .test(
        "mobile-or-email",
        "Either email or mobile number is required.",
        function (value) {
          const { email } = this.parent;
          return value || email;
        }
      ),
    secondaryMobile: Yup.string()
      // .transform((value) => value?.trim())
      // .matches(
      //   /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
      //   "Invalid phone number format."
      // )

      // .min(6, "Contact number must be atleast 6 digits.")
      // .max(20, "Contact number must not be over 20 digits.")
      .test(
        "mobile number not same",
        "Phone and secondary phone cannot be the same.",
        function (value) {
          const { mobile } = this.parent;

          if (value && mobile) {
            return value !== mobile;
          }
          return true;
        }
      ),
    secondaryEmail: Yup.string()
      .email("Invalid email address.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address."
      )
      .test(
        "emails-not-same",
        "Primary and secondary emails cannot be the same.",
        function (value) {
          const { email } = this.parent;

          if (value && email) {
            return value !== email;
          }
          return true;
        }
      )
      .nullable(),
    fax: Yup.string()
      .matches(
        /^\+\d{1,3}[\s.-]?(\(\d{1,4}\)|\d{1,4})[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/,
        "Invalid fax number."
      )
      .nullable(),
    gender: Yup.string().nullable(),
    age: Yup.number()
      .positive("Age must be a positive number.")
      .integer("Age must be an integer.")
      .min(1, "Age cannot be less than 1.")
      .max(150, "Age cannot be greater than 150.")
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
  })
  .test(
    "email-or-mobile",
    "Either email or mobile number is required.",
    function (values) {
      const { email, mobile } = values;
      if (!email && !mobile) {
        return this.createError({
          path: "mobile",
          message: "Either email or mobile number is required.",
        });
      }
      return true;
    }
  );

function BasicInfoPage(props) {
  const { candidateDetails, setCandidateDetails, activeTab, setActiveTab } =
    useContext(DynamicContext);
  const { setIsfilled, setFillingPercentages } = props || {};
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      secondaryEmail: "",
      mobile: "",
      secondaryMobile: "",
      fax: "",
      website: "",
      gender: "",
      age: "",
      dob: "",
    },
    validationSchema: BasicInfoSchema,
    onSubmit: (values) => {
      // console.log(values);
      const trimmedValues = handleCustomTrim(values);
      console.log("trimmed values", trimmedValues);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({ ...prev, basicInfo: percentage }));
      setCandidateDetails([...candidateDetails, trimmedValues]);
      setIsfilled(true);
      setActiveTab(activeTab + 1);
      formik.resetForm();
    },
  });
  const handlePhoneInputChange = React.useCallback(
    (phone) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("mobile", phone);
      formik.setFieldTouched("mobile", true, false);
      formik.validateField("mobile");
    },
    [formik]
  );
  const handleSecondaryPhoneInputChange = React.useCallback(
    (phone) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("secondaryMobile", phone);
      formik.setFieldTouched("secondaryMobile", true, false);
      formik.validateField("secondaryMobile");
    },
    [formik]
  );
  const calculateFillingPercentage = () => {
    const filledFields = Object.values(formik.values).filter(Boolean).length;
    const totalFields = Object.keys(formik.values).length;
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };
  useFocusFirstInput();
  return (
    <>
      <StyledDOM.StyledBasicInfoContainer className="basic-info-container">
        <StyledDOM.StyledBasicInfoSubhead>
          Personal Info
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <StyledDOM.StyledTextInput
            type="text"
            label="First Name"
            placeholder="First Name"
            // containerStyle={{ marginBottom: "0px" }}
            name="firstName"
            error={formik.errors.firstName}
            errorClassName="error-message"
            errorMessage={
              formik.errors.firstName &&
              formik.touched.firstName &&
              formik.errors.firstName
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            required={true}
            containerStyle={{ marginBottom: "15px" }}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Last Name"
            placeholder="Last Name"
            // containerStyle={{ marginBottom: "0px" }}
            name="lastName"
            error={formik.errors.lastName}
            errorClassName="error-message"
            errorMessage={
              formik.errors.lastName &&
              formik.touched.lastName &&
              formik.errors.lastName
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            required={true}
          />
          <StyledDOM.StyledGenderContainer className="gender-container">
            <StyledDOM.StyledGenderLabel className="gender-label">
              Gender
            </StyledDOM.StyledGenderLabel>
            <StyledDOM.StyledRadioContainer className="radio-container">
              <NormalRadio
                label="Male"
                id="male"
                value="male"
                onChange={(value) => formik.setFieldValue("gender", value)}
                checked={formik.values.gender === "male"}
              />
              <NormalRadio
                label="Female"
                id="female"
                value="female"
                onChange={(value) => formik.setFieldValue("gender", value)}
                checked={formik.values.gender === "female"}
              />
            </StyledDOM.StyledRadioContainer>
            {formik.errors.gender &&
              formik.touched.gender &&
              formik.errors.gender && (
                <StyledDOM.StyledErrorMessage>
                  {formik.errors.gender}
                </StyledDOM.StyledErrorMessage>
              )}
          </StyledDOM.StyledGenderContainer>
          <StyledDOM.StyledAgeContainer>
            <CustomDatePicker
              label="Date of Birth"
              dateFormat="dd/MM/yyyy"
              labelColor="black"
              divStyle={{ width: "100%", marginBottom: "0px" }}
              form={formik}
              placeholder="Date of Birth"
              field={{
                name: "dob",
                value: formik.values.dob,
                onChange: (e) => {
                  const dob = e.target.value;
                  formik.setFieldValue("dob", dob);
                  const newAge = calculateAge(dob);
                  if (formik.values.age !== newAge) {
                    formik.setFieldValue("age", newAge);
                  }
                },
                onBlur: () => {
                  formik.setFieldTouched("dob", true);
                },
              }}
            />
            <StyledDOM.StyledAge
              type="number"
              label="Age"
              placeholder="Age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.age}
              errorClassName="error-message"
              errorMessage={
                formik.errors.age && formik.touched.age && formik.errors.age
              }
            ></StyledDOM.StyledAge>
          </StyledDOM.StyledAgeContainer>
        </StyledDOM.StyledBasicInfoFirstContainer>
        <StyledDOM.StyledHorizontalRuler />
        <StyledDOM.StyledBasicInfoSubhead>
          Contact Info
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <StyledDOM.StyledTextInput
            type="email"
            label="Email"
            placeholder="Email"
            // containerStyle={{ marginBottom: "0px" }}
            name="email"
            error={formik.errors.email}
            errorClassName="error-message"
            errorMessage={
              formik.errors.email && formik.touched.email && formik.errors.email
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required={true}
          />
          <StyledDOM.StyledTextInput
            type="email"
            label="Secondary Email"
            // containerStyle={{ marginBottom: "0px" }}
            placeholder="Secondary Email"
            name="secondaryEmail"
            error={formik.errors.secondaryEmail}
            errorClassName="error-message"
            errorMessage={
              formik.errors.secondaryEmail &&
              formik.touched.secondaryEmail &&
              formik.errors.secondaryEmail
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.secondaryEmail}
          />
          {/* <StyledDOM.StyledTextInput
            type="text"
            label="Phone"
            placeholder="Phone"
            name="mobile"
            error={formik.errors.mobile}
            errorClassName="error-message"
            errorMessage={
              formik.errors.mobile &&
              formik.touched.mobile &&
              formik.errors.mobile
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          /> */}
          {/* <StyledDOM.StyledTextInput
            type="text"
            label="Secondary Phone"
            placeholder="Secondary Phone"
            name="secondaryMobile"
            error={formik.errors.secondaryMobile}
            errorClassName="error-message"
            errorMessage={
              formik.errors.secondaryMobile &&
              formik.touched.secondaryMobile &&
              formik.errors.secondaryMobile
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.secondaryMobile}
          /> */}
          <PhoneNumberInput
            value={formik.values.mobile}
            onChange={handlePhoneInputChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mobile}
            touched={formik.touched.mobile}
            placeholder="Mobile Number"
            label="Mobile Number"
            width="100%"
            height="40px"
            marginBottom="30px"
            countryListWidth="400px"
            phoneContainerStyle={{ marginBottom: "25px" }}
          />
          <PhoneNumberInput
            value={formik.values.secondaryMobile}
            onChange={handleSecondaryPhoneInputChange}
            onBlur={formik.handleBlur}
            error={formik.errors.secondaryMobile}
            touched={formik.touched.secondaryMobile}
            placeholder="Secondary Mobile"
            width="100%"
            height="40px"
            label="Secondary Mobile"
            marginBottom="30px"
            countryListWidth="400px"
            phoneContainerStyle={{ marginBottom: "25px" }}
          />
          <StyledDOM.StyledTextInput
            type="text"
            placeholder="Fax"
            // containerStyle={{ marginBottom: "0px" }}
            label="Fax"
            name="fax"
            error={formik.errors.fax}
            errorClassName="error-message"
            errorMessage={
              formik.errors.fax && formik.touched.fax && formik.errors.fax
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fax}
          />
          <StyledDOM.StyledTextInput
            type="text"
            placeholder="Website"
            // containerStyle={{ marginBottom: "0px" }}
            label="Website"
            name="website"
            error={formik.errors.website}
            errorClassName="error-message"
            errorMessage={
              formik.errors.website &&
              formik.touched.website &&
              formik.errors.website
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
          />
        </StyledDOM.StyledBasicInfoFirstContainer>
      </StyledDOM.StyledBasicInfoContainer>
      <StyledDOM.StyledNextButtonDiv>
        <Button
          label="Next"
          event={() => {
            if (formik && Object.keys(formik.errors).length > 0) {
              scrollToErrorField(formik);
            }
            formik.handleSubmit();
          }}
        />
      </StyledDOM.StyledNextButtonDiv>
    </>
  );
}

export default BasicInfoPage;
