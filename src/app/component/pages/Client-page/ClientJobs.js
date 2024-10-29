import React, { useContext } from "react";
import Table from "../../../common/Table/Table.js";
import proposalData from "../../../../assets/json/Table.json";
import { LinearIndeterminate } from "../../../common/LinearProgress/LinearProgress";
import * as StyledDOM from "../Candidate-Page/CandidatePage.jsx";
import "../../../common/common.css";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete.js";
import staticValues from "../../../../assets/json/staticData.json";
import { useFormik } from "formik";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import { DynamicContext } from "../../../context/DynamicContext.js";

function ClientJobs() {
  const { staticData = {} } = staticValues;
  const { roles = [] } = staticData || [];
  const {
    candidateDetails,
    setCandidateDetails,
    // pending
  } =useContext(DynamicContext);

  const { staticdata = {} } = proposalData;
  const { proposalData: tableData = [] } = staticdata || [];

  const columns = [
    // {
    //   name: "id",
    //   selector: (row) => row.id,
    //   style: {
    //     "@media (min-width: 1600px)": {
    //       fontSize: "1vw !important",
    //       padding: "1vw",
    //     },
    //     "@media (max-width: 1599px)": {
    //       fontSize: "16px !important",
    //     },
    //   },
    // },
    {
      id: "1",
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
    },
    {
      name: "Skill",
      selector: (row) => row.skill.join(", "),
    },
    {
      name: "CTC/ECTC/Notice",
      selector: (row) => row.status,
    },
    {
      name: "Tag",
      selector: (row) => <StyledDOM.StyledJobsButton label={row?.tag} />,
    },
  ];

  const currentTableData = tableData;

  const formik = useFormik({
    initialValues: [
      {
        jobsName: "",
        stageTag: "",
      },
    ],
    // validationSchema: validationSchema,

    onSubmit: (values) => {
      setCandidateDetails([...candidateDetails, values]);
      console.log(values);
    },
  });

  return (
    <>
      <StyledDOM.JobsProposalsMainContainer className="proposalTableOuterDiv">
        <StyledDOM.JobContainer>
          <StyledDOM.JobLabel>Job</StyledDOM.JobLabel>
          <CustomAutocomplete
            key="jobsName"
            autocompleteOuterDiv={{ width: "30%" }}
            fieldLabel="Jobs Name"
            InputWrapperStyle={{ width: "300px" }}
            listBoxStyle={{ width: "300px", zIndex: "9999999" }}
            freeSolo={true}
            placeholder="Jobs name"
            options={roles}
            showDownArrowIcon={true}
            defaultValues={formik.values.jobsName}
            value={formik.values.jobsName}
            onChange={(newValue) => {
              formik.setFieldValue("jobsName", newValue);
            }}
          />
        </StyledDOM.JobContainer>
        <StyledDOM.JobStatusOuterContainer className="jobstatus-outercontainer">
          <StyledDOM.JobStatusInnerLeftContainer>
            <StyledDOM.JobStatusContainer style={{ paddingLeft: "15px" }}>
              <StyledDOM.JobNumber>330</StyledDOM.JobNumber>
              <StyledDOM.JobStatus>Proposed</StyledDOM.JobStatus>
            </StyledDOM.JobStatusContainer>
            <StyledDOM.JobStatusContainer>
              <StyledDOM.JobNumber>110</StyledDOM.JobNumber>
              <StyledDOM.JobStatus>Interview</StyledDOM.JobStatus>
            </StyledDOM.JobStatusContainer>
            <StyledDOM.JobStatusContainer>
              <StyledDOM.JobNumber>60</StyledDOM.JobNumber>
              <StyledDOM.JobStatus>Offer</StyledDOM.JobStatus>
            </StyledDOM.JobStatusContainer>
            <StyledDOM.JobStatusContainer>
              <StyledDOM.JobNumber>55</StyledDOM.JobNumber>
              <StyledDOM.JobStatus>Joined</StyledDOM.JobStatus>
            </StyledDOM.JobStatusContainer>
            <StyledDOM.JobStatusContainer>
              <StyledDOM.JobNumber>10</StyledDOM.JobNumber>
              <StyledDOM.JobStatus>Rejected</StyledDOM.JobStatus>
            </StyledDOM.JobStatusContainer>
          </StyledDOM.JobStatusInnerLeftContainer>
          <StyledDOM.JobStatusInnerRightContainer className="jobstatusinner-rightcontainer">
            <StyledDOM.StyledJobTagStageDiv
              className="Tagstage-div"
              // style={{ width: "60%" }}
            >
              <CustomAutocomplete
                key="stageTag"
                fieldLabel="Stage/Tag"
                InputWrapperStyle={{ width: "300px" }}
                listBoxStyle={{ zIndex: "999999" }}
                freeSolo={true}
                placeholder="Stage/Tag"
                options={roles}
                showDownArrowIcon={true}
                defaultValues={formik.values.stageTag}
                value={formik.values.stageTag}
                onChange={(newValue) => {
                  formik.setFieldValue("stageTag", newValue);
                }}
              />
            </StyledDOM.StyledJobTagStageDiv>

            <ViewWeekOutlinedIcon />
          </StyledDOM.JobStatusInnerRightContainer>
        </StyledDOM.JobStatusOuterContainer>
        <Table
          columns={columns}
          data={currentTableData}
          fixedHeader={true}
          fixedHeaderScrollHeight={"500px"}
          highlightOnHover
          progressComponent={<LinearIndeterminate />}
          // progressPending={pending}
        />
      </StyledDOM.JobsProposalsMainContainer>
    </>
  );
}

export default ClientJobs;
