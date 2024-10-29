import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import TextArea from "../../../common/TextArea/TextArea";
import Button from "../../../common/Button/Button";
import PhoneNumberInput from "../../../common/PhoneNumberInput/PhoneNumberInput.jsx";
import { ReactComponent as CloseIcon } from "../../../../assets/image/Close-icon.svg";
import staticValues from "../../../../assets/json/staticData.json";
import {
  Popupscroll,
  getUniqueOptions,
  useFocusFirstInput,
  phoneNumberValidation,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { DynamicContext } from "../../../context/DynamicContext";
import DynamicSelectInput from "../../../common/SelectInput/SelectInput";

export const StyledPopupMainContainer = styled("div")({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "grid",
  placeItems: "center",
  background: "rgba(0, 0, 0, 0.3)",
  opacity: "1",
  zIndex: "999",
});

export const StyledPopupInnerContainer = styled("div")({
  background: "#fff",
  width: "500px",
  height: "auto",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
  animation: "open-frame 0.3s linear",
  padding: "20px",
  "@media screen and (max-width:600px)": {
    width: "300px",
  },
});

export const StyledMessage = styled("p")({
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#222",
  cursor: "default",
});

export const StyledInputContainer = styled("div")({
  display: "flex",
  gap: "10px",
});

export const StyledHeading = styled("h3")({
  margin: "0px",
  marginBottom: "25px",
});

export const StyledAnchor = styled("a")({
  textDecoration: "none",
  color: "#0F3FE9",
  cursor: "pointer",
});

export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
});

export const StyledTextArea = styled(TextArea)({
  width: "100%",
  height: "100px",
  resize: "none",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  "&:focus-within": {
    outline: "none",
  },
    '&::-webkit-scrollbar': {
    width: "10px",
    height: "10px", 
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: "5px",
    backgroundColor: "#e6f1f5",
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: "5px",
    backgroundColor: "#1b52a729", 
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: " #1b52a742",
  },
  '&::-webkit-scrollbar-thumb:active': {
    backgroundColor: "#1b52a740",
  },
  "@media screen and (min-width:768px) and (max-width:1220px)": {
    padding: "6px 0px 0px 13px",
  },
});

export const StyledButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  columnGap: "10px",
});

export const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "40px",
});

export const StyledPopupCancelIcon = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  cursor: "pointer",
});

export const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

function ClientPopup() {
  const navigate = useNavigate();
  const { setSelectedOption } = useContext(DynamicContext);
  const { staticData = {} } = staticValues || {};
  const { country = [] } = staticData || [];

  const [clearTriggered, setClearTriggered] = useState(false);

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
  }, [clearTriggered]);
  const validationSchema = Yup.object().shape({
    clientName: Yup.string().matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets are allowed in client name."
    ),
    email: Yup.string()
      .email("Invalid email address.")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address."
      ),
    clientContact: Yup.string()
      .transform((value) => value?.trim())
      .matches(
        /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
        "Invalid phone number format."
      )

      .min(6, "Contact number must be atleast 6 digits.")
      .max(20, "Contact number must not be over 20 digits."),
    contact: Yup.string()
      .transform((value) => value?.trim())
      .matches(
        /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
        "Invalid phone number format."
      )

      .min(6, "Contact number must be atleast 6 digits.")
      .max(20, "Contact number must not be over 20 digits."),
  });
  const formik = useFormik({
    initialValues: {
      clientName: "",
      clientContact: "",
      contact: "",
      email: "",
      country: "",
      clientNote: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form data onsubmit", handleCustomTrim(values));
      formik.resetForm();
      setClearTriggered(true);
      setSelectedOption(null);
    },
  });
  const handlePhoneInputChange = React.useCallback(
    (phone, country) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("clientContact", phone);
      formik.setFieldTouched("clientContact", true, false);
      formik.validateField("clientContact");
    },
    [formik]
  );
  const uniqueCountryOptions = getUniqueOptions(country);
  Popupscroll(true);
  useFocusFirstInput();
  return (
    <>
      <StyledPopupMainContainer className="clientpopup-maincontainer">
        <StyledPopupInnerContainer>
          <StyledHeader>
            <StyledHeading>Create Client</StyledHeading>
            <StyledPopupCancelIcon onClick={() => setSelectedOption(null)}>
              <CloseIcon />
            </StyledPopupCancelIcon>
          </StyledHeader>
          <StyledInputContainer>
            <StyledTextInput
              style={{ marginBottom: "0 !important" }}
              type="text"
              name="clientName"
              label="Client Name"
              placeholder="Client Name"
              onChange={formik.handleChange}
              value={formik.values.clientName}
              onBlur={formik.handleBlur}
              error={formik.touched.clientName && formik.errors.clientName}
              errorMessage={formik.errors.clientName}
            />
            {/* <StyledTextInput
              type="text"
              name="clientContact"
              label="Client Contact"
              placeholder="Client Contact"
              onChange={formik.handleChange}
              value={formik.values.clientContact}
              onBlur={formik.handleBlur}
              error={
                formik.touched.clientContact && formik.errors.clientContact
              }
              errorMessage={formik.errors.clientContact}
            /> */}
            <PhoneNumberInput
              value={formik.values.clientContact}
              onChange={handlePhoneInputChange}
              onBlur={formik.handleBlur}
              error={formik.errors.clientContact}
              touched={formik.touched.clientContact}
              placeholder="Client Contact"
              label="Client Contact"
              width="100%"
              height="40px"
              marginBottom="30px"
              countryListWidth="250px"
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledTextInput
              type="text"
              name="contact"
              label="Contact"
              placeholder="Contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
              onBlur={formik.handleBlur}
              error={formik.touched.contact && formik.errors.contact}
              errorMessage={formik.errors.contact}
            />
            <StyledTextInput
              type="text"
              name="email"
              label="Email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              errorMessage={formik.errors.email}
            />
          </StyledInputContainer>
          <DynamicSelectInput
            label="Country"
            options={uniqueCountryOptions}
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
          />
          <StyledTextArea
            label="Client Note"
            containerStyle={{ marginTop: "25px" }}
            placeholder="Client Note"
            name="clientNote"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.clientNote}
          />
          <StyledDiv>
            <StyledAnchor onClick={() => navigate("/create-client")}>
              More Options
            </StyledAnchor>
            <StyledButtonDiv>
              <Button
                label="Cancel"
                isCancel={true}
                event={() => setSelectedOption(null)}
              />
              <Button label="Create" event={formik.handleSubmit} />
            </StyledButtonDiv>
          </StyledDiv>
        </StyledPopupInnerContainer>
      </StyledPopupMainContainer>
    </>
  );
}

export default ClientPopup;
