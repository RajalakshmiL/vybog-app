import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import staticValues from "../../../../assets/json/staticData.json";
import Button from "../../../common/Button/Button";
import * as StyledDOM from "../Candidate-Page/BasicInfoPage.jsx";
import {
  getUniqueOptions,
  useFocusFirstInput,
  scrollToErrorField,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions";
import CustomDatePicker from "../../../common/DatePicker/DatePicker";
import { DynamicContext } from "../../../context/DynamicContext";

function AdditionalDetailsPage(props) {
  const { setCandidateDetails, candidateDetails, setActiveTab, activeTab } =
    useContext(DynamicContext);
  const { setFillingPercentages } = props || {};
  const { staticData = {} } = staticValues || {};
  const {
    city = [],
    country = [],
    candidate_Status = [],
    candidate_Owner = [],
    source = [],
    languages = [],
  } = staticData || {};

  const calculateFillingPercentage = () => {
    const filledFields = Object.values(formik.values).filter(Boolean).length;
    const totalFields = Object.keys(formik.values).length;
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };

  const [clearTriggered, setClearTriggered] = useState(false);

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
  }, [clearTriggered]);

  const validationSchema = Yup.object({
    postal: Yup.string().matches(
      /^(?=.*[0-9])[A-Za-z0-9]+$/,
      "Postal code either be a number or alphanumeric."
    ),
    pan: Yup.string().matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN number format. It should be in the format: (ABCDE1234F)"
    ),
    passport: Yup.string().matches(
      /^[A-Z]{1}[0-9]{7}$/,
      "Invalid passport number format. It should be in the format: (A1234567)"
    ),
  });

  const formik = useFormik({
    initialValues: {
      street: "",
      postal: "",
      city: "",
      province: "",
      country: "",
      preferredCountry: "",
      preferredState: "",
      preferredCity: "",
      candidateStatus: "",
      source: "",
      candidateOwner: "",
      emailOpt: false,
      resume: [],
      coverLetter: [],
      others: [],
      offer: [],
      contracts: [],
      languages: [],
      passport: "",
      pan: "",
      dateofJoining: "",
      payment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedValues = handleCustomTrim(values);

      console.log(trimmedValues);
      const sections = [
        "basicInfo",
        "professionalInfo",
        "specialization",
        "experience",
        "education",
        "additionalInfo",
      ];

      const combinedCandidateDetails = sections.map((section, index) => {
        return candidateDetails[index] || getDefaultSectionValues(section);
      });
      combinedCandidateDetails[5] = trimmedValues;

      const keys = [
        "Basic Info",
        "Professional Info",
        "Specialization",
        "Experience",
        "Education",
        "Additional Info",
      ];

      const candidateDetailsObject = {};
      for (
        let i = 0;
        i < keys.length && i < combinedCandidateDetails.length;
        i++
      ) {
        candidateDetailsObject[keys[i]] = combinedCandidateDetails[i];
      }

      console.log("candidateDetailsObject", candidateDetailsObject);

      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({ ...prev, additional: percentage }));
      setCandidateDetails(combinedCandidateDetails);
      formik.resetForm();
      setClearTriggered(true);
    },
  });

  const getDefaultSectionValues = (section) => {
    switch (section) {
      case "basicInfo":
        return {
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
        };
      case "professionalInfo":
        return {
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
        };
      case "specialization":
        return [];
      case "experience":
        return [];
      case "education":
        return [];
      case "additionalInfo":
        return {
          street: "",
          postal: "",
          city: "",
          province: "",
          country: "",
          preferredCountry: "",
          preferredState: "",
          preferredCity: "",
          candidateStatus: "",
          source: "",
          candidateOwner: "",
          emailOpt: false,
          resume: [],
          coverLetter: [],
          others: [],
          offer: [],
          contracts: [],
          languages: [],
          passport: "",
          pan: "",
          dateofJoining: "",
          payment: "",
        };
      default:
        return {};
    }
  };

  const uniqueCityOptions = getUniqueOptions(city);
  const uniqueCountryOptions = getUniqueOptions(country);
  const uniqueStatusOptions = getUniqueOptions(candidate_Status);
  const uniqueOwnerOptions = getUniqueOptions(candidate_Owner);
  const uniqueSourceOptions = getUniqueOptions(source);
  const uniqueLanguageOptions = getUniqueOptions(languages);
  useFocusFirstInput();

  return (
    <>
      <StyledDOM.StyledBasicInfoContainer className="outer-container">
        <StyledDOM.StyledBasicInfoSubhead>
          Location Info
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Country"
            freeSolo={true}
            showDownArrowIcon={true}
            placeholder="Country"
            options={uniqueCountryOptions}
            containerStyle={{ marginBottom: "25px" }}
            onChange={(newValue) => {
              formik.setFieldValue("country", newValue);
            }}
            defaultValues={formik.values.country}
            error={formik.errors.country}
            errorClassName="error-message"
            errorMessage={
              formik.errors.country &&
              formik.touched.country &&
              formik.errors.country
            }
            onBlur={formik.handleBlur}
            dataattr="country"
          />
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Preferred Country"
            freeSolo={true}
            showDownArrowIcon={true}
            placeholder="Preferred Country"
            options={uniqueCountryOptions}
            containerStyle={{ marginBottom: "25px" }}
            onChange={(newValue) => {
              formik.setFieldValue("preferredCountry", newValue);
            }}
            defaultValues={formik.values.preferredCountry}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Province/State"
            placeholder="Province/State"
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
            containerStyle={{ marginBottom: "25px" }}
            error={formik.errors.province}
            errorClassName="error-message"
            errorMessage={
              formik.errors.province &&
              formik.touched.province &&
              formik.errors.province
            }
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Preferred Province/State"
            placeholder="Preferred Province/State"
            name="preferredState"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.preferredState}
            containerStyle={{ marginBottom: "25px" }}
            error={formik.errors.preferredState}
            errorClassName="error-message"
            errorMessage={
              formik.errors.preferredState &&
              formik.touched.preferredState &&
              formik.errors.preferredState
            }
          />
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="City"
            name="city"
            showDownArrowIcon={true}
            freeSolo={true}
            placeholder="City"
            options={uniqueCityOptions}
            containerStyle={{ marginBottom: "25px" }}
            onChange={(newValue) => {
              formik.setFieldValue("city", newValue);
            }}
            defaultValues={formik.values.city}
          />
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Preferred City"
            name="preferredCity"
            showDownArrowIcon={true}
            freeSolo={true}
            placeholder="Preferred City"
            options={uniqueCityOptions}
            containerStyle={{ marginBottom: "25px" }}
            onChange={(newValue) => {
              formik.setFieldValue("preferredCity", newValue);
            }}
            defaultValues={formik.values.preferredCity}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Street"
            placeholder="Street"
            name="street"
            onChange={formik.handleChange}
            value={formik.values.street}
            containerStyle={{ marginBottom: "25px" }}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Postal Code"
            placeholder="Postal Code"
            name="postal"
            onChange={formik.handleChange}
            value={formik.values.postal}
            containerStyle={{ marginBottom: "25px" }}
            error={formik.errors.postal}
            errorClassName="error-message"
            errorMessage={
              formik.errors.postal &&
              formik.touched.postal &&
              formik.errors.postal
            }
            onBlur={formik.handleBlur}
          />
        </StyledDOM.StyledBasicInfoFirstContainer>
        <StyledDOM.StyledHorizontalRuler />

        <StyledDOM.StyledBasicInfoSubhead>
          Candidate Info
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Candidate Status"
            freeSolo={true}
            showDownArrowIcon={true}
            placeholder="Candidate Status"
            containerStyle={{ marginBottom: "25px" }}
            options={uniqueStatusOptions}
            onChange={(newValue) => {
              formik.setFieldValue("candidateStatus", newValue);
            }}
            defaultValues={formik.values.candidateStatus}
          />
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Source"
            freeSolo={true}
            showDownArrowIcon={true}
            containerStyle={{ marginBottom: "25px" }}
            placeholder="Source"
            options={uniqueSourceOptions}
            onChange={(newValue) => {
              formik.setFieldValue("source", newValue);
            }}
            defaultValues={formik.values.source}
          />
          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Candidate Owner"
            freeSolo={true}
            showDownArrowIcon={true}
            placeholder="Candidate Owner"
            containerStyle={{ marginBottom: "25px" }}
            options={uniqueOwnerOptions}
            onChange={(newValue) => {
              formik.setFieldValue("candidateOwner", newValue);
            }}
            defaultValues={formik.values.candidateOwner}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Payment Terms"
            placeholder="Payment Terms"
            name="payment"
            onChange={formik.handleChange}
            value={formik.values.payment}
            containerStyle={{ marginBottom: "25px" }}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="Passport No."
            placeholder="Passport No."
            name="passport"
            onChange={formik.handleChange}
            value={formik.values.passport}
            containerStyle={{ marginBottom: "25px" }}
            error={formik.errors.passport}
            errorClassName="error-message"
            errorMessage={
              formik.errors.passport &&
              formik.touched.passport &&
              formik.errors.passport
            }
            onBlur={formik.handleBlur}
          />
          <StyledDOM.StyledTextInput
            type="text"
            label="PAN No."
            placeholder="PAN No."
            name="pan"
            onChange={formik.handleChange}
            value={formik.values.pan}
            containerStyle={{ marginBottom: "25px" }}
            error={formik.errors.pan}
            errorClassName="error-message"
            errorMessage={
              formik.errors.pan && formik.touched.pan && formik.errors.pan
            }
            onBlur={formik.handleBlur}
          />
          <CustomDatePicker
            label="Date of Joining"
            dateFormat="dd/MM/yyyy"
            // backgroundColor="#ecf4ff"
            labelColor="black"
            divStyle={{ width: "100%" }}
            form={formik}
            placeholder="Date of Joining"
            field={{
              name: "dateofJoining",
              value: formik.values.dateofJoining,
              onChange: (e) => {
                formik.setFieldValue("dateofJoining", e.target.value);
              },
              onBlur: () => {
                formik.setFieldTouched("dateofJoining", true);
              },
            }}
          />

          <CustomAutocomplete
            clearTriggered={clearTriggered}
            fieldLabel="Languages Known"
            tags={true}
            // showDownArrowIcon={true}
            placeholder="Languages known"
            options={uniqueLanguageOptions}
            InputWrapperStyle={{
              // marginBottom: "25px",
              maxHeight: "80px",
              overflow: "auto",
            }}
            onChange={(newValue) => {
              formik.setFieldValue("languages", newValue);
            }}
            defaultValues={formik.values.languages}
          />
        </StyledDOM.StyledBasicInfoFirstContainer>
        <StyledDOM.StyledHorizontalRuler />
        <StyledDOM.StyledBasicInfoSubhead>
          Candidate File Info
        </StyledDOM.StyledBasicInfoSubhead>
        <StyledDOM.StyledBasicInfoFirstContainer>
          <StyledDOM.StyledFileUploadTextInput
            label="Resume"
            value={formik.values.resume}
            // containerStyle={{ marginBottom: "25px" }}
            onChange={(fileName) => {
              formik.setFieldValue("resume", fileName);
            }}
            containerClassName="file-uploader-container"
            placeholder="Resume"
          />
          <StyledDOM.StyledFileUploadTextInput
            label="Cover Letter"
            value={formik.values.coverLetter}
            // containerStyle={{ marginBottom: "25px" }}
            onChange={(fileName) => {
              formik.setFieldValue("coverLetter", fileName);
            }}
            containerClassName="file-uploader-container"
            placeholder="Cover Letter"
          />
          <StyledDOM.StyledFileUploadTextInput
            label="Offer"
            value={formik.values.offer}
            // containerStyle={{ marginBottom: "25px" }}
            onChange={(fileName) => {
              formik.setFieldValue("offer", fileName);
            }}
            containerClassName="file-uploader-container"
            placeholder="Offer"
          />
          <StyledDOM.StyledFileUploadTextInput
            label="Contracts"
            value={formik.values.contracts}
            // containerStyle={{ marginBottom: "25px" }}
            onChange={(fileName) => {
              formik.setFieldValue("contracts", fileName);
            }}
            containerClassName="file-uploader-container"
            placeholder="Contracts"
          />
          <StyledDOM.StyledFileUploadTextInput
            value={formik.values.others}
            // containerStyle={{ marginBottom: "25px" }}
            onChange={(fileName) => {
              formik.setFieldValue("others", fileName);
            }}
            containerClassName="file-uploader-container"
            placeholder="Others"
            label="Others"
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
          label="Submit"
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

export default AdditionalDetailsPage;
