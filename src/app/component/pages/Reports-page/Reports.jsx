import styled from "@emotion/styled";
import Button from "../../../common/Button/Button";

export const StyledReportContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  margin: "10px",
  border: "1px solid #e4e4e4",
  borderRadius: "5px",
  padding: "10px 10px",
  background: "#eff8ff",
  width: "96%",
  "@media screen  and (min-width:600px) and (max-width:768px)": {
    gridTemplateColumns: "1fr",
  },
});

export const StyledReportInnerContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "35px",
});

export const StyledReportHeading = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px ",
});

export const StyledAnimationHeading = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px ",
  color: "#1b52a7",
  marginBottom: "50px",
});

export const StyledInnerHeadings = styled("h4")({
  color: "#1b52a7",
  width: "150px",
});
export const StyledSubHeadings = styled("h4")({
  color: "#1b52a7",
});

export const StyledReviewButtonDiv = styled("div")({
  display: "flex",
  marginTop: "20px",
  gap: "30px",
  alignItems: "center",
  flexDirection: "column",
});

export const StyledUpdateButton = styled(Button)({
  height: "45px",
  padding: "13px 20px",
});

export const StyledACCURACYMessage = styled("p")({
  color: "#1b52a7",
  margin: "10px",
  fontWeight: 600,
});

export const StyledRemarkContainer = styled("div")({
  margin: "10px",
});

export const StyledPageSelectorContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledButtonContainer = styled("div")({
  display: "flex",
  gap: "30px",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "15px",
  marginBottom: "15px",
});

export const StyledContentContainer = styled("div")({
  border: "1px solid #e4e4e4",
  padding: "10px",
  borderRadius: "5px",
  height: "200px",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "5px",
    backgroundColor: "#e6f1f5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    backgroundColor: "#1b52a729",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: " #1b52a742",
  },
  "&::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#1b52a740",
  },
});

export const StyledAnimationContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "40%",
});

export const StyledAnimationMainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignContent: "space-around",
  flexWrap: "wrap",
  marginTop: "10px",
});

export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
  marginTop: "6px",
});

export const StyledEmployeeName = styled("span")({
  color: "#1b52a7",
});

export const StyledHeaderWithButton = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
