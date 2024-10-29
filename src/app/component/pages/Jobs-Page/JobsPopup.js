import React, { useContext } from "react";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import TextArea from "../../../common/TextArea/TextArea";
import Button from "../../../common/Button/Button";
import { ReactComponent as CancelIcon } from "../../../../assets/image/Close-icon.svg";
import * as Yup from "yup";
import {
  Popupscroll,
  useFocusFirstInput,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions";
import { useNavigate } from "react-router-dom";
import { DynamicContext } from "../../../context/DynamicContext";

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
  zIndex: "9999999",
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
  fontSize: "14px",
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
  justifyContent: "center",
  columnGap: "10px",
});

export const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "20px",
});
export const StyledPopupCancelIcon = styled("div")({
  display: "flex",
  //   alignItems: "flex-end",
  justifyContent: "flex-end",
  cursor: "pointer",
});
export const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
function JobsPopup() {
  const navigate = useNavigate();
  const { setSelectedOption } = useContext(DynamicContext);
  const validationSchema = Yup.object().shape({
    jobtitle: Yup.string().matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets are allowed in jobtitle."
    ),
  });
  const formik = useFormik({
    initialValues: {
      jobtitle: "",
      jobCode: "",
      jobDesc: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const trimmedvalues = handleCustomTrim(values)
      console.log("Form data onsubmit", trimmedvalues);
      formik.resetForm();
      setSelectedOption(null);
    },
  });
  // const handlePageChange = () => {
  //   setMoreOptions(true);
  // };
  Popupscroll(true);
  useFocusFirstInput();
  return (
    <>
      <StyledPopupMainContainer>
        <StyledPopupInnerContainer>
          <StyledHeader>
            <StyledHeading>Create Job</StyledHeading>
            <StyledPopupCancelIcon onClick={() => setSelectedOption(null)}>
              <CancelIcon />
            </StyledPopupCancelIcon>
          </StyledHeader>
          <StyledInputContainer>
            <StyledTextInput
              type="text"
              name="jobtitle"
              label="Job Title"
              placeholder="Job Title"
              onChange={formik.handleChange}
              value={formik.values.jobtitle}
              onBlur={formik.handleBlur}
              error={formik.touched.jobtitle && formik.errors.jobtitle}
              errorMessage={formik.errors.jobtitle}
            />
            <StyledTextInput
              type="text"
              name="jobCode"
              label="Job Code"
              placeholder="Job Code"
              onChange={formik.handleChange}
              value={formik.values.jobCode}
              onBlur={formik.handleBlur}
            />
          </StyledInputContainer>
          <StyledTextArea
            label="Job Description"
            placeholder="Job Description"
            name="jobDesc"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.jobDesc}
          />
          <StyledDiv>
            <StyledAnchor onClick={() => navigate("/create-job")}>
              More Options
            </StyledAnchor>
          </StyledDiv>
          <StyledButtonDiv>
            <Button
              label="Cancel"
              isCancel={true}
              event={() => setSelectedOption(null)}
            />
            <Button label="Create" event={formik.handleSubmit} />
          </StyledButtonDiv>
        </StyledPopupInnerContainer>
      </StyledPopupMainContainer>
    </>
  );
}

export default JobsPopup;
