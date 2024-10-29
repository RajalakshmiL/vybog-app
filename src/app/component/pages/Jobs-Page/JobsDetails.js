import React, {useContext} from "react";
import * as StyledDOM from "./JobsDetails.jsx";
import JobInfo from "./JobInfo.js";
import JobTracking from "./JobTracking.js";
import JobDocuments from "./JobDocuments.js";
import JobProposals from "./JobProposals.js";
import { DynamicContext } from "../../../context/DynamicContext.js";

function JobsDetails() {
  const {
    activeTab,
    setDocumentsCount,
  } = useContext(DynamicContext);

  const handleJobsContainerLengthChange = (length) => {
    setDocumentsCount(length);
  };

  const childrenProps = {
    onJobsContainerLengthChange: handleJobsContainerLengthChange,
  };

  return (
    <StyledDOM.StyledMainContainer className="jobmain-container">
      <StyledDOM.StyledRightContainer className="job-rightcontainer">
        <StyledDOM.StyledContentPage className="content-job">
          {activeTab === 0 && <JobInfo />}
          {activeTab === 1 && <JobTracking  />}
          {activeTab === 2 && <JobDocuments {...childrenProps} />}
          {activeTab === 3 && <JobProposals  />}
        </StyledDOM.StyledContentPage>
      </StyledDOM.StyledRightContainer>
    </StyledDOM.StyledMainContainer>
  );
}

export default JobsDetails;
