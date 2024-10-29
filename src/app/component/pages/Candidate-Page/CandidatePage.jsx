import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import Button from "../../../common/Button/Button";
import { ReactComponent as RightArrowIcon } from "../../../../assets/image/Right-Arrow-icon.svg";
export const StyledCandidatePage = styled.div({
  display: "flex",
  flexWrap: "wrap",
  padding: "0px 20px 50px 20px",
  backgroundColor: "#fbfbfb",
});
export const StyledRightArrowIcon = styled(RightArrowIcon)({
  marginLeft: "15px",
});
export const StyledTableActiveSpan = styled.span`
  cursor: pointer;
  display: flex;
  width: fit-content;
  white-space: break-spaces;
  ${(props) =>
    props.isClickable &&
    `
      color: #0066ff;
       &:hover {
        border-bottom:1px solid #0066ff; 
      }
    `}
`;
export const StyledTableSpan = styled("span")({
  display: "flex",
  width: "fit-content",   
   whiteSpace: "break-spaces"
})
export const StyledPageContent = styled.div({
  flexGrow: 1,
  display: "flex",
  backgroundColor: "#ffffff",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px auto",
  width: "75%",
  "@media screen and (max-width:600px)": {
    alignItems: "center",
    width: "90%",
  },
  "@media screen and (max-width:768px)": {
    alignItems: "center",
    width: "90%",
  },
});

export const StyledH3 = styled.h3({
  width: "100%",
  fontSize: "32px",
  fontWeight: "600",
});

export const StyledEntireContent = styled.div({
  display: "flex",
  flexDirection: "column",
  background: "#ffffff",
  width: "85%",
  height: "auto",
  margin: "auto",
  borderRadius: "10px",
  gap: "12px",
  "@media screen and (max-width:600px)": {
    flexDirection: "column",
  },
  "@media screen and (max-width:768px)": {
    flexDirection: "column",
  },
});

export const StyledCandidateContent = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2vw",
   "@media screen and (max-width:820px)": {
      flexDirection: "column",
      alignItems: "flex-start",
     justifyContent: "space-between",
  },
});
export const StyledCandidateInnerContent = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
});
export const StyledCandidateLeftSpan = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  // "@media screen and (max-width:768px)": {
  //   flexDirection: "column",
  // },
});
export const StyledCandidateLeftSpanHeading = styled("h2")({
  display: "block",
  "@media screen and (max-width:768px)": {
  },
});

export const StyledCandidateRightSpan = styled("div")({
  display: "flex",
  flexDirection: "row",
  // marginRight: "15px",
  gap:"30px",
  "@media screen and (max-width:820px)": {
    width: "100%",
    justifyContent:"flex-end"
  },
});
export const StyledCandidateSpan = styled("span")({
  marginTop: "4px",
  color: "#9FB0C2",
});

export const StyledGlobelSearch = styled(TextInput)({
  width: "540px",
  padding: "10px",
  marginBottom: "3px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
  marginLeft: "15px",
  "@media screen and (max-width:920px)": {
    width: "400px",
  },
  "@media screen and (max-width:768px)": {
    width: "350px",
  },
});

export const StyledContentOuterDiv = styled("div")({
  display: "flex",
  justifyContent:"space-between",
  alignItems: "baseline",
  alignContent: "center",
  margin: "0 6px",
  marginTop: "20px",
});
export const StyledButton = styled(Button)({
  backgroundColor: "#e06ef7",
  color: "white",
  padding: "10px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "110px",
  "&:hover": {
    backgroundColor: "#cb26ed",
  },
});

export const StyledJobsButton = styled(Button)({
  backgroundColor: "#0D52A729",
  color: "#0D52A7",
  padding: "10px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: "#0D52A729",
  },
});

export const JobsProposalsMainContainer = styled("div")({
  // marginTop: "30px",
  padding: "20px 20px",
});

export const JobContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  columnGap: "20px",
  marginBottom: "25px",
  paddingLeft: "30px",
});

export const JobLabel = styled("p")({
  margin: 0,
});

export const JobStatusOuterContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  margin:"10px 0",
   "@media screen and (max-width:991px)": {
     flexDirection: "column-reverse",
  },
});

export const JobStatusInnerLeftContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  columnGap: "20px",
  paddingBottom: "10px",
});

export const JobStatusContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRight: "3px solid #F0D90C",
  alignItems: "flex-end",
  paddingLeft: "25px",
  paddingRight: "5px",
});

export const JobStatusInnerRightContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  columnGap: "20px",
  width: "100%",
  padding: "0px 0px 0px 10px",
   "@media screen and (max-width:991px)": {
     justifyContent: "flex-start",
     margin:"0 0 20px 20px"
  },
});

export const JobNumber = styled("h1")({
  margin: "0",
  fontSize: "30px",
  fontWeight: "500",
});

export const JobStatus = styled("p")({
  margin: "0",
  fontSize: "14px",
  fontWeight: "400",
});

export const StyledCandidateTableButton = styled(Button)({
  backgroundColor: "white",
  color: "black",
  padding: "10px 10px 10px 36px",
  borderRadius: "4px",
  cursor: "pointer",
  border: "2px solid black",
  fontSize: "14px",
  // marginLeft: "15px",
  "&:hover": {
    backgroundColor: "#e4e4e46e",
  },
});

export const StyledFilterIcon = styled("img")({
  position: "absolute",
  top: "8px",
  right: "49px",
  cursor:"pointer"
});

export const StyledSettingsIcon = styled("img")({
  position: "absolute",
  top: "8px",
  right: "68px",
  cursor:"pointer"
});

export const StyledAdvancedSearchText = styled("div")({
  color: "blue",
  fontSize: "12px",
  position: "absolute",
  top: "35px",
  left: "460px",
  marginTop: "10px",
  cursor:"pointer",
  "@media screen and (max-width:920px)": {
    left: "320px",
  },
  "@media screen and (max-width:768px)": {
    left: "270px",
  },
});

export const StyledProgressOuter = styled("div")({
  display: "flex",
  gap: "10px",
  borderRadius: "5px",
  padding: "20px 0px",
  width: "100%",
});
export const ProposalTableMainDiv = styled("div")({
  boxShadow: "0px 4px 10px 0px #0000002A",
});

export const StyledClientsTabContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  // marginTop:"20PX"
});
export const StyledPercentageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignContent: "flex-end",
  flexWrap: "wrap",
  background: "white",
  borderRadius: "5px",
  padding: " 0px 10px",
  justifyContent: "center",
  margin: "10px 0",
  "@media screen and (max-width:768px)": {
   width:"auto"
  },
});

export const StyledCandidateContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "85%",
  margin: "auto",
   "@media screen and (max-width:768px)": {
    flexDirection: "column",
  },
});

export const StyledSpanContainer = styled("span")({
  fontSize: "16px",
  color: "#004b9e",
  fontWeight: "600",
});
export const StyledJobTagStageDiv = styled("div")({
  // width: "60%",
});

export const StyledManageColumnIcon = styled("img")({
  position: "absolute",
    top: "11px",
 marginLeft:"10px",
    cursor: "pointer",
    width: "22px",
})

export const StyledButtonOuterDiv = styled("div")({
  position: "relative",
  display: "flex",
  gap:"10px",
})

export const StyledEmployeeTextInput = styled(TextInput)({
  width: "100%",
  padding: "10px",
border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});