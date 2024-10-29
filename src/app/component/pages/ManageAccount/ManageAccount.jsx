import TextInput from "../../../common/TextField/TextField";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Button from "../../../common/Button/Button";

export const StyledOverallContainer = styled("div")({
  display: "flex",
  gap: "15px",
  margin: "10px",
  marginTop: "60px",
  flexWrap: "wrap",
});

export const StyledDetailSpan = styled("span")({
  border: "1px solid #0055a559",
  padding: "10px 10px",
  background: "#5eaaf259",
  color: "black",
  borderRadius: "5px",
});
export const StyledManageAccountMaincontainer = styled("div")({
  padding: "10px 10px",
});
export const StyledProfileUpdate = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "30px",
  justifyContent: "center",
  cursor: "pointer",
  width: "98%",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
  borderRadius: "5px",
  padding: "10px",
});
export const StyledUpdateMainProfileDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0px 15 px",
  width: "100%",
});
export const StyledUpdateMainProfile = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
  padding: "30px 20px",
  borderRadius: "5px",
  background: "#0055a51c",
});
export const StyledTextInput = styled(TextInput)({
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
});
export const StyledUploadAvatar = styled(Avatar)({
  width: 45,
  height: 45,
  cursor: "pointer",
});
export const StyledNameDiv = styled("div")({
  display: "flex",
  gap: "10px",
});
export const StyledButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const StyledButton = styled(Button)({
  margin: "10px 10px",
});
export const StyledHeaderText = styled("h2")({
  marginLeft: "10px",
  color: "#0057a2",
});
