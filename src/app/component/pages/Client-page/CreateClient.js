import React, { useState, useEffect, useContext } from "react";
// import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import Button from "../../../common/Button/Button";
import * as StyledDOM from "./CreateClient.jsx";
import { useFormik } from "formik";
import staticValues from "../../../../assets/json/staticData.json";
import PhoneNumberInput from "../../../common/PhoneNumberInput/PhoneNumberInput";
import {
  getUniqueOptions,
  useFocusFirstInput,
  handleCustomTrim,
  phoneNumberValidation,
} from "../../../common/CommonFunctions/CommonFunctions";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { DynamicContext } from "../../../context/DynamicContext";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import CustomDatePicker from "../../../common/DatePicker/DatePicker";
import DynamicSelectInput from "../../../common/SelectInput/SelectInput";
function CreateClient() {
  const navigate = useNavigate();
  const { setSelectedOption } = useContext(DynamicContext);
  const { staticData = {} } = staticValues || {};

  const [clearTriggered, setClearTriggered] = useState(false);

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
  }, [clearTriggered]);

  const {
    country = [],
    locations = [],
    states = [],
    skills = [],
    Domain = [],
    Priority = [],
    ClientStatus = [],
    Reminder = [],
    TimeZone = [],
    Industry = [],
    ReminderTime = [],
  } = staticData || {};

  const reminderTimeOptions = ReminderTime.map((option) => ({
    value: Object.keys(option)[0],
    label: Object.values(option)[0],
  }));
  const validationSchema = Yup.object().shape({
    clientDetails: Yup.object().shape({
      clientName: Yup.string().matches(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed in client name."
      ),
      boardNo: Yup.string().matches(
        /^[0-9]+$/,
        "Only the numeric are allowed in the board no."
      ),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address."
        ),
    }),
    contactDetails: Yup.object().shape({
      contactPerson: Yup.string().matches(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed in contact person."
      ),
      designation: Yup.string().matches(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed in designation."
      ),
      primaryEmail: Yup.string().matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid  primary email address."
      ),
      secondaryEmail: Yup.string()
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid secondary email address."
        )
        .test(
          "emails-not-same",
          "Primary and secondary emails cannot be the same.",
          function (value) {
            const { primaryEmail } = this.parent;
            if (value && primaryEmail) {
              return value !== primaryEmail;
            }
            return true;
          }
        ),
      primaryContactNo: Yup.string()
        .transform((value) => value?.trim())
        .matches(
          /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
          "Invalid phone number format."
        )

        .min(6, "Contact number must be atleast 6 digits.")
        .max(20, "Contact number must not be over 20 digits."),

      secondaryContactNo: Yup.string()
        .transform((value) => value?.trim())
        .matches(
          /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
          "Invalid phone number format."
        )

        .min(6, "Contact number must be atleast 6 digits.")
        .max(20, "Contact number must not be over 20 digits.")
        .test(
          "mobile number not same",
          "Phone and secondary phone cannot be the same.",
          function (value) {
            const { primaryContactNo } = this.parent;

            if (value && primaryContactNo) {
              return value !== primaryContactNo;
            }
            return true;
          }
        ),
    }),
  });
  const formik = useFormik({
    initialValues: {
      clientDetails: {
        clientName: "",
        boardNo: "",
        email: "",
        website: "",
        linkedIn: "",
        address: "",
        industry: "",
        uploadDocuments: [],
      },
      contactDetails: {
        contactPerson: "",
        designation: "",
        primaryEmail: "",
        secondaryEmail: "",
        primaryContactNo: "",
        secondaryContactNo: "",
        country: "",
        state: "",
        location: "",
        clientNote: "",
        clientStatus: "",
        domain: [],
        skills: [],
        priority: "",
        schedule: false,
        reminderDate: "",
        reminderTime: "",
        reminderTimeZone: "",
        reminderBeforeTheTime: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(handleCustomTrim(values));
      const trimmedValues = {
        clientDetails: handleCustomTrim(values.clientDetails),
        contactDetails: handleCustomTrim(values.contactDetails),
      };
      console.log(trimmedValues);
      formik.resetForm();
      navigate("/clients");
      setSelectedOption(null);
      setClearTriggered(true);
    },
  });

  const handleCancel = () => {
    navigate("/clients");
    setSelectedOption(null);
    setClearTriggered(true);
  };
  const handlePrimaryPhoneInputChange = React.useCallback(
    (phone) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("contactDetails.primaryContactNo", phone);
      formik.setFieldTouched("contactDetails.primaryContactNo", true, false);
      formik.validateField("contactDetails.primaryContactNo");
    },
    [formik]
  );
  const handleSecondaryPhoneInputChange = React.useCallback(
    (phone) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("contactDetails.secondaryContactNo", phone);
      formik.setFieldTouched("contactDetails.secondaryContactNo", true, false);
      formik.validateField("contactDetails.secondaryContactNo");
    },
    [formik]
  );
  const uniqueCountryOptions = getUniqueOptions(country);
  const uniqueLocationOptions = getUniqueOptions(locations);
  const uniqueStateOptions = getUniqueOptions(states);
  const uniqueSkillOptions = getUniqueOptions(skills);
  const uniqueDomainOptions = getUniqueOptions(Domain);
  useFocusFirstInput();
  return (
    <>
      <StyledDOM.StyledH2>Create Client</StyledDOM.StyledH2>
      <StyledDOM.StyledOuterDiv className="outer-div">
        <StyledDOM.StyledClientContainer className="client-details-container">
          <h3>Client Details</h3>
          <StyledDOM.StyledTextinput
            type="text"
            name="clientDetails.clientName"
            label="Client Name"
            placeholder="Client Name"
            value={formik.values.clientDetails.clientName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.clientDetails?.clientName &&
              formik.errors.clientDetails?.clientName
            }
            errorMessage={formik.errors.clientDetails?.clientName}
            backgroundColor="#ecf4ff"
            labelColor="black"
          />
          <StyledDOM.StyledTextinput
            placeholder="Board No"
            label="Board No"
            type="text"
            name="clientDetails.boardNo"
            value={formik.values.clientDetails.boardNo}
            onBlur={formik.handleBlur}
            error={
              formik.touched.clientDetails?.boardNo &&
              formik.errors.clientDetails?.boardNo
            }
            errorMessage={formik.errors.clientDetails?.boardNo}
            onChange={formik.handleChange}
            backgroundColor="#ecf4ff"
            labelColor="black"
          />
          <StyledDOM.StyledTextinput
            label="Email"
            placeholder="Email"
            type="email"
            name="clientDetails.email"
            value={formik.values.clientDetails.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.clientDetails?.email &&
              formik.errors.clientDetails?.email
            }
            errorMessage={formik.errors.clientDetails?.email}
            backgroundColor="#ecf4ff"
            labelColor="black"
          />
          <StyledDOM.StyledTextinput
            label="Website"
            placeholder="Website"
            type="text"
            name="clientDetails.website"
            value={formik.values.clientDetails.website}
            onChange={formik.handleChange}
            backgroundColor="#ecf4ff"
            labelColor="black"
          />
          <StyledDOM.StyledTextinput
            label="LinkedIn"
            placeholder="LinkedIn"
            type="text"
            name="clientDetails.linkedIn"
            value={formik.values.clientDetails.linkedIn}
            onChange={formik.handleChange}
            backgroundColor="#ecf4ff"
            labelColor="black"
          />
          <StyledDOM.StyledTextinput
            label="Address"
            placeholder="Address"
            type="text"
            name="clientDetails.address"
            value={formik.values.clientDetails.address}
            onChange={formik.handleChange}
            backgroundColor="#ecf4ff"
            labelColor="black"
          />
          <DynamicSelectInput
            label="Industry"
            options={Industry}
            name="clientDetails.industry"
            value={formik.values.clientDetails.industry}
            onChange={formik.handleChange}
            labelstyle={{ backgroundColor: "#ecf4ff" }}
            wrapperStyle={{ marginBottom: "15px" }}
          />
          <StyledDOM.StyledFileUploadTextInput
            label="Upload Documents"
            placeholder="Upload Documents"
            Uploadiconstyle={{ top: "17px" }}
            value={formik.values.clientDetails.uploadDocuments}
            backgroundColor="#ecf4ff"
            labelColor="black"
            onChange={(fileName) => {
              formik.setFieldValue("clientDetails.uploadDocuments", fileName);
            }}
            cancelIconTop="60%"
            activeicon={true}
          />
        </StyledDOM.StyledClientContainer>
        <StyledDOM.StyledContactContainer className="contact-details-container">
          <h3>Contact Details</h3>
          <StyledDOM.StyledTextInputContainer className="text-input-container">
            <StyledDOM.StyledTextinput
              label="Contact Person"
              placeholder="Contact Person"
              type="text"
              name="contactDetails.contactPerson"
              value={formik.values.contactDetails.contactPerson}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactDetails?.contactPerson &&
                formik.errors.contactDetails?.contactPerson
              }
              errorMessage={formik.errors.contactDetails?.contactPerson}
            />
            <StyledDOM.StyledTextinput
              label="Designation"
              placeholder="Designation"
              type="text"
              name="contactDetails.designation"
              value={formik.values.contactDetails.designation}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.contactDetails?.designation &&
                formik.errors.contactDetails?.designation
              }
              errorMessage={formik.errors.contactDetails?.designation}
            />
            <StyledDOM.StyledTextinput
              label="Primary Email"
              placeholder="Primary Email"
              type="text"
              name="contactDetails.primaryEmail"
              value={formik.values.contactDetails.primaryEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactDetails?.primaryEmail &&
                formik.errors.contactDetails?.primaryEmail
              }
              errorMessage={formik.errors.contactDetails?.primaryEmail}
            />

            <StyledDOM.StyledTextinput
              label="Secondary Email"
              placeholder="Secondary Email"
              type="text"
              name="contactDetails.secondaryEmail"
              value={formik.values.contactDetails.secondaryEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactDetails?.secondaryEmail &&
                formik.errors.contactDetails?.secondaryEmail
              }
              errorMessage={formik.errors.contactDetails?.secondaryEmail}
            />
            {/* <StyledDOM.StyledTextinput
              label="Primary Contact No."
              placeholder="Primary Contact No."
              type="text"
              name="contactDetails.primaryContactNo"
              value={formik.values.contactDetails.primaryContactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactDetails?.primaryContactNo &&
                formik.errors.contactDetails?.primaryContactNo
              }
              errorMessage={formik.errors.contactDetails?.primaryContactNo}
            />
            <StyledDOM.StyledTextinput
              label="Secondary Contact No."
              placeholder="Secondary Contact No."
              type="text"
              name="contactDetails.secondaryContactNo"
              value={formik.values.contactDetails.secondaryContactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.contactDetails?.secondaryContactNo &&
                formik.errors.contactDetails?.secondaryContactNo
              }
              errorMessage={formik.errors.contactDetails?.secondaryContactNo}
            /> */}
            <PhoneNumberInput
              value={formik.values.contactDetails?.primaryContactNo}
              onChange={handlePrimaryPhoneInputChange}
              onBlur={formik.handleBlur}
              error={formik.errors.contactDetails?.primaryContactNo}
              touched={formik.touched.contactDetails?.primaryContactNo}
              placeholder="Primary Contact No."
              width="100%"
              height="40px"
              label="Primary Contact No."
              marginBottom="30px"
              countryListWidth="435px"
              phoneContainerStyle={{ marginBottom: "25px" }}
            />
            <PhoneNumberInput
              className="client-number"
              value={formik.values.contactDetails?.secondaryContactNo}
              onChange={handleSecondaryPhoneInputChange}
              onBlur={formik.handleBlur}
              error={formik.errors.contactDetails?.secondaryContactNo}
              touched={formik.touched.contactDetails?.secondaryContactNo}
              placeholder="Secondary Contact No."
              width="100%"
              height="40px"
              label="Secondary Contact No."
              marginBottom="30px"
              countryListWidth="435px"
              phoneContainerStyle={{ marginBottom: "25px" }}
            />
          </StyledDOM.StyledTextInputContainer>
          <StyledDOM.StyledAutoCompleteContainer className="auto-complete-container">
            <DynamicSelectInput
              label="Country"
              options={uniqueCountryOptions}
              name="contactDetails.country"
              value={formik.values.contactDetails.country}
              onChange={formik.handleChange}
              formStyle={{ margin: "5px 0" }}
            />
            <DynamicSelectInput
              label="State"
              options={uniqueStateOptions}
              name="contactDetails.state"
              value={formik.values.contactDetails.state}
              onChange={formik.handleChange}
              formStyle={{ margin: "5px 0" }}
            />
          </StyledDOM.StyledAutoCompleteContainer>
          <StyledDOM.StyledAutoCompleteContainer className="auto-complete-container">
            {" "}
            <DynamicSelectInput
              label="Location"
              options={uniqueLocationOptions}
              name="contactDetails.location"
              value={formik.values.contactDetails.location}
              onChange={formik.handleChange}
              formStyle={{ margin: "5px 0" }}
            />
            <StyledDOM.StyledAutoComplete
              clearTriggered={clearTriggered}
              fieldLabel="Domain"
              placeholder="Domain"
              showDownArrowIcon={true}
              // autocompleteOuterDiv={{ margin: "5px 0" }}
              freeSolo={true}
              options={uniqueDomainOptions}
              onChange={(newValue) => {
                formik.setFieldValue("contactDetails.domain", newValue);
              }}
              // listBoxStyle={{ width: "71%" }}
              value={formik.values.contactDetails.domain}
              defaultValues={formik.values.contactDetails.domain}
            />
          </StyledDOM.StyledAutoCompleteContainer>
          <StyledDOM.StyledAutoCompleteContainer className="auto-complete-container">
            <DynamicSelectInput
              label="Priority"
              options={Priority}
              name="contactDetails.priority"
              value={formik.values.contactDetails.priority}
              onChange={formik.handleChange}
              formStyle={{ margin: "5px 0 10px 0" }}
            />
            <DynamicSelectInput
              label="Client Status"
              options={ClientStatus}
              name="contactDetails.clientStatus"
              value={formik.values.contactDetails.clientStatus}
              onChange={formik.handleChange}
              formStyle={{ margin: "5px 0 10px 0" }}
            />
          </StyledDOM.StyledAutoCompleteContainer>
          <StyledDOM.StyledTextArea
            label="Client Note"
            placeholder="Client Note"
            type="text"
            name="contactDetails.clientNote"
            value={formik.values.contactDetails.clientNote}
            onChange={formik.handleChange}
          />

          <StyledDOM.StyledAutoComplete
            className="auto-comp"
            clearTriggered={clearTriggered}
            fieldLabel="Skills"
            placeholder="Skills"
            autocompleteOuterDiv={{ marginTop: "25px" }}
            InputWrapperStyle={{
              padding: "4px 0",
              height: "100px",
              overflow: "auto",
            }}
            // freeSolo={true}
            tags={true}
            options={uniqueSkillOptions}
            onChange={(newValue) => {
              formik.setFieldValue("contactDetails.skills", newValue);
            }}
            listBoxStyle={{ width: "71%" }}
            value={formik.values.contactDetails.skills}
            defaultValues={formik.values.contactDetails.skills}
          />
          <StyledDOM.StyledCheckboxContainer className="checkboxContainer">
            <DynamicCheckbox
              name="contactDetails.schedule"
              labelStyle={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#000000",
              }}
              label="Schedule a follow-up for this contact"
              checked={formik.values.contactDetails.schedule}
              onChange={(e) =>
                formik.setFieldValue(
                  "contactDetails.schedule",
                  e.target.checked
                )
              }
            />
          </StyledDOM.StyledCheckboxContainer>

          {formik.values.contactDetails.schedule === true ? (
            <StyledDOM.StyledReminderContainer className="reminderContainer">
              <StyledDOM.StyledAutoCompleteContainer className="auto-complete-container">
                <CustomDatePicker
                  label="Reminder Date"
                  dateFormat="dd/MM/yyyy"
                  labelColor="black"
                  divStyle={{ width: "100%", marginBottom: "0px" }}
                  form={formik}
                  placeholder="Reminder Date"
                  field={{
                    name: "reminderDate",
                    value: formik.values.reminderDate,
                    onChange: (e) => {
                      formik.setFieldValue("reminderDate", e.target.value);
                    },
                    onBlur: () => {
                      formik.setFieldTouched("reminderDate", true);
                    },
                  }}
                />
                <DynamicSelectInput
                  label="Reminder Time"
                  options={reminderTimeOptions}
                  name="contactDetails.reminderTime"
                  value={formik.values.contactDetails.reminderTime}
                  onChange={formik.handleChange}
                  labelKey="label"
                />
              </StyledDOM.StyledAutoCompleteContainer>
              <StyledDOM.StyledAutoCompleteContainer className="auto-complete-container">
                <DynamicSelectInput
                  label="Time Zone"
                  options={TimeZone}
                  name="contactDetails.reminderTimeZone"
                  value={formik.values.contactDetails.reminderTimeZone}
                  onChange={formik.handleChange}
                />
                <DynamicSelectInput
                  label="Reminder Before The Time"
                  options={Reminder}
                  name="contactDetails.reminderBeforeTheTime"
                  value={formik.values.contactDetails.reminderBeforeTheTime}
                  onChange={formik.handleChange}
                // defaultOption={Reminder[0]?.title}
                />
              </StyledDOM.StyledAutoCompleteContainer>
            </StyledDOM.StyledReminderContainer>
          ) : null}

          <StyledDOM.StyledButtonContainer className="button-container">
            <Button label="Cancel" isCancel={true} event={handleCancel} />
            <Button label="Create" event={formik.handleSubmit} />
          </StyledDOM.StyledButtonContainer>
        </StyledDOM.StyledContactContainer>
      </StyledDOM.StyledOuterDiv>
    </>
  );
}

export default CreateClient;
