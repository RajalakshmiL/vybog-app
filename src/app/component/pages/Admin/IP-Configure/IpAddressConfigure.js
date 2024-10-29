import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import * as DeleteStyledDOM from "../../Candidate-Page/ExperiencePage.jsx";
import IpAddressData from "../../../../../assets/json/Menu.json";
import Menuselector from "../../../../common/PageSelector/Menuselector";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
  Popupscroll,
} from "../../../../common/CommonFunctions/CommonFunctions";
import AddIcon from "../../../../../assets/image/GreenPlusIcon.svg";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import { useFormik } from "formik";

function IpAddressConfigure() {
  const { menuDatas = {} } = IpAddressData || {};   
  const { IP_Address = [] } = menuDatas || {};

  const [ipData, setIpData] = useState(IP_Address);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIP, setSelectedIP] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const formik = useFormik({
    initialValues: {
      addIPAddress: selectedIP?.ipAddress || "",
      addLabel: selectedIP?.description || "",
    },
    enableReinitialize: true,
  });

  const columns = [
    {
      name: "IP Address",
      selector: (row) => <span>{row?.ipAddress}</span>,
    },
    {
      name: "Label / Description",
      selector: (row) => <span>{row?.description}</span>,
    },
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
                width: "200px !important",
                left: "calc(100% - 230px) !important",
              },
            }}
          />
          {renderDeleteConfirmation(index)}
        </>
      ),
      width: "200px",
    },
  ];

  const options = [{ name: "Edit IP Address" }, { name: "Delete IP Address" }];

  const handleSelect = (item, rowIndex, row) => {
    switch (item) {
      case "Edit IP Address":
        setSelectedIP(row);
        setSelectedIndex(rowIndex);
        setEditMode(true);
        setIsDialogOpen(true);
        break;
      case "Delete IP Address":
        setConfirmDeleteIndex(rowIndex);
        break;
      default:
        break;
    }
  };

  const handleDeleteState = (index) => {
    const updatedData = ipData.filter((_, i) => i !== index);
    setIpData(updatedData);
    setConfirmDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    if (rowIndex === confirmDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this IP Address?
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

  const handleSubmit = () => {
    if (formik.values.addIPAddress && formik.values.addLabel !== "") {
      const newIP = {
        ipAddress: formik.values.addIPAddress,
        description: formik.values.addLabel,
      };
      if (editMode) {
        const updatedData = [...ipData];
        updatedData[selectedIndex] = newIP;
        setIpData(updatedData);
      } else {
        setIpData((prevData) => [...prevData, newIP]);
      }
      formik.resetForm();
      setIsDialogOpen(false);
      setEditMode(false);
      setSelectedIP(null);
      setSelectedIndex(null);
    }
  };

  Popupscroll(isDialogOpen);

  return (
    <>
      {isDialogOpen && (
        <ContentDialog
          title={editMode ? "Edit IP Address" : "Add IP Address"}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditMode(false);
            setSelectedIP(null);
            setSelectedIndex(null);
          }}
          contentHeight="250px"
          submitButtonLabel={editMode ? "Update" : "Add"}
          isCancel={true}
          event={handleSubmit}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addIPAddress"
            label={"IP Address"}
            placeholder={"IP Address"}
            onChange={formik.handleChange}
            value={formik.values.addIPAddress}
          />
          <StyledDOM.StyledTextInput
            type="text"
            name="addLabel"
            label={"Label / Description"}
            placeholder={"Label / Description"}
            onChange={formik.handleChange}
            value={formik.values.addLabel}
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>
        IP Address Configure
      </StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledButtonStageDiv>
        <StyledDOM.StyledAddingButton
          iconSrc={AddIcon}
          label="Add IP Address"
          event={() => {
            setEditMode(false);
            setSelectedIP(null);
            setSelectedIndex(null);
            setIsDialogOpen(true);
          }}
        />
      </StyledDOM.StyledButtonStageDiv>
      <Table
        data={ipData}
        columns={columns}
        fixedHeader={true}
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
      />
    </>
  );
}

export default IpAddressConfigure;
