import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import TextInput from "../../common/TextField/TextField";
import Avatar from "@mui/material/Avatar";
export const StyledNavbar = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "white",
  color: "black",
  borderBottom: "1px solid #e4e4e4",
  height: "70px",
  position: "sticky",
  top: 0,
  zIndex: "999",
});
export const StyledNavbarLeft = styled("div")(
  {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
  },
  (props) => ({
    "@media screen and (max-width:991px)": {
      display: props.displayNavbar ? "flex" : "none",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      position: "absolute",
      top: "92px",
      right: "auto",
      left: "18px",
      borderRadius: "5px",
      zIndex: "999999",
      padding: 0,
      minWidth: "95%",
    },
    "@media screen and (max-width:940px)": {
      left: "16px",
      minWidth: "96%",
    },
    "@media screen and (max-width:870px)": {
      left: "14px",
      minWidth: "96%",
    },
    "@media screen and (max-width:815px)": {
      left: "16px",
      minWidth: "95%",
    },
    "@media screen and (max-width:680px)": {
      left: "15px",
      minWidth: "94%",
    },
  })
);
export const StyledLogoContainer = styled("div")({
  marginRight: "2vw",
  padding: "0px 10px 0px 0px",
});
export const StyledMainLogo = styled("img")({
  width: "150px",
  "@media (max-width: 600px)": {
    width: "90px",
  },
});
export const StyledLink = styled(Link)({
  marginRight: "3vw",
  color: "black",
  textDecoration: "none",
  textTransform: "capitalize",
  fontWeight: "400",
  maxWidth: "150px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&.headeractive": {
    color: "#1b52a7",
    fontWeight: "600",
    borderBottom: "2px solid #1b52a7",
  },
  "@media screen and (max-width:991px)": {
    cursor: "pointer",
    margin: "0",
    padding: "20px 20px 20px 20px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontWeight: "400",
    backgroundColor: "#004b9e",
    color: "#fff",
    borderBottom: " 1px solid #fff",
    maxWidth: "100%",
    "&.headeractive": {
      borderBottom: "2px solid #004b9e",
      color: "#004b9e",
      backgroundColor: "#fff",
    },
  },
});
export const StyledMenuContainer = styled("div")({
  width: "85%",
  display: "flex",
});
export const StyledNavbarRight = styled("div")({
  display: "flex",
  width: "15%",
  justifyContent: "flex-end",
});

export const StyledMenuIcon = styled(MenuIcon)({
  height: "auto",
  "@media screen and (max-width:991px)": {
    marginLeft: "14px",
  },
});
export const StyledGlobalSearch = styled(TextInput)({
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  outline: "none",
});

export const StyledAccountCircleIcon = styled(AccountCircleIcon)({
  fontSize: "50px",
  width: "30px",
  marginRight: "22px",

  "@media (max-width: 800px)": {
    fontSize: "50px",
    width: "30px",
  },
});
export const StyledProfileIcon = styled("img")({
  marginRight: "10px",
});
export const StyledProfileInnerdiv = styled("div")({
  display: "flex",
  marginRight: "20px",
  alignItems: "center",
  gap: "25px",
  padding: "20px 0px",
  borderBottom: "1px solid  rgba(207, 229, 255, 1)",
});
export const StyledProfileUpdateInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
});
export const StyledProfileName = styled("span")({
  fontSize: "16px",
  fontWeight: "600",
});
export const StyledProfileEmail = styled("span")({
  fontSize: "12px",
  fontWeight: "500",
});
export const StyledNotificationIcon = styled("img")({
  marginLeft: "5px",
});
export const StyledMailIcon = styled("img")({
  marginLeft: "5px",
});
export const StyledSettingIcon = styled("img")({
  marginRight: "5px",
});
export const StyledProfileDiv = styled("div")({
  position: "absolute",
  top: "80px",
  backgroundColor: "rgba(255, 255, 255, 1)",
  zIndex: 999999,
  border: "1px solid rgba(207, 229, 255, 1)",
  borderRadius: "20px",
  padding: "20px",
});

export const StyledProfileAvatar = styled("img")({
  width: "30%",
});

export const StyledNavAvatar = styled(Avatar)({
  width: "40px",
  height: "40px",
  marginLeft: "5px",
  cursor: "pointer",
});
export const StyledSmallAvatar = styled(Avatar)({
  height: "100%",
  width: "100%",
  bottom: "12px",
  right: "4px",
  cursor: "pointer",
});
export const StyledProfileOptionDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
});
export const StyledProfileLogoutOptionDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  padding: "10px 0px",
});
export const StyledProfileInfoMainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
});
export const StyledProfileOption = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
});
export const StyledProfileInfoInnerDiv = styled("div")({
  borderBottom: "1px solid rgba(207, 229, 255, 1)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "10px 0px",
});
export const StyledProfileOptionImage = styled("img")({
  cursor: "pointer",
  width: "8%",
});
export const StyledProfileOptionspan = styled("span")({
  fontSize: "14px",
  cursor: "pointer",
});
export const StyledDropdownMenu = styled("div")({
  position: "absolute",
  top: "60px",
  right: "0px",
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  zIndex: 100,
  width: "270px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
});
export const StyledDropdownItem = styled(Link)({
  padding: "10px 20px",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
  textTransform: "capitalize",
  // '&:hover': {
  //   backgroundColor: '#f5f5f5',
  // },
});
