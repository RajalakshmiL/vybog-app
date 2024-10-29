import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import TextArea from "../../../common/TextArea/TextArea";
import TextEditor from "../../../common/TextEditer/TextEditer";
import FileUploaderTextfield from "../../../common/FileUpload-Textfield/FileUploadTextfield";

export const StyledJobContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});
export const StyledJobHeading = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px ",
});

export const AutoCompletePara = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  width: "100%",
  position: "relative",
  "@media screen and (max-width:600px)": {
    marginBottom: "25px",
  },
});

export const StyledJobPara = styled("p")({
  fontSize: "14px",
  color: "#0D52A7",
  cursor: "pointer",
  margin: "0",
  marginTop: "5px",
  position: "absolute",
  top: "35px",
  "@media screen and (max-width:420px)": {
    fontSize: "10px",
  },
});
export const StyledSocialMediaHeading = styled("h2")({
  fontSize: "16px",
  fontWeight: "600",
  color: "#0D52A7",
});

export const StyledSocialMediaCheckbox = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  "@media screen and (max-width:1200px)": {
    gap: "10px",
  },
  "@media screen and (max-width:991px)": {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "50px"
  },

  "@media screen and (max-width:550px)": {
    flexDirection: "column",
    gap: "0"
  },
});

export const StyledJobMainContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  padding: "20px",
  justifyContent: "space-around",
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    rowGap: "30px",
  },
});
export const StyledJobInnerFirstContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "65%",
  border: "1px solid #0000000D",
  boxShadow: "0px 4px 10px 0px #0000000D",
  padding: "20px",
  borderRadius: "10px",
  marginRight: "20px",
  "@media screen and (max-width:991px)": {
    width: "90%",
  },
});
export const StyledJobTextField = styled("div")({
  display: "flex",
  columnGap: "10px",
  width: "100%",
  //padding: "10px 0px",
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    // gap: "25px",
  },
});

export const StyledAutocompleteContainer = styled("div")({
  display: "flex",
  columnGap: "10px",
  width: "100%",
  //padding: "10px 0px",
  marginBottom:"10px",
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    rowGap: "35px",
  },
});

export const StyledJobTextFields = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  //padding: "10px 0px",
  // marginBottom:"10px",
  gap: "10px",
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    gap: "15px",
  },
});
export const StyledJobTextInput = styled(TextInput)({
  width: "100%",
  padding: "10px",

  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});
export const StyledTextPara = styled("div")({
  display: "grid",
  gridTemplateColumns: "auto 265px",
  width: "100%",
  justifyItems: "center",
  marginBottom: "15px",
  marginTop: "-10px",
});
export const StyledTextFieldInner = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "90%",
});
export const StyledSkillContainer = styled("div")({
  width: "100%",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
  //padding: "10px 0px",
  marginBottom:"15px",
});
export const StyledRecuriterNoteContainer = styled("div")({
  width: "100%",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
  //padding: "10px 0px",
  // marginBottom:"15px",
});
export const StyledJobTextArea = styled(TextArea)({
  width: "100%",
  resize: "none",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
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

});
export const StyledTextEditordiv = styled("div")({
  width: "100%",
});
export const StyledJobTextEditor = styled(TextEditor)({
  width: "100%",
  resize: "none",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});
export const StyledJobInnerSecondContainer = styled("div")({
  width: "35%",
  backgroundColor: "#ECF4FF",
  padding: "20px",
  height: "fit-content",
  borderRadius: "10px",
  "@media screen and (max-width:991px)": {
    width: "90%",
  },
});
export const StyledJobInnerSecondContainerAutocomplete = styled("div")({
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});
export const StyledJobButtonDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  width: "63%",
  marginBottom: "10px",
});
export const StyledSocialMediadiv = styled("div")({
  display: "block",
});
export const StyledFileUploadTextInput = styled(FileUploaderTextfield)({
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});
export const StyledJobSecondTextContainer = styled("div")({
  //padding: "10px 0px",
  // marginBottom:"15px",
  width: "100%",
});
export const StyledJobSecondTextInput = styled(TextInput)({
  width: "100%",
  padding: "10px",
  // marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});
export const StyledJobCustomDataPickerContainer = styled("div")({
  // padding: "10px 0px ",
  width: "100%",
});

export const StyledDateTargetContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  columnGap: "10px",
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
  },
});
export const DynamicCheckboxContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});
