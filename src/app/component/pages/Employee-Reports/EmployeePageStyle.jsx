import styled from "@emotion/styled"
import TextInput from "../../../common/TextField/TextField"
import Avatar from "@mui/material/Avatar";
import DynamicMultipleSelectCheckmarks from "../../../common/Multi-Select-CheckMarks/MultiSelectCheckMarks.js";
import { ReactComponent as RightArrowIcon } from "../../../../assets/image/Right-Arrow-icon.svg"
import Button from "../../../common/Button/Button"
export const StyledEmployeeHeading = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px ",
});

export const StyledEmployeeContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const StyledEmployeeMainContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  padding: "20px",
  justifyContent: "space-around",
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    rowGap: "30px",
  },
});

export const StyledEmployeeTextInput = styled(TextInput)({
  width: "100%",
  padding: "10px",
border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});

export const StyledEmployeeLeftContainer = styled("div")({
 display: "grid",
gridTemplateColumns: "1fr 1fr",
columnGap: "30px",
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

export const StyledEmployeeRightContainer = styled("div")({
  width: "35%",
  backgroundColor: "#ECF4FF",
  padding: "20px",
  height: "fit-content",
  borderRadius: "10px",
  "@media screen and (max-width:991px)": {
    width: "90%",
  },
});

export const StyledProfileUpdate = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "30px",
  justifyContent: "center",
  cursor: "pointer",
  width: "98%",
 borderRadius: "5px",
});

export const StyledUploadAvatar = styled(Avatar)({
  width: 45,
  height: 45,
  cursor: "pointer",
});

export const StyledDetailSpan = styled("span")({
 padding: "10px 10px",
  background: "#5eaaf259",
  color: "#0057a3",
  borderRadius: "5px",
});

export const StyledIdSpan = styled("p")({
  //  marginLeft: "275px",
  color: "#0057a3",
  marginTop: "22px",
  fontWeight: "500",
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledDynamicMultipleSelectCheckmarks = styled(DynamicMultipleSelectCheckmarks)({
    padding:"10px"
})

export const StyledEmployeeButtonDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  width: "63%",
  marginBottom: "10px",
});

export const StyledButtonContainer = styled("div")({
     position: "relative",
  display: "flex",
  gap: "10px",
  justifyContent: "flex-end",
    marginBottom: "15px",
    marginRight: "27px",
})

export const StyledRightArrowIcon = styled(RightArrowIcon)({
  marginLeft: "15px",
});

export const StyledAddDesignationButton = styled(Button)({
  float: "right",
})
  

