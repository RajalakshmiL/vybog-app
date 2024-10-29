import { useState, useEffect, useContext } from "react";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import CustomDatePicker from "../../../common/DatePicker/DatePicker";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import Button from "../../../common/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import staticValues from "../../../../assets/json/staticData.json";
import * as StyledDOM from "../Jobs-Page/Createjob.jsx";
import TextEditor from "../../../common/TextEditer/TextEditer.js";
import "../../../common/common.css";
import linkedIn from "../../../../assets/image/linkedIn.svg";
import facebook from "../../../../assets/image/facebook.svg";
import twitter from "../../../../assets/image/twitter.svg";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import {
  useFocusFirstInput,
  scrollToErrorField,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions";
import { DynamicContext } from "../../../context/DynamicContext";
import DynamicSelectInput from "../../../common/SelectInput/SelectInput";
import DynamicMultipleSelectCheckmarks from "../../../common/Multi-Select-CheckMarks/MultiSelectCheckMarks";
export default function Createjob() {
  const navigate = useNavigate();
  const { setSelectedOption } = useContext(DynamicContext);
  const { staticData = {} } = staticValues || {};
  const isScreenLessThan991 = useMediaQuery("(max-width: 991px)");
  const {
    client_name = [],
    country = [],
    roles = [],
    Domain = [],
    skills = [],
    locations = [],
    employment_types = [],
    candidate = [],
  } = staticData || [];
  const validationSchema = Yup.object().shape({
    jobtitle: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed jobtitle")
      .required("Job title is required"),
    client: Yup.string().required("Client is required"),
    country: Yup.string().required("Country is required"),
    position: Yup.string().matches(
      /^[0-9]+$/,
      "Only the numeric are allowed in the position"
    ),
    experience: Yup.string().matches(
      /^\d+(\.\d+)?$/,
      "Only numeric values are allowed in the experience "
    ),

    salary: Yup.string().matches(
      /^[0-9]+$/,
      "Only the numeric are allowed in the salary"
    ),
    targetcount: Yup.string().matches(
      /^[0-9]+$/,
      "Only the numeric are allowed"
    ),
    contactName: Yup.string().matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets are allowed contact name"
    ),
  });
  const buttons = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks", "codeView"],
    // ["preview", "print"],
    ["save"],
  ];
  const [clearTriggered, setClearTriggered] = useState(false);
  const [editorResetTrigger, setEditorResetTrigger] = useState(false);

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
    if (editorResetTrigger) {
      setEditorResetTrigger(false);
    }
  }, [clearTriggered, editorResetTrigger]);

  const formik = useFormik({
    initialValues: {
      jobtitle: "",
      jobcode: "",
      client: "",
      contactName: "",
      postedOn: "",
      country: "",
      experience: "",
      salary: "",
      roles: "",
      domain: "",
      position: "",
      skill: [],
      recuriternotes: "",
      expiryby: "",
      jobDescription: "",
      notifyUsers: false,
      targetcount: "",
      jobdocument_attach: "",
      location: "",
      employment_type: "",
      remoteworking: false,
      linkedin: false,
      twitter: false,
      facebook: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const trimmedvalues = handleCustomTrim(values);
      console.log("job per page", trimmedvalues);
      formik.resetForm();
      navigate("/jobs");
      setSelectedOption(null);
      setClearTriggered(true);
      setEditorResetTrigger(true);
    },
  });

  const handlecancel = () => {
    navigate("/jobs");
    setSelectedOption(null);
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    console.log(files, info);
  };
  useFocusFirstInput();
  return (
    <>
      <StyledDOM.StyledJobContainer className="create-job-container">
        <StyledDOM.StyledJobHeading>Create Job</StyledDOM.StyledJobHeading>
        <StyledDOM.StyledJobMainContainer className="job-main-container">
          <StyledDOM.StyledJobInnerFirstContainer className="job-inner-container">
            <StyledDOM.StyledJobTextField className="text-field">
              <StyledDOM.StyledJobTextInput
                className="text-input"
                label="Job Title"
                placeholder="Job Title"
                type="text"
                name="jobtitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobtitle}
                error={formik.touched.jobtitle && formik.errors.jobtitle}
                errorMessage={formik.errors.jobtitle}
                errorClassName="error-message"
                required={true}
              />
              <StyledDOM.StyledJobTextInput
                className="text-input"
                type="text"
                name="jobcode"
                label="Job Code"
                placeholder="Job Code"
                onChange={formik.handleChange}
                value={formik.values.jobcode}
              />
            </StyledDOM.StyledJobTextField>
            <StyledDOM.StyledAutocompleteContainer>
              <CustomDatePicker
                label="Posted On"
                dateFormat="dd/MM/yyyy"
                labelColor="black"
                divStyle={{ width: "100%", marginBottom: "0px" }}
                form={formik}
                placeholder="Posted On"
                field={{
                  name: "postedOn",
                  value: formik.values.postedOn,
                  onChange: (e) => {
                    formik.setFieldValue("postedOn", e.target.value);
                  },
                  onBlur: () => {
                    formik.setFieldTouched("postedOn", true);
                  },
                }}
              />
              <DynamicSelectInput
                // selectStyle={{ marginBottom: "15px" }}
                wrapperStyle={{ marginBottom: "15px" }}
                label="Country"
                labelColor="black"
                options={country}
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                required={true}
                error={formik.touched.country && formik.errors.country}
                errorMessage={formik.errors.country}
              />
            </StyledDOM.StyledAutocompleteContainer>
            <StyledDOM.StyledAutocompleteContainer>
              <CustomAutocomplete
                clearTriggered={clearTriggered}
                fieldLabel="Role"
                color="blue"
                className="text-input"
                freeSolo={true}
                placeholder="Role"
                name="roles"
                options={roles}
                onBlur={formik.handleBlur}
                onChange={(newValue) => {
                  formik.setFieldValue("roles", newValue);
                }}
                // autocompleteOuterDiv={{ width: "95%" }}
                defaultValues={formik.values.roles}
                showDownArrowIcon={true}
              />
              <CustomAutocomplete
                clearTriggered={clearTriggered}
                fieldLabel="Domain"
                className="text-input"
                freeSolo={true}
                placeholder="Domain"
                name="domain"
                options={Domain}
                onBlur={formik.handleBlur}
                defaultValues={formik.values.domain}
                onChange={(newValue) => {
                  formik.setFieldValue("domain", newValue);
                }}
                // autocompleteOuterDiv={{ width: "95%" }}
                showDownArrowIcon={true}
              />
            </StyledDOM.StyledAutocompleteContainer>
            <StyledDOM.StyledJobTextField
              className="text-field"
              style={{ margin: "15px 0 35px 0" }}
            >
              <StyledDOM.AutoCompletePara>
                <CustomAutocomplete
                  clearTriggered={clearTriggered}
                  fieldLabel="Client"
                  className="text-input"
                  freeSolo={true}
                  placeholder="Client"
                  name="client"
                  onBlur={formik.handleBlur}
                  options={client_name}
                  onChange={(newValue) => {
                    formik.setFieldValue("client", newValue);
                  }}
                  defaultValues={formik.values.client}
                  showDownArrowIcon={true}
                  containerStyle={{
                    marginBottom: isScreenLessThan991
                      ? "20px"
                      : "default-margin",
                  }}
                  required={true}
                  error={formik.touched.client && formik.errors.client}
                  errorMessage={formik.errors.client}
                />
                <StyledDOM.StyledJobPara>Create Client</StyledDOM.StyledJobPara>
              </StyledDOM.AutoCompletePara>
              <StyledDOM.AutoCompletePara>
                <StyledDOM.StyledJobTextInput
                  label="Contact Name"
                  placeholder="Contact Name"
                  type="text"
                  name="contactName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactName}
                  showDownArrowIcon={true}
                  error={
                    formik.touched.contactName && formik.errors.contactName
                  }
                  errorMessage={formik.errors.contactName}
                  containerStyle={{ marginBottom: "0" }}
                />

                <StyledDOM.StyledJobPara>
                  Create Client Contact
                </StyledDOM.StyledJobPara>
              </StyledDOM.AutoCompletePara>
            </StyledDOM.StyledJobTextField>
            <StyledDOM.StyledJobTextFields className="text-field">
              <StyledDOM.StyledJobTextInput
                label="No of Position"
                placeholder="No of Position"
                className="text-input"
                name="position"
                onChange={formik.handleChange}
                value={formik.values.position}
                onBlur={formik.handleBlur}
                error={formik.touched.position && formik.errors.position}
                errorMessage={formik.errors.position}
              />
              <StyledDOM.StyledJobTextInput
                className="text-input"
                label="Experience"
                placeholder="Experience"
                name="experience"
                onChange={formik.handleChange}
                value={formik.values.experience}
                onBlur={formik.handleBlur}
                error={formik.touched.experience && formik.errors.experience}
                errorMessage={formik.errors.experience}
                errorClassName="error-message"
                containerStyle={{ Width: "90%" }}
              />
              <StyledDOM.StyledJobTextInput
                className="text-input"
                label="Salary"
                placeholder="Salary"
                name="salary"
                onChange={formik.handleChange}
                value={formik.values.salary}
                onBlur={formik.handleBlur}
                error={formik.touched.salary && formik.errors.salary}
                errorMessage={formik.errors.salary}
                containerStyle={{ Width: "90%" }}
              />
            </StyledDOM.StyledJobTextFields>
            <StyledDOM.StyledSkillContainer
              className="skill-container-div"
              style={{ marginBottom: "25px" }}
            >
              <CustomAutocomplete
                clearTriggered={clearTriggered}
                fieldLabel="Primary Skills"
                className="text-input"
                tags={true}
                placeholder="Primary Skills"
                name="skill"
                options={skills}
                onBlur={formik.handleBlur}
                onChange={(newValue) => {
                  formik.setFieldValue("skill", newValue);
                }}
                defaultValues={formik.values.skill}
                // autocompleteOuterDiv={{
                //   width: "99%",
                // }}
                // listBoxStyle={{ width: "56%" }}
                customstyle={{ height: "40px" }}
                InputWrapperStyle={{
                  padding: "4px 0",
                  height: "100px",
                  overflow: "auto",
                }}
              />
            </StyledDOM.StyledSkillContainer>
            <StyledDOM.StyledRecuriterNoteContainer className="recuriter-container-div">
              <StyledDOM.StyledJobTextArea
                label="Recruiter Note"
                placeholder="Recuriter Note"
                className="recuriter-container"
                name="recuriternotes"
                onChange={formik.handleChange}
                value={formik.values.recuriternotes}
                rows={8}
                style={{ marginBottom: "25px" }}
              />
            </StyledDOM.StyledRecuriterNoteContainer>
            <DynamicMultipleSelectCheckmarks
              options={candidate}
              label="Assign to"
              placeholder="Assign to"
              value={formik.values.assignTo}
              onChange={(values) => formik.setFieldValue("assignTo", values)}
            />
            <StyledDOM.StyledTextEditordiv className="text-editor-div">
              <TextEditor
                placeholder="Job Description"
                buttonList={buttons}
                height="200px"
                handleImageUploadBefore={handleImageUploadBefore}
                onChange={(content) => {
                  formik.setFieldValue("jobDescription", content);
                }}
                resetTrigger={editorResetTrigger}
              />
            </StyledDOM.StyledTextEditordiv>
          </StyledDOM.StyledJobInnerFirstContainer>
          <StyledDOM.StyledJobInnerSecondContainer className="job-second-container">
            <StyledDOM.StyledDateTargetContainer className="target-container">
              <StyledDOM.StyledJobCustomDataPickerContainer>
                <CustomDatePicker
                  label="Expiry By"
                  dateFormat="MM/yyyy"
                  backgroundColor="#ecf4ff"
                  labelColor="black"
                  divStyle={{ width: "100%", marginBottom: "0px" }}
                  form={formik}
                  placeholder="Expiry By"
                  field={{
                    name: "expiryby",
                    value: formik.values.expiryby,
                    onChange: (e) => {
                      formik.setFieldValue("expiryby", e.target.value);
                      console.log("expiryby", e.target.value);
                    },
                    onBlur: () => {
                      formik.setFieldTouched("expiryby", true);
                    },
                  }}

                // errorMessage={
                //   formik.touched.expiryby && formik.errors.expiryby
                // }
                />
              </StyledDOM.StyledJobCustomDataPickerContainer>
              <StyledDOM.StyledJobSecondTextContainer>
                <StyledDOM.StyledJobSecondTextInput
                  containerStyle={{ marginBottom: "10px" }}
                  label="Target Count"
                  placeholder="Target Count"
                  className="text-input-second"
                  name="targetcount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.targetcount}
                  error={
                    formik.touched.targetcount && formik.errors.targetcount
                  }
                  errorMessage={formik.errors.targetcount}
                  errorClassName="error-message"
                  backgroundColor="#ecf4ff"
                  labelColor="black"
                />
              </StyledDOM.StyledJobSecondTextContainer>
            </StyledDOM.StyledDateTargetContainer>

            <StyledDOM.StyledFileUploadTextInput
              containerStyle={{ margin: "10px 0px" }}
              placeholder="Attach Document"
              className="text-input-second"
              name="jobdocument_attach"
              value={formik.values.jobdocument_attach}
              onChange={(fileName) => {
                formik.setFieldValue("jobdocument_attach", fileName);
              }}
              Uploadiconstyle={{ top: "34%" }}
              cancelIconTop="22px"
              label="Attach Document"
              backgroundColor="#ecf4ff"
              labelColor="black"
              activeicon={true}
            />
            <CustomAutocomplete
              clearTriggered={clearTriggered}
              fieldLabel="Location"
              className="text-input-second"
              freeSolo={true}
              placeholder="Location"
              options={locations}
              name="location"
              onBlur={formik.handleBlur}
              onChange={(newValue) =>
                formik.setFieldValue("location", newValue)
              }
              defaultValues={formik.values.location}
              // autocompleteOuterDiv={{ width: "100%" }}
              // listBoxStyle={{ width: "29%" }}
              showDownArrowIcon={true}
              downArrow={false}
              iconStyle={{ color: "blue" }}
              backgroundColor="#ecf4ff"
              labelColor="black"
            />

            <CustomAutocomplete
              clearTriggered={clearTriggered}
              fieldLabel="Employment Type"
              className="text-input-second"
              freeSolo={true}
              onBlur={formik.handleBlur}
              placeholder="Employment Type"
              name="employment_type"
              options={employment_types}
              onChange={(newValue) => {
                formik.setFieldValue("employment_type", newValue);
              }}
              defaultValues={formik.values.employment_type}
              // listBoxStyle={{ width: "29%" }}
              autocompleteOuterDiv={{ marginTop: "25px" }}
              showDownArrowIcon={true}
              downArrow={false}
              iconStyle={{ color: "blue" }}
              backgroundColor="#ecf4ff"
              labelColor="black"
            />
            <StyledDOM.DynamicCheckboxContainer>
              <DynamicCheckbox
                color="#0D52A7"
                labelStyle={{ color: "#0D52A7" }}
                label="Remote Working"
                name="remoteworking"
                checked={formik.values.remoteworking}
                onChange={(e) =>
                  formik.setFieldValue("remoteworking", e.target.checked)
                }
              />
            </StyledDOM.DynamicCheckboxContainer>
            <StyledDOM.StyledSocialMediadiv className="social-media">
              <StyledDOM.StyledSocialMediaHeading>
                Publish in Social Media
              </StyledDOM.StyledSocialMediaHeading>
              <StyledDOM.StyledSocialMediaCheckbox className="social">
                <DynamicCheckbox
                  color="#0D52A7"
                  labelStyle={{
                    color: "#0D52A7",
                  }}
                  label="LinkedIn"
                  checked={formik.values.linkedin}
                  name={linkedIn}
                  onChange={(e) =>
                    formik.setFieldValue("linkedin", e.target.checked)
                  }
                  icon={
                    <Icon style={{ height: "fit-content", cursor: "pointer" }}>
                      <img src={linkedIn} alt="LinkedIn Icon" />
                    </Icon>
                  }
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                  }}
                />
                <DynamicCheckbox
                  color="#0D52A7"
                  labelStyle={{
                    color: "#0D52A7",
                  }}
                  name="twitter"
                  label="Twitter"
                  checked={formik.values.twitter}
                  onChange={(e) =>
                    formik.setFieldValue("twitter", e.target.checked)
                  }
                  icon={
                    <Icon style={{ height: "fit-content", cursor: "pointer" }}>
                      <img src={twitter} alt="twitter Icon" />
                    </Icon>
                  }
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                  }}
                />
                <DynamicCheckbox
                  color="#0D52A7"
                  labelStyle={{
                    color: "#0D52A7",
                  }}
                  label="FaceBook"
                  name="facebook"
                  checked={formik.values.facebook}
                  onChange={(e) =>
                    formik.setFieldValue("facebook", e.target.checked)
                  }
                  icon={
                    <Icon style={{ height: "fit-content", cursor: "pointer" }}>
                      <img src={facebook} alt="Facebook Icon" />
                    </Icon>
                  }
                  containerStyle={{
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </StyledDOM.StyledSocialMediaCheckbox>
            </StyledDOM.StyledSocialMediadiv>
          </StyledDOM.StyledJobInnerSecondContainer>
        </StyledDOM.StyledJobMainContainer>
        <StyledDOM.StyledJobButtonDiv className="button-div">
          <Button
            label="Cancel"
            isCancel={true}
            event={handlecancel}
            style={{
              color: "#7B7A7A",
              background: "#F5F4F3",
              border: "1px solid #ACACAC",
            }}
          />
          <Button
            label="Create"
            event={() => {
              if (formik && Object.keys(formik.errors).length > 0) {
                scrollToErrorField(formik);
              }
              formik.handleSubmit();
            }}
          />
        </StyledDOM.StyledJobButtonDiv>
      </StyledDOM.StyledJobContainer>
    </>
  );
}
