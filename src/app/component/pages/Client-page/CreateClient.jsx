import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import TextArea from "../../../common/TextArea/TextArea";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import FileUploaderTextfield from "../../../common/FileUpload-Textfield/FileUploadTextfield";

export const StyledOuterDiv = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  columnGap: "30px",
  width: "95%",
  margin: "0 auto",
  padding: "20px 10px",
  "@media screen and (max-width:991px)": {
    gridTemplateColumns: "1fr",
    gap: "50px"
  }
})
export const StyledClientContainer = styled("div")({
  background: "#ECF4FF",
  padding: "30px",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  // gap: "20px",
  borderRadius: "5px"
})
export const StyledContactContainer = styled("div")({
  padding: "30px",
  boxShadow: "2px 2px 7px 2px #e0e0e0",
  borderRadius: "5px"
})
export const StyledTextinput = styled(TextInput)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  // marginBottom: '4px',
  "@media screen and (max-width:600px)": {
    width: "100%",
  },
});
export const StyledFileUploadTextInput = styled(FileUploaderTextfield)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",

  "@media screen and (max-width:600px)": {
    width: "100%",
  },
})
export const StyledTextArea = styled(TextArea)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  resize: "none",
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
})
export const StyledAutoComplete = styled(CustomAutocomplete)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  resize: "none",
  marginTop: "15px",
  height: "150px",
  overflow: "auto"
})

export const StyledTextInputContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap:"15px"

})
export const StyledAutoCompleteContainer = styled("div")({
  width: "100%",
  display: "flex",
  // gridTemplateColumns: "1fr 1fr 1fr",
  justifyContent: "space-between",
  gap: "20px",
  // marginTop: "5px",
  marginBottom: "25px"
})
export const StyledButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "30px",
  marginTop: "9vw",
});

export const StyledH2 = styled("h2")({
  width: "95%",
  margin: "30px auto",
})

export const StyledReminderContainer = styled("div")({
  marginTop: "20px"
})

export const StyledCheckboxContainer = styled("div")({
      marginLeft: "-11px",
  marginBottom: "25px",
    marginTop:"20px"
})