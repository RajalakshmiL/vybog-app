import React, { useState, useContext } from "react";
import HorizontalTabsHeader from "../../../common/HorizontalTabs/HorizontalTabsHeader.js";
import * as StyledDOM from "./CandidatePage.jsx";
import BasicInfoPage from "./BasicInfoPage";
import SpecificationPage from "./SpecificationPage";
import EducationPage from "./EducationPage";
import ExperiencePage from "./ExperiencePage";
import AdditionalDetailsPage from "./AdditionalDetailsPage";
import ProfessionalInfoPage from "./ProfessionalInfoPage.js";
import { ReactComponent as Additional } from "../../../../assets/image/Additional.svg";
import { ReactComponent as AdditionalActive } from "../../../../assets/image/AdditionalActive.svg";
import { ReactComponent as UserIconActive } from "../../../../assets/image/ProfileIconActive.svg";
import { ReactComponent as UserIcon } from "../../../../assets/image/Profile.svg";
import { ReactComponent as SpecializationIcon } from "../../../../assets/image/specialiaztion-icon.svg";
import { ReactComponent as SpecializationIconActive } from "../../../../assets/image/Specializationicon-active.svg";
import { ReactComponent as ExperienceIcon } from "../../../../assets/image/ExperienceIcon.svg";
import { ReactComponent as ExperienceIconActive } from "../../../../assets/image/ExperienceIcon-active.svg";
import { ReactComponent as EducationIcon } from "../../../../assets/image/EducationIcon.svg";
import { ReactComponent as EducationIconActive } from "../../../../assets/image/EducationIconActive.svg";
import { ReactComponent as ProfessionalIconActive } from "../../../../assets/image/professionalActiveIcon.svg";
import { ReactComponent as ProfessionalIcon } from "../../../../assets/image/professionalIcon.svg";
import { CustomizedProgressBars } from "../../../common/LinearProgress/LinearProgress.js";
import { DynamicContext } from "../../../context/DynamicContext.js";

function CandidatePage() {
  const { activeTab, setActiveTab } = useContext(DynamicContext);

  const [isfilled, setIsfilled] = useState(false);
  const [fillingPercentages, setFillingPercentages] = useState({
    basicInfo: 0,
    professionalInfo: 0,
    specification: 0,
    experience: 0,
    education: 0,
    additional: 0,
  });
  const handleTabChange = (index) => {
    if (isfilled) {
      setActiveTab(index);
    }
  };

  const childrenProps = {
    isfilled,
    setIsfilled,
    setFillingPercentages,
  };
  // console.log("fillingPercentages", fillingPercentages);
  const overallPercentage = Math.round(
    (fillingPercentages.basicInfo +
      fillingPercentages.professionalInfo +
      fillingPercentages.specification +
      fillingPercentages.experience +
      fillingPercentages.education +
      fillingPercentages.additional) /
      6
  );
  const tabNames = [
    {
      name: "Basic Info",
      icon: activeTab === 0 ? UserIconActive : UserIcon,
    },
    {
      name: "Professional Info",
      icon: activeTab === 1 ? ProfessionalIconActive : ProfessionalIcon,
    },
    {
      name: "Specialization",
      icon: activeTab === 2 ? SpecializationIconActive : SpecializationIcon,
    },
    {
      name: "Experience",
      icon: activeTab === 3 ? ExperienceIconActive : ExperienceIcon,
    },
    {
      name: "Education",
      icon: activeTab === 4 ? EducationIconActive : EducationIcon,
    },
    {
      name: "Additional",
      icon: activeTab === 5 ? AdditionalActive : Additional,
    },
  ];

  return (
    <>
      <StyledDOM.StyledCandidatePage className="candidate-page">
        <StyledDOM.StyledCandidateContainer className="candiadte-container">
          <StyledDOM.StyledH3>Create Candidate</StyledDOM.StyledH3>
          <StyledDOM.StyledPercentageContainer className="percentage-container">
            <StyledDOM.StyledSpanContainer>{`${overallPercentage} % to complete`}</StyledDOM.StyledSpanContainer>
            <StyledDOM.StyledProgressOuter className="progress-outer">
              <CustomizedProgressBars
                value={fillingPercentages.basicInfo}
                tooltipTitle="Basic Info"
              />
              <CustomizedProgressBars
                value={fillingPercentages.professionalInfo}
                tooltipTitle="Professional Info"
              />
              <CustomizedProgressBars
                value={fillingPercentages.specification}
                tooltipTitle="Specification"
              />
              <CustomizedProgressBars
                value={fillingPercentages.experience}
                tooltipTitle="Experience"
              />
              <CustomizedProgressBars
                value={fillingPercentages.education}
                tooltipTitle="Education"
              />
              <CustomizedProgressBars
                value={fillingPercentages.additional}
                tooltipTitle="Additional Details"
              />
            </StyledDOM.StyledProgressOuter>
          </StyledDOM.StyledPercentageContainer>{" "}
        </StyledDOM.StyledCandidateContainer>
        <StyledDOM.StyledEntireContent className="entire-content">
          <HorizontalTabsHeader
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            tabNames={tabNames}
            isfilled={isfilled}
          />
          <StyledDOM.StyledPageContent className="page-content">
            {activeTab === 0 && <BasicInfoPage {...childrenProps} />}
            {activeTab === 1 && <ProfessionalInfoPage {...childrenProps} />}
            {activeTab === 2 && <SpecificationPage {...childrenProps} />}
            {activeTab === 3 && <ExperiencePage {...childrenProps} />}
            {activeTab === 4 && <EducationPage {...childrenProps} />}
            {activeTab === 5 && <AdditionalDetailsPage {...childrenProps} />}
          </StyledDOM.StyledPageContent>
        </StyledDOM.StyledEntireContent>
      </StyledDOM.StyledCandidatePage>
    </>
  );
}

export default CandidatePage;
