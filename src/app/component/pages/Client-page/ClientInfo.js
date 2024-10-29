import React from "react";
import * as StyledDOM from "../EmployeeInfo/InfoPage.jsx";
import pdf from "../../../../assets/image/PDF-icon.svg";
import doc from "../../../../assets/image/DOC-icon.svg";
import xls from "../../../../assets/image/xls_8361442.png";
import txt from "../../../../assets/image/txt.png";
import MailIconActive from "../../../../assets/image/mail-iconactive.svg";
import WhatsappIconActive from "../../../../assets/image/whatsapp-active.svg";
import ClockIconActive from "../../../../assets/image/clockiconactive.svg";
import staticValues from "../../../../assets/json/staticData.json";
import Chip from "@mui/material/Chip";
function ClientInfo() {
  const { staticData = {} } = staticValues || {};
  const { skills } = staticData || [];
  return (
    <StyledDOM.InfoMainContainer>
      <StyledDOM.StyledPersonalInfoSkillDiv className="skill-container">
        <StyledDOM.InfoLabel>Skills</StyledDOM.InfoLabel>
        <div>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill.title}
              style={{
                marginRight: "5px",
                marginBottom: "5px",
                backgroundColor: "#E4F1FF",
                color: "#0D52A7",
                fontsize: "14px",
                fontWeight: "500",
              }}
            />
          ))}
        </div>
      </StyledDOM.StyledPersonalInfoSkillDiv>
      <StyledDOM.StyledPersonalInfoDiv className="personal-informationdiv">
        <StyledDOM.InfoHeader>Personal Info</StyledDOM.InfoHeader>
        <StyledDOM.PersonalInfoContentMainDiv className="PersonalInfo-contentDiv">
          <StyledDOM.StyledPersonalInfoContentDiv className="personal-info-content">
            <StyledDOM.PersonalInfoLabel>Location</StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>Mumbai, India</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
          <StyledDOM.StyledPersonalInfoContentDiv className="personal-info-content">
            <StyledDOM.PersonalInfoLabel>
              Experience
            </StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>12.5 years</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
          <StyledDOM.StyledPersonalInfoContentDiv className="personal-info-content">
            <StyledDOM.PersonalInfoLabel>Domain</StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>Banking, Insurance</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
          <StyledDOM.StyledPersonalInfoContentDiv className="personal-info-content">
            <StyledDOM.PersonalInfoLabel>Budget</StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>21 LPA</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
        </StyledDOM.PersonalInfoContentMainDiv>
      </StyledDOM.StyledPersonalInfoDiv>
      <StyledDOM.ContentDetailsMainDiv className="contact-info-div">
        <StyledDOM.InfoHeader>Contact Info</StyledDOM.InfoHeader>
        <StyledDOM.ContentDetailsInnerDiv className="contentdetails-innerdiv">
          <StyledDOM.InfoLabel>Alternate contact</StyledDOM.InfoLabel>
          <StyledDOM.ContentDetailsInfoInnerDiv className="contact-details-info">
            <StyledDOM.ContentMailIconActive
              src={MailIconActive}
              alt="mail-icon"
            />
            <StyledDOM.InfoValue>
              thirumrugan.sethupathy@gmail.com
            </StyledDOM.InfoValue>
          </StyledDOM.ContentDetailsInfoInnerDiv>
          <StyledDOM.ContentDetailsInfoInnerDiv>
            <StyledDOM.ContentMobileIconActive
              src={WhatsappIconActive}
              alt="whatsapp-icon"
            />
            <StyledDOM.InfoNumber>8825576960</StyledDOM.InfoNumber>
          </StyledDOM.ContentDetailsInfoInnerDiv>
        </StyledDOM.ContentDetailsInnerDiv>
        <StyledDOM.ContentDetailsInnerSecondDiv className="contentdetails-innerdiv">
          <StyledDOM.InfoLabel>Availability</StyledDOM.InfoLabel>
          <StyledDOM.ContentDetailsInfoInnerDiv className="contact-details-info">
            <StyledDOM.ContentTimeIconActive
              src={ClockIconActive}
              alt="whatsapp-icon"
            />
            <StyledDOM.InfoValue>Mostly in Phone 5-8pm</StyledDOM.InfoValue>
          </StyledDOM.ContentDetailsInfoInnerDiv>
        </StyledDOM.ContentDetailsInnerSecondDiv>
      </StyledDOM.ContentDetailsMainDiv>
      <StyledDOM.SocialMediaDiv>
        <StyledDOM.InfoLabel>LinkedIn</StyledDOM.InfoLabel>
        <StyledDOM.InfoValue>
          linkedin.com/company/94858903043..
        </StyledDOM.InfoValue>
      </StyledDOM.SocialMediaDiv>
      <StyledDOM.DocumentDownloadDiv>
        <StyledDOM.InfoLabel>Documents</StyledDOM.InfoLabel>
        <StyledDOM.DocumentDownloadInnerDiv>
          <a href={pdf} download="document.pdf">
            <StyledDOM.StyledImage src={pdf} />
          </a>
          <a href={doc} download="document.doc">
            <StyledDOM.StyledImage src={doc} />
          </a>
          <a href={xls} download="document.xls">
            <StyledDOM.StyledImage src={xls} />
          </a>
          <a href={txt} download="document.txt">
            <StyledDOM.StyledImage src={txt} />
          </a>
        </StyledDOM.DocumentDownloadInnerDiv>
      </StyledDOM.DocumentDownloadDiv>
      <StyledDOM.InfoLowerContainer>
        <StyledDOM.InfoHeader>Client Notes</StyledDOM.InfoHeader>
        <StyledDOM.JobDescription>
          Candidate exhibits strong proficiency in software engineering
          principles with expertise in Python, Java, and JavaScript.
          Demonstrated adaptability and a collaborative mindset through
          cross-functional team experience. Proactive learner evidenced by
          pursuit of online courses and self-directed projects. Known for
          delivering high-quality code under tight deadlines. Overall, a
          promising candidate poised to make significant contributions to our
          engineering team.
        </StyledDOM.JobDescription>
      </StyledDOM.InfoLowerContainer>
    </StyledDOM.InfoMainContainer>
  );
}

export default ClientInfo;
