import styled from "@emotion/styled";
import TextArea from "../../../common/TextArea/TextArea";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import TextInput from "../../../common/TextField/TextField";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const TrackingMainContainer = styled("div")({
  height: "auto",
  padding: "20px 20px",
  boxShadow: "0px 4px 10px 0px #0000002A",
  borderRadius: "10px",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    padding: "10px",
  },
});
export const TrackingMainInnerContainer = styled("div")({
  margin: "0px 0px 20px 0px",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    margin: "10px",
  },
});
export const TrackingUpperOuterContainer = styled("div")({
  // border: "1px solid #ACACAC",
  padding: "20px",
  borderRadius: "10px",
});
export const TrackingUpperContainer = styled("div")({
  display: "flex",
  marginTop: "10px",
  flexDirection: "column",
});
export const TrackingLowerContainer = styled("div")({
  position: "relative",
  padding: "0px 15px 0px 40px",
  "&.tracking-lowercontainer::after": {
    position: "absolute",
    content: '""',
    width: "10px",
    height: "10px",
    background: "#fff",
    border: "3px solid #0055a5",
    left: "0",
    borderRadius: "100%",
    top: "0px",
  },
  "&.tracking-lowercontainer::before": {
    position: "absolute",
    content: '""',
    width: "10px",
    height: "100%",
    borderRight: " 2px dotted #82baee",
    left: "-3px",
    top: "18px",
  },
  "&.tracking-lowercontainer:last-child::before": {
    border: " none",
  },
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    padding: "0px 10px",
  },
});
export const TrackingLowerDisplayContainer = styled("div")({
  position: "relative",
  maxHeight: "500px",
  overflowY: "auto",
  borderRadius: "10px",

  // marginTop: "50px",
  padding: "10px",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    border: "1px solid #DDDDDD",
    boxShadow: "0px 4px 10px 0px #0000001A",
  },
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
export const TrackingLowerInnerContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "10px",
  marginTop: "10px",
  justifyContent: "space-between",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    margin: "10px",
  },
});
export const TrackingHeader = styled("h3")({
  fontSize: "16px",
  fontWeight: "500",
  color: "#000000",
  margin: "0",
  marginTop: "50px",
  marginBottom: "10px",
});

export const TrackingHistoryHeader = styled("h3")({
  fontSize: "16px",
  fontWeight: "500",
  color: "#000000",
  margin: "0",
  marginTop: "50px",
  marginBottom: "10px",
});
export const StyledTextArea = styled(TextArea)({
  width: "100%",
  height: "90px",
  resize: "none",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  "&:focus-within": {
    outline: "none",
  },
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    padding: "6px 0px 0px 13px",
  },
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
export const TrackingLeftContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "25px",
  justifyContent: "space-between",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    flexDirection: "column",
  },
});
export const AddTrackingLeftContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  width: "100%",
  justifyContent: "space-between",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    flexDirection: "column",
  },
});

