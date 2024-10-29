import React, {useContext} from "react";
import * as StyledDOM from "./ClientDetails.jsx";
import ClientInfo from "./ClientInfo.js";
import ClientDocuments from "./ClientDocuments.js";
import ClientJobs from "./ClientJobs.js";
import ClientTracking from "./ClientTracking.js";
import { DynamicContext } from "../../../context/DynamicContext.js";

function ClientDetails() {
  const {
    activeTab,
    setDocumentsCount,
  }  = useContext(DynamicContext);

  const handleJobsContainerLengthChange = (length) => {
    setDocumentsCount(length);
  };
  const childrenProps = {
    onJobsContainerLengthChange: handleJobsContainerLengthChange,
  };
  return (
    <StyledDOM.StyledMainContainer className="clientmain-container">
      <StyledDOM.StyledRightContainer className="clientright-container">
        <StyledDOM.StyledContentPage className="Client-content">
          {activeTab === 0 && <ClientInfo />}
          {activeTab === 1 && <ClientTracking  />}
          {activeTab === 2 && <ClientDocuments {...childrenProps} />}
          {activeTab === 3 && <ClientJobs  />}
        </StyledDOM.StyledContentPage>
      </StyledDOM.StyledRightContainer>
    </StyledDOM.StyledMainContainer>
  );
}

export default ClientDetails;
