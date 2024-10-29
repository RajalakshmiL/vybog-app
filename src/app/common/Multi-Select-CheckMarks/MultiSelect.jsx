import styled from "@emotion/styled"
import Textfield from "../TextField/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const StyledTextfieldContainer = styled(Textfield)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
})
export const StyledTaskAltIcon = styled(CheckCircleIcon)({
  color: "green",
  fontSize: "20px"
})

export const StyledCancelIcon = styled(CancelIcon)({
  color: "red",
  fontSize: "20px"
})
export const StyledCheckContainer = styled("div")({
  marginTop: "-37px",
  display: "flex",
  borderBottom: "1px solid #c1c1c1",
  justifyContent: "space-between"
})

export const StyledDropdownContainer = styled("div")({
  position: "relative",
  cursor: "pointer",
  userSelect: "none",
  width: "100%",
})
export const StyledDropdownMenu = styled("div")({
  position: "absolute",
  top: "37px",
  left: 0,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderTop: "none",
  zIndex: "99",
  maxHeight: "250px",
  overflowY: "auto",
  width: "100%",
  borderRadius: "5px",
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

export const StyledStickyContainer = styled("div")({
  position: "sticky",
  top: "0",
  background: "white",
})
export const StyledDropdownSearchItem = styled("div")({
  padding: "10px",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  gap: "5px",
  alignItems: "center",
  // "&:hover": {
  //   backgroundColor: "#e6f7ff",
  // },
})
export const StyledDropdownItem = styled("div")(({ selected }) => ({
  padding: "10px",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  gap: "5px",
  margin: "5px 0px",
  alignItems: "center",
  backgroundColor: selected ? "#d2e6fd" : "transparent",
  color: selected ? "#0055a5" : "inherit",
  // borderBottom: selected ? "1px solid #0055a5" : "none",
  // borderTop: selected ? "1px solid #0055a5" : "none",
  "&:hover": {
    backgroundColor: "#e6f7ff",
    color: selected ? "#0055a5" : "black",
  },
}));

export const StyledSearchContainer = styled(Textfield)({
  width: "100%",
  padding: "5px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "5px",
})