import React from "react";
import reportsData from "../../../../assets/json/staticData.json";
import * as StyledDOM from "./Reports.jsx";
import { formatDate } from "../../../common/CommonFunctions/CommonFunctions";
import Button from "../../../common/Button/Button";
import { useNavigate } from "react-router-dom";
function ReportDetails() {
  const navigate = useNavigate();
  const { staticData = {} } = reportsData || {};
  const { DailyReport = [] } = staticData || {};
  return (
    <>
      {" "}
      <StyledDOM.StyledHeaderWithButton className="header">
        <StyledDOM.StyledReportHeading>
          Report Details -{" "}
          <StyledDOM.StyledEmployeeName>
            Nandhakumar Sri
          </StyledDOM.StyledEmployeeName>
        </StyledDOM.StyledReportHeading>

        <Button
          label={"Back To Reports"}
          event={() => navigate("/reports")}
          isCancel={true}
        />
      </StyledDOM.StyledHeaderWithButton>
      {DailyReport.map((data, index) => (
        <StyledDOM.StyledReportContainer
          key={index}
          className="report-container"
        >
          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              Employee
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {data.reportFor}
            </p>
          </StyledDOM.StyledReportInnerContainer>
          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              Report Date
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {formatDate(Date())}
            </p>
          </StyledDOM.StyledReportInnerContainer>

          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              Total Calls
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {data.totalCalls}
            </p>
          </StyledDOM.StyledReportInnerContainer>
          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              Demo V3 hours
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {data.demoV3hours}
            </p>
          </StyledDOM.StyledReportInnerContainer>
          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              Project hours
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {data.projectHours}
            </p>
          </StyledDOM.StyledReportInnerContainer>
          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              In Time
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {data.inTime}
            </p>
          </StyledDOM.StyledReportInnerContainer>
          <StyledDOM.StyledReportInnerContainer className="report-inner">
            <StyledDOM.StyledInnerHeadings>
              Out Time
            </StyledDOM.StyledInnerHeadings>
            <p>
              {" "}
              : {""}
              {data.outTime}
            </p>
          </StyledDOM.StyledReportInnerContainer>
        </StyledDOM.StyledReportContainer>
      ))}
      <StyledDOM.StyledRemarkContainer className="remarks-container">
        <StyledDOM.StyledSubHeadings>Summary :</StyledDOM.StyledSubHeadings>
        <StyledDOM.StyledContentContainer className="createdContent">
          Today's Report: – 1) I completed set validation schema and error
          validation, as well as other functional work on the Daily Report page.
          2) I finished all of the function and UI development work for the
          Daily Report pages. 3) I'm currently working on table implementation,
          adding json data for table data, and other function and UI development
          work in the All Reports page and i pushed latest changes to Vybog 2.0
          (dev-main) branch sir.
        </StyledDOM.StyledContentContainer>
      </StyledDOM.StyledRemarkContainer>
    </>
  );
}

export default ReportDetails;
