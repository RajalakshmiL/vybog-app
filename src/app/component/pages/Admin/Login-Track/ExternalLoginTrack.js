import React from "react";
import Table from "../../../../common/Table/Table.js";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import TableData from "../../../../../assets/json/Menu.json";

function ExternalLoginTrack() {   
  const { menuDatas = {} } = TableData || {};
  const { ExternalLoginTrack = [] } = menuDatas || {};
  const columns = [
    {
      name: "Employee Name",
      selector: (row) => <span>{row?.employeeName}</span>,
    },
    {
      name: "User Name Tried",
      selector: (row) => <span>{row?.usernameTried}</span>,
    },
    {
      name: "Login Date & Time",
      selector: (row) => <span>{row?.loginDate}</span>,
    },
    {
      name: "IP Address",
      selector: (row) => <span>{row?.ipAddress}</span>,
    },
  ];
  return (
    <>
      <StyledDOM.StyledMenuHeading>
        External Login Track
      </StyledDOM.StyledMenuHeading>
      <Table
        columns={columns}
        data={ExternalLoginTrack}
        fixedHeader={true}
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
        pagination={true}
        paginationPerPage={20}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </>
  );
}

export default ExternalLoginTrack;
