import React from "react";
import * as StyledDOM from "./InfoPage.jsx";
import MailIconActive from "../../../../assets/image/mail-iconactive.svg";
import WhatsappIconActive from "../../../../assets/image/whatsapp-active.svg";
import ClockIconActive from "../../../../assets/image/clockiconactive.svg";
import staticValues from "../../../../assets/json/staticData.json";
import Chip from "@mui/material/Chip";
import { formatDate } from "../../../common/CommonFunctions/CommonFunctions.js";
import { ReactComponent as ProfilePic } from "../../../../assets/image/Info-Profile-Pic.svg";

function Info() {
  const { staticData = {} } = staticValues || {};
  const { skills } = staticData || [];
  return (
    <StyledDOM.InfoMainContainer className="candidate-info">
      <StyledDOM.StyledInfoUpdate className="candidateupdate-date">
        <StyledDOM.InfoLabel>Last Updated</StyledDOM.InfoLabel>
        <StyledDOM.InfoValue style={{ margin: "0" }}>
          Oct 23, 2023
        </StyledDOM.InfoValue>
      </StyledDOM.StyledInfoUpdate>
      <StyledDOM.StyledEmployerDetails className="employer-details">
        <StyledDOM.StyledEmployerCompany className="employer-company">
          <StyledDOM.InfoLabel style={{ margin: "1em 0" }}>
            Current Employer
          </StyledDOM.InfoLabel>
          <StyledDOM.InfoValue>XYZ India Ltd </StyledDOM.InfoValue>
        </StyledDOM.StyledEmployerCompany>
        <StyledDOM.StyledEmployerCertification className="employer-cerification">
          <StyledDOM.InfoLabel style={{ margin: "1em 0" }}>
            Certification
          </StyledDOM.InfoLabel>
          <StyledDOM.InfoValue>AWS Certified</StyledDOM.InfoValue>
        </StyledDOM.StyledEmployerCertification>
      </StyledDOM.StyledEmployerDetails>
      <StyledDOM.StyledPersonalInfoSkillDiv className="skill-container">
        <StyledDOM.InfoLabel style={{ marginRight: "30px" }}>
          Skills
        </StyledDOM.InfoLabel>
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
      <StyledDOM.StyledPersonalInfoDiv className="candidate-informationdiv">
        <StyledDOM.InfoHeader>Personal Info</StyledDOM.InfoHeader>
        <StyledDOM.InfoContentMainDiv className="candidate-contentDiv">
          <StyledDOM.StyledPersonalInfoContentDiv className="candidateinfo-content">
            <StyledDOM.PersonalInfoLabel>Location</StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>Mumbai, India</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
          <StyledDOM.StyledPersonalInfoContentDiv className="candidateinfo-content">
            <StyledDOM.PersonalInfoLabel>
              Experience
            </StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>12.5 years</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
          <StyledDOM.StyledPersonalInfoContentDiv className="candidateinfo-content">
            <StyledDOM.PersonalInfoLabel>Domain</StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>Banking, Insurance</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
          <StyledDOM.StyledPersonalInfoContentDiv className="candidateinfo-content">
            <StyledDOM.PersonalInfoLabel>Visa</StyledDOM.PersonalInfoLabel>
            <StyledDOM.InfoValue>H1 B</StyledDOM.InfoValue>
          </StyledDOM.StyledPersonalInfoContentDiv>
        </StyledDOM.InfoContentMainDiv>
      </StyledDOM.StyledPersonalInfoDiv>
      <StyledDOM.ContentDetailsMainDiv className="contact-info-div">
        <StyledDOM.InfoHeader>Contact Info</StyledDOM.InfoHeader>
        <StyledDOM.ContentInfoDetailsInnerDiv className="contentdetails-innerdiv">
          <StyledDOM.InfoLabel>Alternate contact</StyledDOM.InfoLabel>
          <StyledDOM.ContentDetailsInfoWrapperDiv className="contact-details-wrapper">
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
          </StyledDOM.ContentDetailsInfoWrapperDiv>
        </StyledDOM.ContentInfoDetailsInnerDiv>
        <StyledDOM.ContentInfoDetailsInnerSecondDiv className="contentdetails-innerdiv">
          <StyledDOM.InfoLabel>Availability</StyledDOM.InfoLabel>
          <StyledDOM.ContentDetailsInfoInnerDiv className="contact-details-info">
            <StyledDOM.ContentTimeIconActive
              src={ClockIconActive}
              alt="whatsapp-icon"
            />
            <StyledDOM.InfoValue>Mostly in Phone 5-8pm</StyledDOM.InfoValue>
          </StyledDOM.ContentDetailsInfoInnerDiv>
        </StyledDOM.ContentInfoDetailsInnerSecondDiv>
      </StyledDOM.ContentDetailsMainDiv>
      <StyledDOM.RecuriteNoteMainDiv className="recuriternote-maindiv">
        <StyledDOM.InfoHeader>Recruiter Notes</StyledDOM.InfoHeader>
        <StyledDOM.RecuriterNoteContainerDiv className="recuriternote-container">
          <StyledDOM.RecruiterDetails className="recuriter-details">
            <StyledDOM.InfoName>
              <ProfilePic />
              <StyledDOM.InfoText>Dinesh Kumar</StyledDOM.InfoText>
            </StyledDOM.InfoName>
            <StyledDOM.InfoValue>{formatDate(new Date())}</StyledDOM.InfoValue>
          </StyledDOM.RecruiterDetails>
          <StyledDOM.RecuriteNoteDiv>
            <StyledDOM.RecruiterNotes>
              Candidate exhibits strong proficiency in software engineering
              principles with expertise in Python, Java, and JavaScript.
              Demonstrated adaptability and a collaborative mindset through
              cross-functional team experience. Proactive learner evidenced by
              pursuit of online courses and self-directed projects. Known for
              delivering high-quality code under tight deadlines. Overall, a
              promising candidate poised to make significant contributions to
              our engineering team.
            </StyledDOM.RecruiterNotes>
          </StyledDOM.RecuriteNoteDiv>
        </StyledDOM.RecuriterNoteContainerDiv>
        <StyledDOM.RecuriterNoteContainerDiv className="recuriternote-container">
          <StyledDOM.RecruiterDetails>
            <StyledDOM.InfoName>
              <ProfilePic />
              <StyledDOM.InfoText>Dinesh Kumar</StyledDOM.InfoText>
            </StyledDOM.InfoName>
            <StyledDOM.InfoValue>{formatDate(new Date())}</StyledDOM.InfoValue>
          </StyledDOM.RecruiterDetails>
          <StyledDOM.RecuriteNoteDiv>
            <StyledDOM.InfoValue>
              Candidate exhibits strong proficiency in software engineering
              principles with expertise in Python, Java, and JavaScript.
              Demonstrated adaptability and a collaborative mindset through
              cross-functional team experience. Proactive learner evidenced by
              pursuit of online courses and self-directed projects. Known for
              delivering high-quality code under tight deadlines. Overall, a
              promising candidate poised to make significant contributions to
              our engineering team.
            </StyledDOM.InfoValue>
          </StyledDOM.RecuriteNoteDiv>
        </StyledDOM.RecuriterNoteContainerDiv>
      </StyledDOM.RecuriteNoteMainDiv>
    </StyledDOM.InfoMainContainer>
  );
}

export default Info;
