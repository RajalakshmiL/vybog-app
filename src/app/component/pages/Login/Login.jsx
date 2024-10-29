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
export const Styledleftimage = styled("img")({
  width: "60%",
  alignSelf: "center",
});
export const StyledForgotPassworddiv = styled("div")({
  display: "flex",
  marginLeft: "auto",
  // marginTop: "-25px",
  fontSize: "14px",
  fontWeight: "400",
  color: "grey",
  paddingBottom: "20px",
  cursor: "pointer",
});
export const StyleTroubleLoggingdiv = styled("div")({
  display: "flex",
  fontSize: "14px",
  fontWeight: "400",
  color: "grey",
  paddingTop: "10px",
  cursor: "pointer"
});

export const StyledCreateAccountRightContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  // alignItems: "center",
  marginTop:"20%",
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
  width: "100%",
  padding: "0 20%",
  "@media screen and (min-width:300px) and (max-width:590px)": {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  "@media screen and (min-width:591px) and (max-width:650px)": {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  "@media screen and (min-width:769px) and (max-width:920px)": {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export const StyledVybogLogo = styled("img")({
  width: "200px",
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
export const StyledVybogLogoForgotPwd = styled("img")({
  width: "200px",
  // marginTop: "9vw",
  alignSelf: "center",
  "@media screen and (min-width:300px) and (max-width:500px)": {
    alignItems: "center",
    marginTop: "0vw",
  },
  "@media screen and (min-width:501px) and (max-width:920px)": {
    alignItems: "center",
    marginTop: "0vw",
  },
});
export const StyledCreateAccountHeading = styled("h3")({
  fontSize: "16px",
  fontWeight: "500",
  textAlign: "center",
  color: "#0D52A7",
  marginBottom: "5vh",
  "@media screen and (max-width:400px)": {
    fontSize: "14px",
  },
});
export const StyledVerifyEmailHeading = styled("h3")({
  fontSize: "32px",
  fontWeight: "600",
  textAlign: "center",
  color: "#000000",
});

export const StyledCreateAccountForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
export const StyledForgotPasswordForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: "15px",
  "@media screen and (min-width:360px) and (max-width:920px)": {
    paddingTop: "20px",
  },
});
export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  // marginBottom: "4px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
});
export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
});

export const StyledButton = styled(Button)({
  width: "100%",
  "&:hover": {
    background: "#1672be",
  },
});

export const StyledUser = styled("div")({
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "400",
  // padding: "45px 0px",
  marginTop: "10vh"
});

export const StyledNewUserSpan = styled("span")({
  color: "#0F3FE9",
  textDecoration: "underline",
  cursor: "pointer",
  paddingTop: "80px",
  marginLeft: "4px",
});

export const StyledEyeIcon = styled("img")({
  position: "absolute",
  cursor: "pointer",
  transform: "translateY(-50%)",
  top: "153px",
  right: "15px",
});

export const StyledButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  // padding: "25px 0px 0px 0px",
  marginTop: "10px",
  gap: "20px",
});

export const StyledCancelButton = styled(Button)({
  "&:hover": {
    background: "#e0e0e0",
    fontWeight: "500",
    color: "#5c5a5a",
  },
});

export const StyledForgotPwdDiv = styled("div")({
  width: "300px",
  height: "40px",
  backgroundColor: "#f0f8ff",
  color: "#0D52A7",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "500",
  textAlign: "center",
  margin: "0 auto",
  marginBottom: "50px",
  borderRadius: "7px",
});

export const StyledButtonForgotPwd = styled(Button)({
  "&:hover": {
    background: "#1672be",
  },
});
