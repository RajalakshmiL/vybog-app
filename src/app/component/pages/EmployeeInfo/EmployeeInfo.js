import React, { useState, useContext } from "react";
import * as StyledDOM from "./EmployeeInfo.jsx";
import { ReactComponent as LinkedInIcon } from "../../../../assets/image/linkedIn.svg";
import { ReactComponent as MailIcon } from "../../../../assets/image/mail_icon.svg";
import { ReactComponent as PhoneIcon } from "../../../../assets/image/phone_circle_icon.svg";
// import { ReactComponent as DocumentIcon } from "../../../../assets/image/Document-black-icon.svg";
// import { ReactComponent as DocumentActiveIcon } from "../../../../assets/image/Document-icon.svg";
// import { ReactComponent as ArrowIcon } from "../../../../assets/image/Right-Arrow-icon.svg";
// import { ReactComponent as ArrowActiveIcon } from "../../../../assets/image/Right-Active-Arrow-icon.svg";
import HorizontalTabs from "../../../common/HorizontalTabs/HorizontalTabs.js";
import { ReactComponent as PdfIcon } from "../../../../assets/image/PDF-icon.svg";
import { ReactComponent as DocxIcon } from "../../../../assets/image/DOC-icon.svg";
import Info from "./InfoPage.js";
import Documents from "./Documents.js";
import Messaging from "./Messaging.js";
import Resume from "./Resume.js";
import Tracking from "./Tracking.js";
import user from "../../../../assets/image/user_icon.svg";
import { ReactComponent as ProfileInfo } from "../../../../assets/image/Info-icon.svg";
import { ReactComponent as ProfileActiveInfo } from "../../../../assets/image/Info-Active-icon.svg";
import { ReactComponent as TrackingActiveIcon } from "../../../../assets/image/Tracking-star-active-icon.svg";
import { ReactComponent as TrackingIcon } from "../../../../assets/image/Tracking-star-icon.svg";
import { ReactComponent as DocumentsActiveIcon } from "../../../../assets/image/Document-Active-icon.svg";
import { ReactComponent as DocumentsIcon } from "../../../../assets/image/Document-icon.svg";
import { ReactComponent as ResumeIcon } from "../../../../assets/image/Resume-icon.svg";
import { ReactComponent as ResumeActiveIcon } from "../../../../assets/image/Resume-active-icon.svg";
import { ReactComponent as MessageIcon } from "../../../../assets/image/Message-icon.svg";
import { ReactComponent as MessageActiveIcon } from "../../../../assets/image/Message-active-icon.svg";
import { DynamicContext } from "../../../context/DynamicContext.js";

