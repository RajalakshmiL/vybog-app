import styled from "@emotion/styled";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
// common both info and jobinfo page
export const InfoMainContainer = styled("div")({
  boxShadow: "0px 4px 10px 0px #0000002A",
  padding: "20px",
  borderRadius: "10px",
});
export const StyledInfoUpdate = styled("div")({
  display: "flex",
  gap: "35px",
  padding: "10px 20px",
  borderBottom: "1px solid #EAEFF3",
   "@media screen and (max-width:835px)": {
   gap:"80px"
  },
});
export const StyledEmployerDetails = styled("div")({
  display: "flex",
  gap: "20px",
  flexDirection: "row",
  marginBottom: "25px",
  padding: "10px",
  borderBottom: "1px solid #EAEFF3",
  position: "relative",
  "@media screen and (max-width:835px)": {
    flexDirection: "column",
    gap:"0"
  },
});

export const StyledEmployerCertification = styled("div")({
  height: "auto",
  display: "flex",
  flexDirection: "row",
  columnGap: "10px",
  padding: "0px 20px",
  position: "relative",
  "&:not(:first-of-type)::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "2px",
    height: "60%",
    backgroundColor: "#ccc",
    margin: "10px 0px",
  },
  "@media (max-width: 835px)": {
    "&:not(:first-of-type)::before": {
      content: "none",
    },
    padding: "0px 10px",
    columnGap: "90px",
  },
});
export const StyledEmployerCompany = styled("div")({
  height: "auto",
  display: "flex",
  flexDirection: "row",
  columnGap: "10px",
  padding: "0px 10px",
   "@media (max-width: 835px)": {
  columnGap: "55px",
  },
});
export const InfoLowerContainer = styled("div")({
  height: "auto",
});

export const InfoLabel = styled("p")({
  color: "#879CB4",
  fontWeight: "400",
  fontSize: "14px",
  margin: "0",
});
export const PersonalInfoLabel = styled("p")({
  color: "#879CB4",
  fontWeight: "400",
  fontSize: "14px",
  margin: "0",
  "@media screen and (max-width:991px)": {
    width:"100px"
  },
});
export const InfoValue = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000000",
});
export const InfoMail = styled("p")({
  margin: "0",
});
export const InfoNumber = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000000",
});
export const InfoHeader = styled("h3")({
  fontWeight: "600",
  fontSize: "16px",
  color: "#000000",
});
export const InfoName = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
export const InfoText = styled("p")({
  color: "#0D52A7",
  fontSize: "16px",
  fontWeight: "500",
});
export const InfoTime = styled("p")({});
export const RecuriteNoteMainDiv = styled("div")({
  padding: "10px 20px",
});

export const RecuriteNoteDiv = styled("div")({
  padding: "10px 20px",
});
export const RecruiterNotes = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000000",
});
export const JobDescription = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: "#000000",
});

export const StyledImageIcon = styled(SquareRoundedIcon)({
  width: "30px",
  height: "30px",
  marginRight: "25px",
  color: "#ccc",
});
export const RecruiterDetails = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #DDDDDD",
  boxShadow: "0px 4px 10px 0px #0000000D",
  padding: "0px 16px",
});
export const StyledImage = styled("img")({
  width: "30px",
  height: "30px",
  cursor: "pointer",
});

// info page style
export const StyledPersonalInfoSkillDiv = styled("div")({
  display: "flex",
  gap: "50px",
  flexDirection: "row",
  borderBottom: "1px solid #EAEFF3",
  padding: "10px 20px",
   "@media screen and (max-width:835px)": {
    gap: "100px",
  },
});
export const StyledPersonalInfoDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid #EAEFF3",
  padding: "10px 20px",
});
export const StyledPersonalInfoContentDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  position: "relative",
  alignItems: "center",
  "&:not(:first-of-type)::before": {
    content: "''",
    position: "absolute",
    left: "-10px",
    top: 0,
    width: "2px",
    height: "60%",
    backgroundColor: "#ccc",
    margin: "10px 0px",
  },
  "@media (max-width: 991px)": {
    "&:not(:first-of-type)::before": {
      content: "none",
    },
    gap:"50px"
  },
});

export const PersonalInfoContentMainDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  // gap: "50px",
  justifyContent: "space-between",
  marginRight:"20%",
  "@media screen and (max-width:1200px)": {
    flexDirection: "row",
    marginRight:"0%",
  },
  "@media screen and (max-width:768px)": {
    flexDirection: "column",
    gap: "10px",
    marginRight:"0%",
  },
});
export const InfoContentMainDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  // gap: "50px",
  justifyContent: "space-between",
  marginRight:"20%",
  "@media screen and (max-width:1200px)": {
    flexDirection: "row",
    marginRight:"0%",
  },
    "@media screen and (max-width:991px)": {
    flexDirection: "column",
    marginRight:"0%",
  },
  "@media screen and (max-width:768px)": {
    flexDirection: "column",
    gap: "10px",
    marginRight:"0%",
  },
});
export const RecuriterNoteContainerDiv = styled("div")({
  boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
  border: "1px solid #DDDDDDDD",
  borderRadius: "8px",
  margin: "20px 0px 0px 0px",
});
export const ContentDetailsMainDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid #EAEFF3",
  padding: "10px 20px",
});

export const ContentDetailsInnerDiv = styled("div")({
  display: "flex",
  gap: "50px",
  flexDirection: "row",
  alignItems: "center",
   "@media screen and (max-width:768px)": {
    gap: "20px",
  },
  "@media screen and (max-width:660px)": {
    gap: "10px",
  },
});
export const ContentInfoDetailsInnerDiv = styled("div")({
  display: "flex",
  gap: "50px",
  flexDirection: "row",
  alignItems: "center",
   "@media screen and (max-width:991px)": {
     flexDirection: "column",
     gap: "10px",
     alignItems:"flex-start"
  },
  // "@media screen and (max-width:660px)": {
  //   gap: "30px",
  // },
});
export const ContentDetailsInfoInnerDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
export const ContentDetailsInfoWrapperDiv = styled("div")({
  display: "flex",
  gap: "20px",
   "@media screen and (max-width:991px)": {
     flexDirection: "column",
     gap:"0"
  },
});
export const ContentMailIconActive = styled("img")({});
export const ContentMobileIconActive = styled("img")({});
export const ContentTimeIconActive = styled("img")({});
export const ContentDetailsInnerSecondDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "90px",
   "@media screen and (max-width:768px)": {
    gap: "60px",
  },
   "@media screen and (max-width:660px)": {
    gap: "50px",
  },
});
export const ContentInfoDetailsInnerSecondDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "90px",
   "@media screen and (max-width:991px)": {
    gap: "20px",
  },
   "@media screen and (max-width:660px)": {
    gap: "20px",
  },
});
export const SocialMediaDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "Center",
  gap: "10px",
  padding: "10px",
  borderBottom: "1px solid #EAEFF3",
});
export const RecuriterNoteMainDiv = styled("div")({
  padding: "10px 10px",
});
export const DocumentDownloadDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  borderBottom: "1px solid #EAEFF3",
  padding: "10px",
});
export const DocumentDownloadInnerDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  columnGap: "10px",
});