export const StyledReminderContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "30px",
  alignItems: "start",

})
export const TrackingRightContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});
export const TrackingTextAreaDiv = styled("div")({
  display: "flex",
  width: "60%",
  justifyContent: "space-between",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    width: "100%",
  },
});
export const StyledJobContainer = styled("div")({
  margin: "10px 0",
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
});
export const StyledScheduler = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    width: "100%",
  },
});
export const AutoCompleteContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    width: "100%",
  },
});
export const CallStageDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "50%",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    width: "100%",
    marginBottom: "20px",
  },
});
export const JobOptions = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: "10px",
});
export const NewJob = styled("a")({
  cursor: "pointer",
  margin: 0,
  color: "#0D52A7",
  fontSize: "14px",
  fontWeight: "400",
  marginLeft: "5px",
});
export const ViewJob = styled("a")({
  margin: 0,
  cursor: "pointer",
  color: "#0D52A7",
  fontSize: "14px",
  fontWeight: "400",
  borderRight: "1px solid #0D52A7",
  padding: "0px 5px 0px 0px",
});
export const StyledButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    justifyContent: "center",
    marginTop: "50px",
  },
});
export const ContentContainer = styled("div")({
  borderRadius: "10px",
  border: "1px solid #DDDDDD",
  boxShadow: "0px 4px 10px 0px #0000001A",
  padding: "10px 20px",
  margin: "10px 0px 0px 0px",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    margin: "10px 0 0 10px",
  },
});
export const ContentDescription = styled("div")({
  display: "flex",
  flexDirection: "row",
  padding: "10px 10px",
});
export const ContentInnerDescription = styled("div")({
  padding: "0px",
  "&.content-innerdescriptions": {
    padding: "10px 20px",
  },
});
export const DeleteIcondiv = styled("div")({
  padding: "0px 20px",
  cursor: "pointer",
});
export const ContentStatusContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  justifyContent: "flex-end",
  width: "100%",
  // margin: "10px 0px 0px 0px",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    width: "20% !important",
  },
});
export const ContentIcon = styled(SquareRoundedIcon)({
  width: 30,
  height: 30,
  color: "#ccc",
});
export const TrackingContentDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "70%",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    marginRight: "10px",
  },
});
export const ContentDate = styled("p")({
  margin: "0",
  fontSize: "14px",
  fontWeight: "400",
  color: "#000000",
});
export const InfoName = styled("p")({
  color: "#0D52A7",
  fontWeight: "400",
  position: "relative",
  paddingRight: "10px",
  margin: "0",
  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "1px",
    background: "#0D52A7",
  },
});
export const InfoNameClient = styled("p")({
  color: "#0D52A7",
  fontWeight: "400",
  paddingLeft: "10px",
  margin: "0",
});
export const InfoNamespan = styled("span")({
  // fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "left",
  margin: "0",
});
export const CandidateInnerDetailsDiv = styled("div")({});
export const Content = styled("p")({
  margin: "0",
  wordBreak: "break-word",
  padding: "10px 10px",
});
export const ContentStatus = styled("p")({
  margin: "0",
  padding: "8px",
  borderRadius: "10px",
  fontSize: "14px",
  backgroundColor: "#88cb87",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    fontSize: "12px",
  },
});
export const ContentJob = styled("p")({
  margin: "0",
  padding: "3px",
  color: "#7c94ad",
});
export const ContentClient = styled("p")({
  margin: "0",
  padding: "3px",
  color: "#7c94ad",
});
export const FileDropCircle = styled("div")({
  width: 33,
  height: 33,
  border: "1px dotted #acbac9",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f4f3f2",
});
export const FileDropIcon = styled(ArrowUpwardTwoToneIcon)({
  color: "#acbac9",
});
export const DocumentDescription = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "60px",
  justifyContent: "space-between",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    flexDirection: "column",
    gap: "0px",
  },
});
export const DocxIcon = styled("img")({
  margin: 0,
  width: "25px",
  height: "25px",
  marginRight: "20px",
  paddingTop: "5px",
});
export const ContentParagraph = styled("p")({
  fontWeight: "400",
  fontSize: "14px",
  color: "#000000",
});
export const DeleteIcon = styled(DeleteOutlineOutlinedIcon)({
  marginLeft: "20px",
  cursor: "pointer",
});
export const CandidateDetailsOuter = styled("div")({
  boxShadow: "0px 4px 10px 0px #0000001A",
  alignItems: "center",
  border: "1px solid #ACACAC",
  borderRadius: "8px",
  padding: "10px 15px",
  margin: "0px 20px",
});
export const CloseIconDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});
export const CandidateDetails = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  padding: "0px 10px 10px 10px",
  borderBottom: "1px solid #ACACAC",
});
export const CandidateDetailsCTC = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  padding: "10px 0px 0px 0px",
});
export const CandidateInnerDetailsCTC = styled("div")({
  display: "flex",
  gap: "10px",
  position: "relative",
  alignItems: "center",
  paddingRight: "10px",
  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "1px",
    background: "#ACACAC",
  },
});
export const CandidateInnerDetailsInfo = styled("span")({
  fontSize: "14px",
  fontWeight: "400",
});
export const CandidateInnerDetailsValue = styled("span")({
  fontWeight: "600",
  fontSize: "14px",
  color: "#000000",
});
export const CandidateInnerDetails = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "Center",
  gap: "10px",
});
export const CandidateNotice = styled("p")({
  margin: 0,
  paddingTop: "10px",
});

export const CandidateCTC = styled("p")({
  margin: 0,
  paddingTop: "10px",
});

export const CandidateECTC = styled("p")({
  margin: 0,
  paddingTop: "10px",
});

export const CandidateOptions = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-end",
  height: "100%",
  rowGap: "50px",
});

export const CandidateContact = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const CandidateMail = styled("div")({
  paddingTop: "10px",
  display: "flex",
  columnGap: "10px",
});

export const CandidateMobile = styled("div")({
  paddingTop: "10px",
  display: "flex",
  columnGap: "10px",
});

export const CandidateLocation = styled("div")({
  paddingTop: "10px",
  display: "flex",
  columnGap: "10px",
});

export const ShowMoreDiv = styled("div")({
  cursor: "pointer",
  display: "flex",
  justifyContent: "flex-end",
});
export const ShowMore = styled("p")({
  fontSize: "14px",
  fontWeight: "400",
  color: "#0D52A7",
});
export const IconText = styled("p")({
  margin: "0",
  fontSize: "12px",
  textAlign: "center",
});

