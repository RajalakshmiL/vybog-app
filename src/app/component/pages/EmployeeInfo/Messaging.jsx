import styled from "@emotion/styled";
import Button from "../../../common/Button/Button";
import DownloadIcon from "@mui/icons-material/Download";
import TextArea from "../../../common/TextArea/TextArea";

export const ResumeMainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 4px 10px 0px #0000002A",
  padding: "20px 20px",
});

export const ResumeDownload = styled("a")({});

export const ParsedResume = styled("div")({
  height: "auto",
  border: "1px solid #ACACAC",
  borderRadius: "5px",
});

export const ParsedCanvas = styled("canvas")({
  width: "auto",
  "@media screen and (max-width:991px)": {
    width: "100%",
  },
});

export const StyledButton = styled(Button)({
  borderRadius: "8px !important",
  margin: "10px 5px 20px 0",
  paddingLeft: "40px",
});

export const StyledIcon = styled(DownloadIcon)({
  color: "white",
  position: "relative",
  left: "35px",
  top: "20px",
  transform: "translateY(-50%)",
});

export const MessagingMainContainer = styled("div")({
  boxShadow: "0px 4px 10px 0px #0000002A",
  padding: "20px 40px",
  "@media screen and (min-width:768px) and (max-width:1220px)": {
    padding: "10px",
  },
});

export const MessagingUpperContainer = styled("div")({
  border: "1px solid #ACACAC",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
});

export const MessagingHeader = styled("h5")({});

export const TextBox = styled(TextArea)({
  width: "100%",
  resize: "none",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  height: "100px",
  "&:focus-within": {
    outline: "none",
  },
});

export const CheckboxContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "20px 0",
  "@media screen and (max-width:768px)": {
    flexDirection: "column",
  },
});
export const MessagingDisplayContainer = styled("div")({
  maxHeight: "300px",
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
export const MessagingLowerContainer = styled("div")({
  marginTop: "20px",
  padding: "0px 10px 0px 0px",
});

export const StyledButtonDiv = styled("div")({
  columnGap: "10px",
  "@media screen and (max-width:768px)": {
    display: "flex",
    justifyContent: "center",
  },
});
export const MessagingDate = styled("div")({
  position: "relative",
  textAlign: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: 0,
    width: "42%",
    height: "1px",
    backgroundColor: "#CCCCCC",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    right: 0,
    width: "42%",
    height: "1px",
    backgroundColor: "#CCCCCC",
  },
});

export const UserMessage = styled("div")({
  backgroundColor: "#0055a5",
  display: "flex",
  justifyContent: "space-between",
  padding: "0px 10px",
  margin: "10px 0",
  width: "fit-content",
  maxWidth: "80%",
  borderRadius: "20px 20px 20px 0px",
  color: "white",
});

export const UserContent = styled("p")({});

export const BotMessage = styled("div")({
  backgroundColor: "#EBEBEB",
  display: "flex",
  justifyContent: "flex-start",
  padding: "0px 10px",
  margin: "10px 0",
  width: "fit-content",
  maxWidth: "80%",
  borderRadius: "20px 20px 20px 0px",
});

export const BotContent = styled("p")({});

export const UserMessageContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-End",
  alignItems: "center",
  columnGap: "5px",
});

export const BotMessageContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  columnGap: "5px",
});

export const MessageContainer = styled("div")({});
