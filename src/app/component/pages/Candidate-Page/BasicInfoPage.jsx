import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import TextArea from "../../../common/TextArea/TextArea";
import FileUploaderTextfield from "../../../common/FileUpload-Textfield/FileUploadTextfield";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
export const StyledLabel = styled('label')({
  display: 'block',
  marginBottom: '5px',
  fontSize: '15px',
  fontWeight: '500',
});
export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px"
});
export const StyledBasicInfoContainer = styled('div')({
  display: 'grid',
  columnGap: '40px',
  width: '100%',
});
export const StyledBasicInfoFirstContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '50px',
  // rowGap: "20px",
  width: '100%',
  '@media screen and (max-width:768px)': {
    gridTemplateColumns: "repeat(1,1fr)"
  }
});
export const StyledSelect = styled('select')({
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
});

export const StyledHorizontalRuler = styled("hr")({
  width: "100%",
  border: "1px solid black",
  margin: "25px 0px 0px 0px",
})

export const StyledBasicInfoSubhead = styled("div")({
  fontSize: "20px",
  fontWeight: "600",
  margin: "30px 0px"
})

export const StyledRadioContainer = styled('div')({
  display: 'flex',
  gap: '2vw',
});

export const StyledGenderContainer = styled('div')({
  display: 'flex',
  alignItems: "center",
  gap: "1vw",
  '@media screen and (max-width:768px)': {
    marginBottom: "20px",
    gap: "2vw",
  }
});

export const StyledGenderLabel = styled('label')({
  position: 'relative',
  fontWeight: '600'

});
export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "10px",
  // marginBottom: "4px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
})
export const StyledFileUploadTextInput = styled(FileUploaderTextfield)({
  width: "100%",
  padding: "10px",
  marginBottom: "25px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
})
export const StyledButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "30px",
  '@media screen and (max-width:768px)': {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  }
});

export const StyledNextButtonDiv = styled("div")({
  padding: "20px 0px",
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
})

export const StyledAgeContainer = styled("div")({
  display: "flex",
  gap: "10px",
  '@media screen and (max-width:991px)': {
    flexDirection: "column",
    gap: "20px"
  }
})

export const StyledAge = styled(TextInput)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",

})
export const StyledCandidateRemark = styled(TextArea)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
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
});
