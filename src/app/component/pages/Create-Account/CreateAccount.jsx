import styled from "@emotion/styled";
import TextInput from "../../../common/TextField/TextField";
import Button from "../../../common/Button/Button";
export const StyledCreateAccountMainContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",
  height: "100vh",
  "@media screen and (min-width:300px) and (max-width:768px)": {
    gridTemplateColumns: "1fr",
  },
  "@media screen and (min-width:769px) and (max-width:920px)": {
    gridTemplateColumns: "1fr",
  },
});
export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
});
export const StyledCheckboxErrorMessage = styled("div")({
  position: "relative",
  top: "0px",
});
export const Styledleftimage = styled("img")({
  width: "60%",
  alignSelf: "center",
});
export const StyledCreateAccountRightContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  "@media screen and (min-width:300px) and (max-width:768px)": {
    alignItems: "center",
  },
  "@media screen and (min-width:769px) and (max-width:920px)": {
    alignItems: "center",
  },
});
export const StyledRightFormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "70%",
  "@media screen and (min-width:300px) and (max-width:768px)": {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  "@media screen and (min-width:769px) and (max-width:920px)": {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export const StyledVybogLogo = styled("img")({
  width: "200px",
  marginTop: "6vw",
  alignSelf: "center",
  "@media screen and (min-width:300px) and (max-width:500px)": {
    alignItems: "center",
    marginTop: "14vw",
  },
  "@media screen and (min-width:501px) and (max-width:768px)": {
    alignItems: "center",
    marginTop: "10vw",
  },
});
export const StyledCreateAccountHeading = styled("h3")({
  fontSize: "40px",
  fontWeight: "600",
  textAlign: "left",
  lineHeight: "52px",
});
export const StyledSpanTag = styled("span")({
  color: "#0F3FE9",
  textDecoration: "underline",
  cursor: "pointer",
  position: "relative",
  bottom: "-16px",
  right: "-7px",
  fontSize: "14px",
  fontWeight: "300",
});
export const StyledCreateAccountForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  // marginBottom: "4px",
  marginTop: "0px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
});

export const StyledButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  padding: "40px 0px 100px 0px",
  gap: "20px",
  "@media screen and (min-width:300px) and (max-width:768px)": {
    padding: "40px 0px 100px 0px",
  },
});
export const StyledButton = styled(Button)({
  "&:hover": {
    background: "#1672be",
  },
});

export const StyledCancelButton = styled(Button)({
  "&:hover": {
    background: "#e0e0e0",
    fontWeight: "500",
    color: "#5c5a5a",
  },
});

export const StyledTermsContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  // margin: "5px 0px 15px 0px",
  marginLeft: "-10px",
  marginTop: "-14px",
});

export const StyledNameInput = styled("div")({
  display: "flex",
  gap: "20px",
  "@media screen and (min-width:300px) and (max-width:500px)": {
    display: "block",
  },
  "@media screen and (min-width:501px) and (max-width:920px)": {
    display: "block",
  },
});

//Verify Email

export const StyledSigninMainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100%",
});

export const StyledSiginEmailContainer = styled("form")({
  width: "42%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "10px",
  "@media screen and (min-width:300px) and (max-width:600px)": {
    width: "85%",
  },
  "@media screen and (min-width:601px) and (max-width:767px)": {
    width: "75%",
  },
  "@media screen and (min-width:768px) and (max-width:991px)": {
    width: "65%",
  },
  "@media screen and (min-width:992px) and (max-width:1200px)": {
    width: "65%",
  },
  "@media (min-width:2000px)": {
    width: "35%",
  },
  "@media (min-width:3001px)": {
    width: "35%",
  },
});
export const StyledSiginp = styled("p")({
  textAlign: "justify",
});
export const Styledspan = styled("span")({
  color: "black",
  fontWeight: "700",
});
export const StyledSiginEmail = styled("h3")({
  fontSize: "18px",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: "20px",
});

export const StyledSiginEmailInputContainer = styled("div")({
  width: "70%",
  margin: "auto",
  "@media screen and (min-width:300px) and (max-width:600px)": {
    width: "80%",
  },
  "@media screen and (min-width:601px) and (max-width:767px)": {
    width: "80%",
  },
  "@media screen and (min-width:768px) and (max-width:991px)": {
    width: "75%",
  },
  "@media screen and (min-width:992px) and (max-width:1200px)": {
    width: "75%",
  },
  "@media (min-width:1200px)": {
    width: "70%",
  },
  "@media screen and (min-width:2000px) and (max-width:3000px)": {
    width: "80%",
  },
  "@media (min-width:3001px)": {
    width: "85%",
  },
});
export const StyledTextEmailInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  outline: "none",
  borderRadius: "8px",
  boxSizing: "border-box",
  marginBottom: "5px",
});
export const StyledButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
  columnGap: "18px",
  marginTop: "5%",
  paddingBottom: "5%",
});
