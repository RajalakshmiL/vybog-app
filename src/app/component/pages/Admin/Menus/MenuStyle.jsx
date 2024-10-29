import styled from "@emotion/styled";
import TextInput from "../../../../common/TextField/TextField";
import Button from "../../../../common/Button/Button"

export const StyledMenuHeading = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px ",
});
export const StyledPriorityHeading = styled("h3")({
  fontWeight: "600",
  padding: "0px 30px ",
 color: "#1b52a7",
});

export const StyledHeaderCountSpan = styled("span")({
  // marginTop: "10px",
  color: "#9FB0C2",
  fontSize: "15px",
});
export const StyledColumnHeaderWithIcon = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px" 
})
export const StyledMenuSubHeading = styled("h6")({
  fontWeight: "600",
  // padding: "0px 20px ",
  color: "#908484",
});
export const StyledTableActiveSpan = styled("span")(({ isClickable }) => ({
  cursor: "pointer",
  display: "flex",
  width: "fit-content",
  whiteSpace: "break-spaces",
  color: "#0066ff",
  "&:hover": {
    borderBottom: isClickable ? "1px solid #0066ff" : ""
  }
}))

export const StyledHeaderSpan = styled("span")(({ subMenu }) => ({
  marginLeft: subMenu ? "15px" : "0px",
  fontWeight: subMenu ? "" : "600",
  fontSize: subMenu ? "" : "14px",
  color: subMenu ? "black" : "#1b52a7",
}))

export const StyledSelectorDiv = styled("div")({
  width: "40% !important",
})

export const StyledPageSelectorContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "10px",
})

export const StyleMappingMainContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "15px",
  rowGap: "15px",
  margin: "10px",
  "@media screen  and (min-width:600px) and (max-width:991px)": {
    gridTemplateColumns: "1fr",
  },
});

export const StyledMappingContainer = styled("div")({
  border: "1px solid #e4e4e4",
  padding: "10px",
  borderRadius: "5px",
  height: "200px",
  minHeight: "200px",
  overflowY: "auto",
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

export const StyledChipContainer = styled("div")({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
})

export const StyledChips = styled("span")({
  border: "1px solid #93c6f2;",
  borderRadius: "20px",
  padding: "10px",
  background: "#f0f8ff",
  fontSize: "13px",
  fontWeight: "600",
  color: "#5585bc",
  "&:hover": {
    background: "#0079cf",
    color: "white",
    cursor: "pointer",
  }
})

export const StyledInnerHeadings = styled("h4")({
  color: "#1b52a7",
  width: "fit-content",
  borderBottom: "2px solid #1b52a7",
})

export const StyledButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row-reverse"
})

export const StyledMenuMappingHeader = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
})

export const StyledHeaderDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
})

export const StyledEmployeeName = styled("h5")({
  color: "#1b52a7",
})

export const StyledAssignButton = styled("div")({
  textAlign: "center",
  marginBottom: "10px",
})

export const StyledErrorSubMenu = styled("p")({
  textAlign: "center",
  color: "#e43030"
})

export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
});

export const StyledSelectInputContainer = styled("div")({
  marginBottom: "20px"
});

// Assign to users Dialog css

export const StyledContent = styled("div")({
  padding: "10px",
  maxHeight: "350px",
  overflowY: "auto",
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

export const StyledDesignationContainer = styled("div")({
  marginBottom: "20px",
  padding: "10px",
  border: "1px solid #e0e0e0",
  borderRadius: "5px",
});

export const StyledUsersContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
});

export const StyledUserTag = styled("div")({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f0f8ff",
  padding: "2px 10px",
  borderRadius: "10px",
  border: "1px solid #d0d7de",
});

export const StyledUserHeader = styled("div")({
  borderBottom: "1px solid #e0e0e0",
  marginBottom: "10px",
})
export const StyledSearchContainer = styled("div")({
  display: "flex",
  width: "50%",
  alignItems: "flex-start",
  gap: "10px",
  margin: "10px",
  // border: "1px solid #e4e4e4",
  borderRadius: "5px",
  padding: "10px",
   "@media screen and (min-width:600px) and (max-width:991px)": {
     margin: "0px",
     width:"80%",
  },
})

export const StyledMainSearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent:"space-between",
  gap: "40px",
  marginBottom: "10px",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    flexDirection: "column",
    gap: "10px",
    alignItems:"flex-start",
  },
})
export const StyledButtonStageDiv = styled("div")({
  display: "flex",
  gap: "10px",
  flexDirection: "row",
  alignItems: "center",
  // width: "50%",
  justifyContent: "flex-end",
  margin: "0px 25px 25px",
//  marginRight: "30px",
   "@media screen and (min-width:600px) and (max-width:991px)": {
    justifyContent:"flex-end",
    gap: "10px",
    width:"95%",
  },
  
})
export const StyledSkillSearchContainer = styled("div")({
  display: "flex",
  width: "75%",
  alignItems: "flex-start",
  gap: "20px",
  margin: "10px",
  borderRadius: "5px",
  padding: "10px",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    flexDirection: "column",
    width:"95%",
  },
  "@media screen and (min-width:992px) and (max-width:1024px)": {
    width:"70%",
  }
});

