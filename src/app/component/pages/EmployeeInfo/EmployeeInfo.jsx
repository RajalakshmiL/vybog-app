import styled from "@emotion/styled";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { ReactComponent as EyeOpenIcon } from "../../../../assets/image/eyeopen.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/image/DownloadIcon.svg";
import { ReactComponent as DocumentIcon } from "../../../../assets/image/Document-black-icon.svg";
import { ReactComponent as DocumentActiveIcon } from "../../../../assets/image/Document-icon.svg";
import { ReactComponent as ArrowIcon } from "../../../../assets/image/Right-Arrow-icon.svg";
import { ReactComponent as ArrowActiveIcon } from "../../../../assets/image/Right-Active-Arrow-icon.svg";

export const StyledMainContainer = styled("div")({
  margin: "0",
  padding: "50px 20px 50px 20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row-reverse",
});
export const StyledLeftContainer = styled("div")({
  width: "25%",
  height: "fit-content",
  borderTop: "none",
  borderBottom: "none",
  borderLeft: "none",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "20px",
  borderRadius: "10px",
  "@media screen and (max-width:991px)": {
    width: "30%",
    padding: "0 10px",
    paddingLeft: "20px",
  },
});

export const StyledRightContainer = styled("div")({
  // border: "1px solid #CCCCCC",
  width: "75%",
  borderTop: "none",
  borderBottom: "none",
  borderRight: "none",
  padding: "0 0 0 0px",
  borderRadius: "10px",
  "@media screen and (max-width:991px)": {
    width: "65%",
  },
});
export const StyledRightContainerTop = styled("div")({
  display: "flex",
  flexDirection: "row",
  columnGap: "40px",
  marginBottom: "20px",
  alignItems: "center",
  padding:"10px 0",
  borderBottom: "1px solid #DDDDDD",
  "@media screen and (max-width:1300px)": {
    flexDirection: "row",
    gap: "10px",
  },
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    gap: "20px",
  },
});

export const StyledContainerDetails = styled("div")({
  padding: "10px 20px",
  boxShadow: "0px 4px 10px 0px #0000002A",
  marginBottom: "30px",
  borderRadius: "10px",
   "@media screen and (max-width:1300px)": {
    padding: "10px 20px 20px 20px",
  },
});

export const StyledPersonalDetails = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignContent: "flex-start",
  columnGap: "10px",
  alignItems: "center",
  // justifyContent: "space-evenly",
  gap: "25px",
  width: "100%",
   "@media screen and (max-width:1300px)": {
    gap: "10px",
  },
});
export const StyledMail = styled("div")({
  display: "flex",
  gap: "10px",
   "@media screen and (max-width:1300px)": {
    justifyContent:"flex-end"
  },
   "@media screen and (max-width:991px)": {
    justifyContent:"flex-start"
  },
});
export const StyledPhone = styled("div")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "@media screen and (max-width:1300px)": {
    justifyContent:"flex-end"
  },
  "@media screen and (max-width:991px)": {
    justifyContent:"flex-start"
  },
});

export const StyledImageIcon = styled("img")({
  width: "50px",
  height: "50px",
  color: "#ccc",
});

export const StyledNameContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
  gap:"5px"
});

export const StyledName = styled("h4")({
  margin: "0 !important",
  padding: "0 !important",
});

export const StyledPosition = styled("p")({
  margin: "0 !important",
  padding: "0 !important",
  fontSize:"14px"
});

export const StyledLinkedIn = styled("div")({
  // color: "blue",
  // width: "30px",
  // height: "30px",
});

export const StyledContact = styled("p")({
  margin: "0",
});

export const StyledContactContainer = styled("div")({
  display: "flex",
  gap: "20px",
  "@media screen and (max-width:1300px)": {
    flexDirection: "column",
    rowGap: "10px",
  },
});

export const StyledJobsSourceContainer = styled("div")({
  padding: "5px 10px",
   "@media screen and (max-width:991px)": {
    display:"flex",
    justifyContent:"center"
  },
});

export const StyledJobsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  // width: "fit-content",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px 0px #0000002A",
  marginBottom: "30px",
  padding: "20px 15px",
  "@media screen and (max-width:850px)": {
    padding: "7px",
  },
});

export const StyledResumeContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  // width: "fit-content",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px 0px #0000002A",
  padding: "15px",
  "@media screen and (max-width:850px)": {
    padding: "7px",
  },
});

export const StyledEyeOpenIcon = styled(EyeOpenIcon)({
  width: "40px",
  height: "40px",
});

export const StyledDownloadIcon = styled(DownloadIcon)({
  width: "40px",
  height: "40px",
});

export const StyledJobs = styled("div")(({ active }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  padding: "10px",
  margin: "10px 0",
  gap: "5px",
  "&:hover": {
    backgroundColor: "#F2F8FF",
    color: "#0D52A7",
  },
  "@media screen and (max-width:850px)": {
    padding: "5px",
  },
}));

export const StyledJobIcon = styled(WorkOutlineOutlinedIcon)({});

export const StyledJobRoleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "0px 10px",
  padding: "0",
  width: "100%",
  "@media screen and (max-width:850px)": {
    margin: "0px 10px",
  },
});

export const StyledJobRole = styled("p")({
  margin: 0,
});

export const StyledJobSkills = styled("p")({
  margin: 0,
  fontSize: "14px",
  color:"#7C94AD"
});

// export const StyledArrowIcon = styled(ArrowForwardIosOutlinedIcon)({});

export const StyledRightContainerHeader = styled("div")({
  // borderBottom: "1px solid #CCCCCC",
  width: "100%",
  // padding:"0px 20px"
});

export const StyledContentPage = styled("div")({});

export const StyledDocumentIcon = styled(DocumentIcon)({
  width: "40px !important",
  height:"40px !important"
});

export const StyledDocumentActiveIcon = styled(DocumentActiveIcon)({
  width: "40px !important",
    height:"40px !important"
});
export const StyledArrowIcon = styled(ArrowIcon)({
  width: "40px !important",
  height: "40px !important"
});
export const StyledActiveArrowIcon = styled(ArrowActiveIcon)({
  width: "40px !important",
    height:"40px !important"
});