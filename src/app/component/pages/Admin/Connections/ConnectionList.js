import React from "react";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import Table from "../../../../common/Table/Table.js";
import ConnectionListData from "../../../../../assets/json/Menu.json";
import AddIcon from "../../../../../assets/image/GreenPlusIcon.svg";
import Menuselector from "../../../../common/PageSelector/Menuselector.js";
import { useNavigate } from "react-router-dom";
import { ReactComponent as InActiveConnectionIcon } from "../../../../../assets/image/inactive-conection.svg";
import { ReactComponent as ActiveConnectionIcon } from "../../../../../assets/image/active-conection.svg";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../../common/CommonFunctions/CommonFunctions";

function ConnectionList() {
  const navigate = useNavigate();
  const { menuDatas = {} } = ConnectionListData || {};
  const { ConnectionList = [] } = menuDatas || {};

  const options = [{ name: "View / Edit Portal Details" }];

  const columns = [
    {
      name: "Source System",
      selector: (row) => <span>{row?.sourceSystem}</span>,
    },
    { name: "Source Type", selector: (row) => <span>{row?.sourceType}</span> },
    {
      name: "Connection Method",
      selector: (row) => <span>{row?.parserAPI}</span>,
    },
    { name: "Quota", selector: (row) => <span>{row?.quota}</span> },
    {
      name: "Views Remaining",
      selector: (row) => <span>{row?.viewsRemaining}</span>,
    },
    {
      name: "Status",
      cell: (row) =>
        row?.active ? <ActiveConnectionIcon /> : <InActiveConnectionIcon />,
    },
    {
      selector: (row, index) => (
        <Menuselector
          options={options}
          onSelect={(item) => handleSelect(item, index)}
          onOpen={() => handleOpenMenuSelector(index)}
          onClose={handleCloseMenuSelector}
          rowIndex={index}
          menuStyle={{
            "& .MuiPaper-root": {
              width: "200px !important",
              left: "calc(100% - 230px) !important",
            },
          }}
        />
      ),
      width: "200px",
    },
  ];

  const handleSelect = (item, rowIndex) => {
    if (item === "View / Edit Portal Details") {
      const selectedConnection = ConnectionList[rowIndex];
      navigate("/add-connection", {
        state: { connectionData: selectedConnection },
      });
    }
  };

  const handleAddNewConnection = () => {
    navigate("/add-connection", {
      state: { connectionData: null },
    });
  };

  return (
    <>
      <StyledDOM.StyledMenuHeading>
        Connection List{" "}
        <StyledDOM.StyledHeaderCountSpan>{`(${ConnectionList.length} results)`}</StyledDOM.StyledHeaderCountSpan>
      </StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledButtonStageDiv>
        <StyledDOM.StyledAddingButton
          iconSrc={AddIcon}
          label="Add New Portal Connection"
          event={handleAddNewConnection}
        />
      </StyledDOM.StyledButtonStageDiv>
      <Table
        data={ConnectionList}
        columns={columns}
        fixedHeader
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
      />
    </>
  );
}

export default ConnectionList;