export const StyledSkillMainSearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "10px",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    flexDirection: "column",
    gap: "10px",
    alignItems:"flex-start",
  },
  //   "@media screen and (min-width:992px) and (max-width:1024px)": {
  //   flexDirection: "column",
  //   gap: "10px",
  //   alignItems:"flex-start",
  // },
 
});
export const StyledDivButton = styled("div")({
  display: "flex",
  gap: "10px",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    justifyContent: "flex-end",
    width:"100%",
  },
    "@media screen and (min-width:992px) and (max-width:1024px)": {
    justifyContent: "flex-end",
    width:"100%",
  }
  
})
export const StyledSkillButton = styled("div")({
  display: "flex",
  flexDirection: "flex-end",
  // width: "15%",
  // padding: "0px 10px",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    justifyContent: "flex-end",
    width: "95%",
  },
  "@media screen and (min-width:992px) and (max-width:1024px)": {
    justifyContent: "flex-end",
    width: "95%",
  },
});
export const StyledSkillTableContainer = styled("div")({
  width: "70%",
  display: "flex",
   "@media screen and (min-width:600px) and (max-width:991px)": {
   
    width: "100%",
  },
})
export const StyledSkillNotesContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  maxWidth: "25%",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  fontSize: "14px",
  color: "#333",
  lineHeight: 1.6,

  "@media screen and (min-width:600px) and (max-width:991px)": {
    maxWidth: "90%",
    margin:"auto",
  },
});


export const StyledConvertContainer = styled("div")({
  display: "flex",
   "@media screen and (min-width:600px) and (max-width:991px)": {
     flexDirection: "column-reverse",
     gap:"20px",
  },
})

export const StyledInnerSkillNotes = styled("span")({
  display: "flex",
    flexWrap: "wrap",
  gap: "15px",
    marginBottom: "10px",
})

export const StyledInnerHighlightSpan = styled("span")({
      color: "#8d0404d6",
    fontWeight: "600",
})
export const StyledCheckBoxsScrollContainer = styled("div")({
      display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    border: "1px solid #e4e4e4",
    borderRadius: "5px",
    maxHeight: "250px",
    overflowY: "scroll",
  marginBottom: "20px",
  "@media screen and (min-width:600px) and (max-width:991px)":{
    gridTemplateColumns:"1fr 1fr",
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
    backgroundColor: "#1b52a742",
  },
  '&::-webkit-scrollbar-thumb:active': {
    backgroundColor: "#1b52a740",
  },
})

export const StyledLightIconContainer = styled("div")({
  display: "flex",
    alignItems: "center",
    margin: "10px",
    gap: "6px",
    marginTop: "-20px",
  marginLeft: "15px",
   
    
})

export const StyledLightIcon = styled("img")({
    width: "2.5%",
    position: "relative",
    top: "-5px",
})

export const StyledLightIconText = styled("h4")({
  color: "#E7A200",
     "@media screen and (min-width:600px) and (max-width:712px)": {
    width:"60%"
  },
})

export const StyledActivatePopupHeader = styled("span")({
  color:"#0D52A7"
})

export const StyledAddingButton = styled(Button)({
  backgroundColor: "white",
  color: "#00529f",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "1px solid #9f9797",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
"&:hover": {
  backgroundColor: "#00529f",
  color:"white"
  },
});

export const StyledAddingButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignContent: "flex-end",
  gap: "25px",
  marginRight: "30px",
  width:"25%",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    justifyContent: "flex-end",
    width: "97%",
    marginBottom:"-40px",
  },
});
export const StyledAddingButtonCountryContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignContent: "flex-end",
  gap: "25px",
  marginRight: "30px",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    justifyContent: "flex-end",
    width: "97%",
    marginBottom:"-40px",
  },
});


export const StyledConnectionContainer = styled("div")({
    margin: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "35px",
    rowGap: "10px",
    border: "1px solid #e4e4e4",
    padding: "30px",
    borderRadius: "5px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
})

export const StyledConnectionButtonContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  marginTop: "30px",
    marginBottom: "30px",
})

export const StyledEmailTempleteContainer = styled("div")({
    padding: "25px",
    margin: "20px",
    border: "1px solid #e4e4e4",
    borderRadius: "5px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
})

export const StyledEmailTempleteFields = styled("div")({
 display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "30px",
})

export const StyledComposeSideSpan = styled("span")({
   display: "flex",
    justifyContent: "flex-end",
    marginRight: "12.5vw",
    marginBottom: "10px",
color: "#004b9e"
})

export const StyledComposeEditorContainer = styled("div")({
  margin:"15px"
})

export const StyledComposeJoinButtons = styled("div")({
 position: "relative",
    right: "46.5vw",
    display: "flex",
    gap: "10px",
})
export const AutoCompletePara = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  position: "relative",
  "@media screen and (max-width:600px)": {
    marginBottom: "25px",
  },
});

export const StyledDownContent = styled("p")({
  fontSize: "14px",
  color: "#0D52A7",
  cursor: "pointer",
  margin: "0",
  marginTop: "5px",
  position: "absolute",
  top: "40px",
  "@media screen and (max-width:420px)": {
    fontSize: "10px",
  },
});