function EmployeeInfo() {
  const { activeTab, setActiveTab } 
     = useContext(DynamicContext);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [activeJob, setActiveJob] = useState(null);

  const handleJobClick = (jobId) => {
    setActiveJob(jobId);
  };

  const handleJobsContainerLengthChange = (length) => {
    setDocumentsCount(length);
  };

  const childrenProps = {
    onJobsContainerLengthChange: handleJobsContainerLengthChange,
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    setDocumentsCount(0);
  };

  const tabNames = [
    {
      name: "Info",
      icon: activeTab === 0 ? ProfileActiveInfo : ProfileInfo,
      number: null,
    },
    {
      name: "Tracking",
      icon: activeTab === 1 ? TrackingActiveIcon : TrackingIcon,
      number: null,
    },
    {
      name: "Documents",
      icon: activeTab === 2 ? DocumentsActiveIcon : DocumentsIcon,
      number:
        documentsCount > 0 ? (
          <span
            style={{
              borderRadius: "50%",
              // marginBottom: "3px",
              padding: "1px 5px",
              color: "rgb(234, 239, 243)",
              border: "2px solid rgb(255 255 255)",
              fontSize: "12px",
            }}
          >
            {documentsCount}
          </span>
        ) : null,
    },
    {
      name: "Resume",
      icon: activeTab === 3 ? ResumeActiveIcon : ResumeIcon,
      number: null,
    },
    {
      name: "Messaging",
      icon: activeTab === 4 ? MessageActiveIcon : MessageIcon,
      number: null,
    },
  ];
  const jobs = [
    {
      id: "job1",
      role: "DevOps Admin (TR58693)",
      skills: "DevOps, AWS, Shell, Java...",
    },
    {
      id: "job2",
      role: "React Sr. Developer with...",
      skills: "React, Node.js, HTML, CSS...",
    },
    {
      id: "job3",
      role: "Full Stack Developer - Java",
      skills: "DevOps, AWS, Shell, Java...",
    },
    {
      id: "job4",
      role: "Database Administrator",
      skills: "DevOps, AWS, Shell, Java...",
    },
  ];

  return (
    <StyledDOM.StyledMainContainer>
      <StyledDOM.StyledLeftContainer>
        <StyledDOM.StyledJobsContainer>
          <StyledDOM.StyledJobsSourceContainer>
            <StyledDOM.StyledName>Job Sourced</StyledDOM.StyledName>
          </StyledDOM.StyledJobsSourceContainer>
          {jobs.map((job) => (
            <StyledDOM.StyledJobs
              key={job.id}
              onClick={() => handleJobClick(job.id)}
              style={{
                backgroundColor:
                  activeJob === job.id ? "#F2F8FF" : "transparent",
                cursor: "pointer",
              }}
            >
              {activeJob === job.id ? (
                <StyledDOM.StyledDocumentActiveIcon />
              ) : (
                <StyledDOM.StyledDocumentIcon />
              )}
              <StyledDOM.StyledJobRoleContainer>
                <StyledDOM.StyledJobRole
                  style={{
                    color: activeJob === job.id ? "#0D52A7" : "black",
                    fontSize: "14px",
                  }}
                >
                  {job.role}
                </StyledDOM.StyledJobRole>
                <StyledDOM.StyledJobSkills
                  style={{
                    color: activeJob === job.id ? "#0D52A7" : "#7C94AD",
                    fontSize: "12px",
                  }}
                >
                  {job.skills}
                </StyledDOM.StyledJobSkills>
              </StyledDOM.StyledJobRoleContainer>
              {activeJob === job.id ? (
                <StyledDOM.StyledActiveArrowIcon />
              ) : (
                <StyledDOM.StyledArrowIcon />
              )}
            </StyledDOM.StyledJobs>
          ))}
        </StyledDOM.StyledJobsContainer>
        <StyledDOM.StyledResumeContainer>
          <StyledDOM.StyledJobsSourceContainer>
            <StyledDOM.StyledName>Resume History</StyledDOM.StyledName>
          </StyledDOM.StyledJobsSourceContainer>
          <StyledDOM.StyledJobs>
            <PdfIcon style={{ width: "30px", height: "30px" }} />
            <StyledDOM.StyledJobRoleContainer>
              <StyledDOM.StyledJobRole>
                Filename-user-upload.pdf
              </StyledDOM.StyledJobRole>
              <StyledDOM.StyledJobSkills>
                Aug 10, 2022
              </StyledDOM.StyledJobSkills>
            </StyledDOM.StyledJobRoleContainer>
            <StyledDOM.StyledEyeOpenIcon />
            <StyledDOM.StyledDownloadIcon />
          </StyledDOM.StyledJobs>
          <StyledDOM.StyledJobs>
            <DocxIcon style={{ width: "30px", height: "30px" }} />
            <StyledDOM.StyledJobRoleContainer>
              <StyledDOM.StyledJobRole>Skills updates</StyledDOM.StyledJobRole>
              <StyledDOM.StyledJobSkills>
                Sep 12, 2023
              </StyledDOM.StyledJobSkills>
            </StyledDOM.StyledJobRoleContainer>
            <StyledDOM.StyledEyeOpenIcon />
            <StyledDOM.StyledDownloadIcon />
          </StyledDOM.StyledJobs>
          <StyledDOM.StyledJobs>
            <PdfIcon style={{ width: "30px", height: "30px" }} />
            <StyledDOM.StyledJobRoleContainer>
              <StyledDOM.StyledJobRole>
                Filename-user-upload.docx
              </StyledDOM.StyledJobRole>
              <StyledDOM.StyledJobSkills>
                Oct 25, 2023
              </StyledDOM.StyledJobSkills>
            </StyledDOM.StyledJobRoleContainer>
            <StyledDOM.StyledEyeOpenIcon />
            <StyledDOM.StyledDownloadIcon />
          </StyledDOM.StyledJobs>
          <StyledDOM.StyledJobs>
            <PdfIcon style={{ width: "30px", height: "30px" }} />
            <StyledDOM.StyledJobRoleContainer>
              <StyledDOM.StyledJobRole>
                Roles and Skills updates
              </StyledDOM.StyledJobRole>
              <StyledDOM.StyledJobSkills>
                Nov 25, 2023
              </StyledDOM.StyledJobSkills>
            </StyledDOM.StyledJobRoleContainer>
            <StyledDOM.StyledEyeOpenIcon />
            <StyledDOM.StyledDownloadIcon />
          </StyledDOM.StyledJobs>
        </StyledDOM.StyledResumeContainer>
      </StyledDOM.StyledLeftContainer>
      <StyledDOM.StyledRightContainer className="right-container">
        <StyledDOM.StyledContainerDetails>
          <StyledDOM.StyledRightContainerTop>
            <StyledDOM.StyledPersonalDetails>
              <StyledDOM.StyledImageIcon src={user}></StyledDOM.StyledImageIcon>
              <StyledDOM.StyledNameContainer>
                <StyledDOM.StyledName>
                  Thirumurugan Sethupathy
                </StyledDOM.StyledName>
                <StyledDOM.StyledPosition>
                  DevOps Administrator
                </StyledDOM.StyledPosition>
              </StyledDOM.StyledNameContainer>
              <StyledDOM.StyledLinkedIn>
                <LinkedInIcon style={{ width: "40px", height: "40px" }} />
              </StyledDOM.StyledLinkedIn>
            </StyledDOM.StyledPersonalDetails>
            <StyledDOM.StyledContactContainer>
              <StyledDOM.StyledMail>
                <MailIcon />
                <StyledDOM.StyledContact>
                  thirumurugan.sethupathy@gmail.com
                </StyledDOM.StyledContact>
              </StyledDOM.StyledMail>
              <StyledDOM.StyledPhone>
                <PhoneIcon />
                <StyledDOM.StyledContact>
                  +1.408.123.4567
                </StyledDOM.StyledContact>
              </StyledDOM.StyledPhone>
            </StyledDOM.StyledContactContainer>
          </StyledDOM.StyledRightContainerTop>
          <StyledDOM.StyledRightContainerHeader>
            <HorizontalTabs
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              tabNames={tabNames}
              containerStyle={{ justifyContent: "space-around" }}
              HorizontalTabContainerStyle={{ width: "100%" }}
            />
          </StyledDOM.StyledRightContainerHeader>
        </StyledDOM.StyledContainerDetails>
        <StyledDOM.StyledContentPage className="employee-contentpage">
          {activeTab === 0 && <Info />}
          {activeTab === 1 && <Tracking />}
          {activeTab === 2 && <Documents {...childrenProps} />}
          {activeTab === 3 && <Resume />}
          {activeTab === 4 && <Messaging />}
        </StyledDOM.StyledContentPage>
      </StyledDOM.StyledRightContainer>
    </StyledDOM.StyledMainContainer>
  );
}

export default EmployeeInfo;
