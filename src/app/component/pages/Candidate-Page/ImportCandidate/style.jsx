import styled from "@emotion/styled";
import Button from "../../../../common/Button/Button"
export const StyledOuterDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
  border: "1px solid #ece9e9",
  margin: "10px",
  borderRadius: "5px",
  padding: "2vw",
  marginTop: "0px",
   "@media screen and (max-width:991px)": {
     flexDirection: "column",
     gap: "50px",
     paddingTop:"50px"
  },
});

export const StyledFileUploadContainer = styled("div")(({ isDragging }) => ({
  border: isDragging ? "2px dashed #0055a5" : "2px dashed #ccc",
  padding: "20px",
  width: "80%",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "auto",
  cursor: "pointer",
  margin: "auto",
  backgroundColor: isDragging ? "aliceblue" : "none"
}));
export const StyledFileOuterContainer = styled("div")({
  width: "80%",
  border: "1px solid #a39f9f",
  // margin: "auto",
  paddingBottom: "1vw",
  borderRadius: "5px",
  "@media screen and (max-width:991px)": {
    width: "100%",
  },
});
export const StyeldHeader2 = styled("h2")({
  margin: "20px",
});
export const StyledHeader3 = styled("h3")({
  display: "flex",
  justifyContent: "center",
});

export const StyledImgContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});
export const StyledImg = styled("img")({
  width: "60px",
});
export const StyledButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "30px",
  "@media screen and (max-width:900px)": {
    marginBottom: "10px",
  },
});
export const StyledUploadfilesContainer = styled("div")({
  padding: "15px",
  border: "1px solid #a39f9f",
  marginLeft: "2vw",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
   "@media screen and (max-width:991px)": {
     padding: "15px 6px",
     marginLeft: "0",
  },
});

export const StyledFileNameDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  columnGap: "20px",
  
    "@media screen and (max-width:991px)": {
      columnGap: "10px",
      fontSize: "14px",
  },
});

export const StyledCancelIcon = styled("img")(({ isUploading }) => ({
 cursor: isUploading ? "no-drop": "pointer",
}));

export const StyledMainFileContainer = styled("div")({
  width: "60%",
  height: "550px",
  overflowY: "auto",
  padding: " 0px 10px",
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
   "@media screen and (max-width:991px)": {
     width: "100%",
     padding:"0 5px"
  },
});

export const StyledHeaderOuterDiv = styled("div")(({ loading}) => ({
  // opacity: loading ? "0.4" : "unset",
 display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const StyledBackHeader3 = styled("h3")({
  color: "rgb(13, 82, 167)",
  fontWeight: "400",
  fontSize: "19px",
  display: "flex",
  justifyContent: "flex-start",
  height: " 100%",
  gap: "16px",
  marginRight: "30px",
  cursor: "pointer",
});

export const StyledDetailsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "auto",
  width: "85%",
  "@media screen and (max-width:900px)": {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
});
export const StyledPTag = styled("p")({
  fontSize: "14px",
});

export const StyledSuccessParseMessage = styled("div")({
  color: "green",
   marginLeft: "10px",
})

export const StyledErrorParseMessage = styled("div")({
  color: "red",
   marginLeft: "10px",
})

export const StyledUploadButton = styled(Button)(({ disabled}) => ({
  backgroundColor: disabled ? "#acb1b7" : "#0D52A7",
  color: "white",
  padding: "12px 32px",
  border: "none",
  borderRadius: "8px",
 fontWeight: "500",
  fontSize: "14px",
}));

export const StyledImportentContainer = styled("div")({
     border: "1px solid #f0f7fe",
    background: "#f0f7fe",
   padding: "16px",
  height: "fit-content",
  borderRadius: "5px",
  overflowY: "hidden",
})

export const StyledListItems = styled("li")(({ isSpecial }) => ({
  color: isSpecial ? "#C80000" : "#0057a3",
}));

export const StyledListItemHeader = styled("h3")({
color: "#0055a5",
})
export const StyledUlItems = styled("ul")({
    marginBottom: "34px"
})