export const IconContainer = styled("div")({
  margin: "0",
  display: "flex",
  flexDirection: "column",
});
export const CandidateDetailsDiv = styled("div")({});
export const ClientDetailsDiv = styled("div")({});

// document page jsx
export const DocumentLeftContainer = styled("div")({
  margin: 0,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "60px",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    gap: "10px",
    flexDirection: "column",
  },
});
export const FileDropMainContainer = styled("div")({
  width: "70%",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    width: "100%",
  },
});

export const FileDropContainer = styled("div")(({ isDragging }) => ({
  padding: "30px 50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  border: isDragging ? "2px dashed #0055a5" : "2px dashed #ccc",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: isDragging ? "aliceblue" : "none"
}));
export const FileDropMessage = styled("p")({
  fontSize: "12px",
  fontWeight: "400",
  color: "#000000",
  // fontFamily: "Inter",
});
export const FileName = styled("div")({
  marginTop: "25px",
});
export const NoteContainer = styled("div")({});
export const NoteHeading = styled("p")({
  fontWeight: "500",
  fontSize: "14px",
  color: "#000000",
});
export const NoteListContainer = styled("ul")({
  margin: 0,
  padding: "0 15px",
  width: "100%",
});
export const NoteList = styled("li")({
  margin: 0,
  fontSize: "12px",
  fontWeight: "400",
  color: "#000000",
  lineHeight: "20px",
  "&::marker": {
    color: "#0D52A7",
  },
});
export const DocumentRightContainer = styled("div")({
  margin: 0,
  display: "flex",
  flexDirection: "column",
});
export const DescriptionHeading = styled("p")({
  fontWeight: "400",
  fontSize: "14px",
  color: "#000000",
});
export const DescriptionSpan = styled("span")({
  fontSize: "12px",
  fontWeight: "400",
  color: "#000000",
});
export const DocumentDescriptionInnerDiv = styled("div")({
  width: "70%",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    width: "100%",
  },
});
export const DescriptionTextBox = styled(TextInput)({
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
  margin: "0 0 20px 0",
});
export const StyledDocumentaButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  "@media screen and (min-width:640px) and (max-width:1200px)": {
    width: "100%",
    justifyContent: "center",
  },
});
export const DocumentMainInnerContainer = styled("div")({
  width: "100%",
  padding: "10px 0px",
  // "@media screen and (min-width:640px) and (max-width:1200px)": {

  // },
});
export const ContentDocumentContainer = styled("div")({
  border: "1px solid #DDDDDDDD",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px 0px #0000001A",
});
export const ContentDocumentDescription = styled("div")({
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid #DDDDDD",
  padding: "10px 10px",
  boxShadow: "0px 4px 10px 0px #0000000D",
});
export const PdfIcon = styled("img")({
  margin: 0,
  width: "25px",
  height: "25px",
  marginRight: "20px",
  paddingTop: "5px",
});
export const ContentItems = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const ContentHeading = styled("h5")({
  margin: 0,
  marginBottom: "10px",
  color: "#0D52A7",
});

export const DocumentHeading = styled("h3")({
  fontsize: "20px",
  fontWeight: "500",
  colors: "#000000",
  margin: "0",
  // marginTop: "50px",
  marginBottom: "20px",
});

export const DocumentHistoryHeading = styled("h3")({
  fontsize: "20px",
  fontWeight: "500",
  colors: "#000000",
  margin: "0",
  marginTop: "50px",
  marginBottom: "20px",
});

export const DocumentLowerContainer = styled("div")({
  maxHeight: "500px",
  overflowY: "auto",
  borderRadius: "10px",
  padding: "20px",
  // border: "1px solid #DDDDDD",
  // boxShadow: "0px 4px 10px 0px #0000001A",
  "@media screen and (min-width:640px) and (max-width:1220px)": {
    border: "1px solid #DDDDDD",
    boxShadow: "0px 4px 10px 0px #0000001A",
  },
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

export const DocumentContainer = styled("div")({});
export const ContentMainContainer = styled("div")({
  marginTop:"30px",
  borderRadius: "10px",
  // padding:"10px",
  "@media screen and (min-width:640px) and (max-width:991px)": {
    width: "95vw",
  },
});

export const SecondaryContentMainContainer = styled("div")({
  borderRadius: "10px",
  margin: 0,
  // padding: "10px",
  width: "100%",
  //  "@media screen and (min-width:640px) and (max-width:1220px)": {
  //  width:"90vw",
  // },
});

export const StyledCheckboxDiv = styled("div")({
  marginBottom: "10px"
});

export const DetailsDiv = styled("div")({
  display: "flex",
  flexDirection: "justify-content"
});
