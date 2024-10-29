import React from "react";
import Table from "../../../common/Table/Table.js";
import proposalData from "../../../../assets/json/Table.json";
import { LinearIndeterminate } from "../../../common/LinearProgress/LinearProgress";
import * as StyledDOM from "../Candidate-Page/CandidatePage.jsx";
import "../../../common/common.css";
// import { DynamicContext } from "../../../context/DynamicContext.js";

function JobProposals() {
  // const { pending } = useContext(DynamicContext);

  const { staticdata = {} } = proposalData;
  const { proposalData: tableData = [] } = staticdata || [];

  const columns = [
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

  return (
    <>
      <StyledDOM.ProposalTableMainDiv className="table-proposalmaindiv">
        <StyledDOM.JobsProposalsMainContainer className="proposalTableOuterDiv">
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
      </StyledDOM.ProposalTableMainDiv>
    </>
  );
}

export default JobProposals;
