import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as StyledDOM from "./BasicInfoPage.jsx";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete.js";
import Button from "../../../common/Button/Button.js";
import staticValues from "../../../../assets/json/staticData.json";
// import PhoneNumberInput from "../../../common/PhoneNumberInput/PhoneNumberInput.jsx";
import {
  // phoneNumberValidation,
  useFocusFirstInput,
  scrollToErrorField,
  getUniqueOptions,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { DynamicContext } from "../../../context/DynamicContext.js";
const ProfessionalInfoSchema = Yup.object().shape({
  experience: Yup.string()
    .trim()
    .matches(/^[A-Za-z0-9.]+$/, "Enter a valid Experience."),

  // highestQualification: Yup.string().matches(
  //   /^[A-Za-z\s]+$/,
  //   "Only alphabets are allowed."
  // ),

  jobTitle: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9 .-]+$/,
      "Job title can only contain letters, numbers, spaces, hyphens, and periods."
    )
    .nullable(),
  previousCompany: Yup.string()
    .trim()
    .min(3, "Company name must be at least 3 characters long.")
    .max(75, "Company name must not exceed 75 characters.")
    .matches(/^[a-zA-Z0-9\s\-./]+$/, "Company name must be valid."),

  currentEmployer: Yup.string()
    .trim()
    .min(3, "Company name must be at least 3 characters long.")
    .max(75, "Company name must not exceed 75 characters.")
    .matches(/^[a-zA-Z0-9\s\-./]+$/, "Company name must be valid."),
  currentSalary: Yup.number()
    .typeError("Salary must be a number.")
    .positive("Salary must be a positive number.")
    .nullable(),
  expectedSalary: Yup.number()
    .typeError("Salary must be a number.")
    .positive("Salary must be a positive number.")
    .nullable(),
  currentDesignation: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9 .-]+$/,
      "Designation can only contain letters, numbers, spaces, hyphens, and periods."
    )
    .nullable(),
  proposedDesignation: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9 .-]+$/,
      "Designation can only contain letters, numbers, spaces, hyphens, and periods."
    )
    .nullable(),
  noticePeriod: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Notice period can only contain letters, numbers, and spaces."
    )
    .nullable()
    .optional(),
});

