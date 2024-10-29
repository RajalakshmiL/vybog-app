import React, { useState } from "react";
import Table from "../../../../common/Table/Table.js";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import * as DeleteStyledDOM from "../../../pages/Candidate-Page/ExperiencePage.jsx";
import EmailTemplatesData from "../../../../../assets/json/Menu.json";
import Menuselector from "../../../../common/PageSelector/Menuselector.js";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../../common/CommonFunctions/CommonFunctions.js";
import { useNavigate } from "react-router-dom";

function EmailTemplates() {
  const navigate = useNavigate();
  const { menuDatas = {} } = EmailTemplatesData || {};
  const { Email_Templates = [] } = menuDatas || {};
  const [templates, setTemplates] = useState(Email_Templates);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const options = [
    { name: "View / Edit Email Template" },
    { name: "Delete Email Template" },
  ];

  const columns = [
    { name: "Shortname ID", selector: (row) => <span>{row?.title}</span> },
    { name: "Subject", selector: (row) => <span>{row?.subject}</span> },
    {
      selector: (row, index) => (
        <>
          <Menuselector
            options={options}
            onSelect={(item) => handleSelect(item, index, row)}
            onOpen={() => handleOpenMenuSelector(index)}
            onClose={handleCloseMenuSelector}
            rowIndex={index}
            menuStyle={{
              "& .MuiPaper-root": {
                width: "auto !important",
              },
            }}
          />
          {renderDeleteConfirmation(index)}
        </>
      ),
      width: "200px",
    },
  ];

  const handleSelect = (item, rowIndex, row) => {
    switch (item) {
      case "View / Edit Email Template":
        const selectedEmailTemplate = templates[rowIndex];
        navigate("/edit-email-template", {
          state: { Email_Templates_Data: selectedEmailTemplate },
        });
        break;
      case "Delete Email Template":
        setConfirmDeleteIndex(rowIndex);
        break;
      default:
        break;
    }
  };

  const handleDeleteState = (rowIndex) => {
    const updatedTemplates = templates.filter((_, index) => index !== rowIndex);
    setTemplates(updatedTemplates);
    setConfirmDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    if (rowIndex === confirmDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this Email Template?
          </DeleteStyledDOM.StyledDeleteSpan>
          <DeleteStyledDOM.StyledDeleteButtonContainer className="delete-button-container">
            <DeleteStyledDOM.StyledYesButton
              label="Yes"
              event={() => handleDeleteState(rowIndex)}
            />
            <DeleteStyledDOM.StyledNoButton
              label="No"
              event={() => setConfirmDeleteIndex(null)}
            />
          </DeleteStyledDOM.StyledDeleteButtonContainer>
        </DeleteStyledDOM.StyledDeleteContainer>
      );
    }
    return null;
  };

  return (
    <>
      <StyledDOM.StyledMenuHeading>
        Email Template List
      </StyledDOM.StyledMenuHeading>
      <Table
        data={templates}
        columns={columns}
        fixedHeader={true}
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
      />
    </>
  );
}

export default EmailTemplates;
