import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import CustomDatePicker from "../../../common/DatePicker/DatePicker";
import Button from "../../../common/Button/Button";
export const StyledSpecificationContainer = styled("div")({
  display: "flex",
  alignSelf: "flex-start",
  gap: "20px",
  background: "#DEDEDE",
  padding: "15px 10px 15px 10px",
  borderRadius: "7px",
  width: "100%",
  alignItems: "flex-start",
  "@media screen and (max-width:768px)": {
    flexDirection: "column",
    width: "100%",
  },
  "@media screen and (min-width:769px) and (max-width:991px)": {
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-end"
  },
});

export const StyledcloudContainer = styled("div")({
  "@media screen and (max-width:768px)": {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
});

export const StyledMainContainer = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "center",
  columnGap: "30px",
  marginBottom: "20px",
});

export const StyledButton = styled(Button)({
  borderRadius: "4px",
  cursor: "pointer",
  position: "relative",
  height: "35px",
  backgroundColor: "white",
  border: "2px solid rgba(13, 82, 167, 1)",
  color: "rgba(13, 82, 167, 1)",
  marginTop: "20px",
  textAlign: "center",
  padding: "0px 22px 0px 5px",
  "&:hover": {
    backgroundColor: "#f0f8ff",
  },
})
export const StyledOuterHeadingCont = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
})
export const StyledAddButtonImage = styled("img")({
  position: "absolute", top: "7px", right: "4px",
  width: "17px"
})
export const StyledSubhead = styled("div")({
  fontSize: "24px",
  fontWeight: "600",
  marginTop: "20px"
})
export const StyledButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "40px"
});
export const StyledTextinput = styled(TextInput)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  outline: "none",
  boxSizing: "border-box",
  "@media screen and (max-width:768px)": {
    width: "100%",
  },
});

export const StyledIconContainer = styled("div")({
  display: "flex",
  gap: "10px",
  flexDirection: "column",
});
export const StyledDatePicker = styled(CustomDatePicker)({
  padding: "10px 10px 10px 10px",
  //  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  width: "100%",
  "@media screen and (max-width:768px)": {
    width: "100%",
  },
});
export const StyledOuterContainer = styled("div")({
  width: "100%",
  height: "100%",
  maxHeight: "380px",
  overflowY: "scroll",
  overflowX: "hidden",
});


// popup design
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
  zIndex: "99999999",
});

export const StyledPopupInnerContainer = styled("div")({
  background: "#fff",
  width: "500px",
  height: "auto",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
  animation: "open-frame 0.3s linear",
  padding: "20px",
});
export const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
export const StyledHeading = styled("h3")({
  margin: "0px",
  marginBottom: "25px",
});
export const StyledPopupCancelIcon = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  cursor: "pointer",
});
export const StyledInputContainer = styled("div")({
  display: "flex",
  gap: "10px",
});
export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
  // marginBottom: "5px"
});

export const StyledButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  columnGap: "10px",
  width: "100%",
});

export const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "50px",
});

export const StyledDeleteContainer = styled("div")({
  backgroundColor: "#eff8ff",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  padding: " 13px 0px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px"
})
export const StyledDeleteButtonContainer = styled("div")({
  display: "flex",
  gap: "20px"
})
export const StyledYesButton = styled(Button)({
  backgroundColor: "#2aa739",
  padding: "6px 15px",
  "&:hover": {
    backgroundColor: "#149514",
  },
})
export const StyledNoButton = styled(Button)({
  backgroundColor: "#f02424",
  padding: "6px 15px",
  "&:hover": {
    backgroundColor: "#cc1212",
  },
})
export const StyledDeleteSpan = styled("span")({
  fontSize: "15px",
  fontWeight: "600",
  color: "#0d52a7"
})

export const StyledCertficateImage = styled("img")({
  "@media screen and (max-width:768px)": {
    width: "100%",
  },
})