function ProfessionalInfoPage(props) {
  const { candidateDetails, setCandidateDetails, activeTab, setActiveTab } =
    useContext(DynamicContext);
  const { setIsfilled, setFillingPercentages } = props || {};
  const formik = useFormik({
    initialValues: {
      experience: "",
      highestQualification: [],
      skillSet: [],
      jobTitle: "",
      previousCompany: "",
      currentEmployer: "",
      expectedSalary: "",
      currentSalary: "",
      noticePeriod: "",
      currentDesignation: "",
      proposedDesignation: "",
      candidateRemarks: "",
      skype: "",
      linkedIn: "",
      twitter: "",
      facebook: "",
    },
    validationSchema: ProfessionalInfoSchema,
    onSubmit: (values) => {
      console.log(values);
      const trimmedValues = handleCustomTrim(values);
      console.log("trimmed values", trimmedValues);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        professionalInfo: percentage,
      }));
      setCandidateDetails([...candidateDetails, trimmedValues]);
      setIsfilled(true);
      setActiveTab(activeTab + 1);
      formik.resetForm();
    },
  });
  const calculateFillingPercentage = () => {
    const filledFields = Object.values(formik.values).filter(Boolean).length;
    const totalFields = Object.keys(formik.values).length;
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };
  // const handleNext = () => {
  //   let data = candidateDetails;
  //   let details = candidateDetails;
  //   if (data) {
  //     data = [...data, details];
  //   } else {
  //     data.push([details]);
  //   }
  //   setCandidateDetails(data);
  //   setActiveTab(activeTab + 1);
  // };
  const [clearTriggered, setClearTriggered] = useState(false);

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
  }, [clearTriggered]);
  const { staticData = {} } = staticValues || {};
  const { highestQualification = [] } = staticData || {};
  const { skillSet = [] } = staticData || {};

  const uniqueQualificationOptions = getUniqueOptions(highestQualification);
  const uniqueSkillOptions = getUniqueOptions(skillSet);

  useFocusFirstInput();
  return (
    <>
      <StyledDOM.StyledBasicInfoContainer className="basic-info-container">
        <StyledDOM.StyledBasicInfoSubhead>
          Professional Info
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <StyledDOM.StyledTextInput
            type="text"
            label="Experience in Years"
            placeholder="Experience in Years"
            // containerStyle={{ marginBottom: "0px" }}
            name="experience"
            error={formik.errors.experience}
            errorClassName="error-message"
            errorMessage={
              formik.errors.experience &&
              formik.touched.experience &&
              formik.errors.experience
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.experience}
          />
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Highest Qualification Held"
            freeSolo={true}
            showDownArrowIcon={true}
            placeholder="Highest Qualification Held"
            options={uniqueQualificationOptions}
            containerStyle={{ marginBottom: "25px" }}
            onChange={(newValue) => {
              formik.setFieldValue("highestQualification", newValue);
            }}
            defaultValues={formik.values.highestQualification}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Job Title"
            placeholder="Job Title "
            // containerStyle={{ marginBottom: "0px" }}
            name="jobTitle"
            error={formik.errors.jobTitle}
            errorClassName="error-message"
            errorMessage={
              formik.errors.jobTitle &&
              formik.touched.jobTitle &&
              formik.errors.jobTitle
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.jobTitle}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Notice Period"
            placeholder="Notice Period"
            // containerStyle={{ marginBottom: "0px" }}
            name="noticePeriod"
            error={formik.errors.noticePeriod}
            errorClassName="error-message"
            errorMessage={
              formik.errors.noticePeriod &&
              formik.touched.noticePeriod &&
              formik.errors.noticePeriod
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.noticePeriod}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Previous Company"
            placeholder="Previous Company"
            // containerStyle={{ marginBottom: "0px" }}
            name="previousCompany"
            error={formik.errors.previousCompany}
            errorClassName="error-message"
            errorMessage={
              formik.errors.previousCompany &&
              formik.touched.previousCompany &&
              formik.errors.previousCompany
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.previousCompany}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Current Employer"
            placeholder="Current Employer"
            // containerStyle={{ marginBottom: "0px" }}
            name="currentEmployer"
            error={formik.errors.currentEmployer}
            errorClassName="error-message"
            errorMessage={
              formik.errors.currentEmployer &&
              formik.touched.currentEmployer &&
              formik.errors.currentEmployer
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentEmployer}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Current Salary"
            placeholder="Current Salary"
            // containerStyle={{ marginBottom: "0px" }}
            name="currentSalary"
            error={formik.errors.currentSalary}
            errorClassName="error-message"
            errorMessage={
              formik.errors.currentSalary &&
              formik.touched.currentSalary &&
              formik.errors.currentSalary
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentSalary}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Expected Salary"
            placeholder="Expected Salary"
            // containerStyle={{ marginBottom: "0px" }}
            name="expectedSalary"
            error={formik.errors.expectedSalary}
            errorClassName="error-message"
            errorMessage={
              formik.errors.expectedSalary &&
              formik.touched.expectedSalary &&
              formik.errors.expectedSalary
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expectedSalary}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Current Designation"
            placeholder="Current Designation"
            // containerStyle={{ marginBottom: "0px" }}
            name="currentDesignation"
            error={formik.errors.currentDesignation}
            errorClassName="error-message"
            errorMessage={
              formik.errors.currentDesignation &&
              formik.touched.currentDesignation &&
              formik.errors.currentDesignation
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentDesignation}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Proposed Designation"
            placeholder="Proposed Designation"
            // containerStyle={{ marginBottom: "0px" }}
            name="proposedDesignation"
            error={formik.errors.proposedDesignation}
            errorClassName="error-message"
            errorMessage={
              formik.errors.proposedDesignation &&
              formik.touched.proposedDesignation &&
              formik.errors.proposedDesignation
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.proposedDesignation}
          />
          <CustomAutocomplete
            className="skill"
            clearTriggered={clearTriggered}
            fieldLabel="Skill Set"
            tags={true}
            // showDownArrowIcon={true}
            placeholder="Skill Set"
            options={uniqueSkillOptions}
            containerStyle={{ marginBottom: "10px" }}
            InputWrapperStyle={{
              // marginBottom: "10px",
              height: "40px",
              overflow: "auto",
              padding: "5px",
            }}
            onChange={(newValue) => {
              formik.setFieldValue("skillSet", newValue);
            }}
            defaultValues={formik.values.skillSet}
          />
          <StyledDOM.StyledCandidateRemark
            placeholder="Candidate Remarks"
            containerClassName="Candidate Remarks"
            name="candidateRemarks"
            label="Candidate Remarks"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.candidateRemarks}
            errorMessage={formik.errors.candidateRemarks}
            error={
              formik.touched.candidateRemarks && formik.errors.candidateRemarks
            }
          />
        </StyledDOM.StyledBasicInfoFirstContainer>
        <StyledDOM.StyledHorizontalRuler />
        <StyledDOM.StyledBasicInfoSubhead>
          Social Links
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <StyledDOM.StyledTextInput
            type="text"
            label="Skype ID"
            placeholder="Skype ID"
            // containerStyle={{ marginBottom: "0px" }}
            name="skype"
            error={formik.errors.skype}
            errorClassName="error-message"
            errorMessage={
              formik.errors.skype && formik.touched.skype && formik.errors.skype
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.skype}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="LinkedIn"
            // containerStyle={{ marginBottom: "0px" }}
            placeholder="LinkedIn"
            name="linkedIn"
            error={formik.errors.linkedIn}
            errorClassName="error-message"
            errorMessage={
              formik.errors.linkedIn &&
              formik.touched.linkedIn &&
              formik.errors.linkedIn
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedIn}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Twitter"
            placeholder="Twitter"
            name="twitter"
            error={formik.errors.twitter}
            errorClassName="error-message"
            errorMessage={
              formik.errors.twitter &&
              formik.touched.twitter &&
              formik.errors.twitter
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.twitter}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Facebook"
            placeholder="Facebook"
            name="facebook"
            error={formik.errors.facebook}
            errorClassName="error-message"
            errorMessage={
              formik.errors.facebook &&
              formik.touched.facebook &&
              formik.errors.facebook
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.facebook}
          />
        </StyledDOM.StyledBasicInfoFirstContainer>
      </StyledDOM.StyledBasicInfoContainer>
      <StyledDOM.StyledButtonContainer className="button-container">
        <Button
          label="Previous"
          isCancel={true}
          event={() => setActiveTab(activeTab - 1)}
        />
        <Button
          label="Next"
          event={() => {
            if (formik && Object.keys(formik.errors).length > 0) {
              scrollToErrorField(formik);
            }
            formik.handleSubmit();
          }}
        />
      </StyledDOM.StyledButtonContainer>
    </>
  );
}

export default ProfessionalInfoPage;
