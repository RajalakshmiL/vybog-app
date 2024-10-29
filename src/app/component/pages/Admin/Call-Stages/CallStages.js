import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import callStagesData from "../../../../../assets/json/Menu.json";
import DynamicCheckBox from "../../../../common/CheckBox/CheckBox";
import Menuselector from "../../../../common/PageSelector/Menuselector";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import ModalPopup from "../../../../common/Modal-Popup/ModalPopup";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
  Popupscroll,
} from "../../../../common/CommonFunctions/CommonFunctions";
import { useFormik } from "formik";
import Button from "../../../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import ActiveAnimation from "../../../../../assets/json/active.json";
import AddIcon from "../../../../../assets/image/GreenPlusIcon.svg";

function CallStages() {
  const navigate = useNavigate();
  const { menuDatas = {} } = callStagesData || {};
  const { CallStages: initialCallStages = [] } = menuDatas || [];

  const [checkboxStates, setCheckboxStates] = useState(
    initialCallStages.map((stage) => ({
      Active: stage.Active,
      DashboardView: stage.DashboardView,
    }))
  );

  const [callStages, setCallStages] = useState(initialCallStages);
  const [editCallStage, setEditCallStage] = useState(false);
  const [addNewCallStage, setAddNewCallStage] = useState(false);
  const [selectedCallStageIndex, setSelectedCallStageIndex] = useState(null);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [togglingStageIndex, setTogglingStageIndex] = useState(null);
  const [togglingKey, setTogglingKey] = useState(null);
  const [desiredState, setDesiredState] = useState(null);

  const formik = useFormik({
    initialValues: {
      editedCallStageName: "",
      callStageSearch: "",
    },
    onSubmit: (values) => {
      handleUpdateCallStage(values.editedCallStageName);
    },
  });

  const addFormik = useFormik({
    initialValues: {
      newCallStageName: "",
    },
    onSubmit: (values) => {
      handleAddNewCallStage(values.newCallStageName);
    },
  });

  const handleCheckboxChange = (index, key) => {
    const currentState = checkboxStates[index]?.[key];
    setTogglingStageIndex(index);
    setTogglingKey(key);
    setDesiredState(!currentState);
    setShowConfirmationPopup(true);
  };

  const handleConfirm = () => {
    if (togglingStageIndex !== null && togglingKey !== null) {
      setCheckboxStates((prevState) =>
        prevState.map((item, idx) =>
          idx === togglingStageIndex
            ? { ...item, [togglingKey]: desiredState }
            : item
        )
      );
      setCallStages((prevStages) =>
        prevStages.map((stage, idx) =>
          idx === togglingStageIndex
            ? { ...stage, [togglingKey]: desiredState }
            : stage
        )
      );
    }
    setShowConfirmationPopup(false);
    setTogglingStageIndex(null);
    setTogglingKey(null);
    setDesiredState(null);
  };

  const handleCancel = () => {
    setShowConfirmationPopup(false);
    setTogglingStageIndex(null);
    setTogglingKey(null);
    setDesiredState(null);
  };

  const handleSelect = (item, rowIndex) => {
    if (item === "Edit Call Stage Name") {
      setSelectedCallStageIndex(rowIndex);
      formik.setFieldValue(
        "editedCallStageName",
        callStages[rowIndex].callStageName
      );
      setEditCallStage(true);
    }
  };

  const handleUpdateCallStage = (newCallStageName) => {
    const updatedCallStages = [...callStages];
    updatedCallStages[selectedCallStageIndex].callStageName = newCallStageName;
    setCallStages(updatedCallStages);
    setEditCallStage(false);
  };

  const handleAddNewCallStage = (newCallStageName) => {
    const newCallStage = {
      callStageName: newCallStageName,
      Active: true,
      DashboardView: true,
    };
    setCallStages([...callStages, newCallStage]);
    setCheckboxStates([
      ...checkboxStates,
      { Active: true, DashboardView: true },
    ]);
    setAddNewCallStage(false);
  };

  const columns = [
    {
      name: "Call Stage Name",
      selector: (row) => <span>{row?.callStageName}</span>,
    },
    {
      name: "Active",
      selector: (row, index) => (
        <DynamicCheckBox
          checked={checkboxStates[index]?.Active}
          onChange={() => handleCheckboxChange(index, "Active")}
        >
          {checkboxStates[index]?.Active ? "Active" : "Inactive"}
        </DynamicCheckBox>
      ),
    },
    {
      name: "Dashboard View",
      selector: (row, index) => (
        <DynamicCheckBox
          checked={checkboxStates[index]?.DashboardView}
          onChange={() => handleCheckboxChange(index, "DashboardView")}
        >
          {checkboxStates[index]?.DashboardView ? "Visible" : "Hidden"}
        </DynamicCheckBox>
      ),
    },
    {
      name: "Menus",
      selector: (row, index) => (
        <>
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
        </>
      ),
      width: "200px",
    },
  ];

  const options = [
    {
      name: "Edit Call Stage Name",
    },
  ];

  Popupscroll(editCallStage || addNewCallStage || showConfirmationPopup);

  return (
    <>
      {showConfirmationPopup &&
        togglingStageIndex !== null &&
        togglingKey !== null && (
          <ModalPopup
            isOpen={showConfirmationPopup}
            onClose={handleCancel}
            showPlayer={true}
            playerSrc={ActiveAnimation}
            title={`Change ${togglingKey} Status`}
            message={`Do you want to ${
              desiredState ? "activate" : "deactivate"
            } this ${
              togglingKey === "Active" ? "Call Stage" : "Dashboard View"
            }?`}
            confirmLabel={desiredState ? "Activate" : "Deactivate"}
            cancelLabel="Cancel"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            normalButton={desiredState ? true : false}
          />
        )}

      {editCallStage && (
        <ContentDialog
          title={"Edit Call Stage"}
          isOpen={editCallStage}
          onClose={() => setEditCallStage(false)}
          contentHeight="200px"
          submitButtonLabel={"Update"}
          isCancel={true}
          event={formik.handleSubmit}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="editedCallStageName"
            label={"Edit Call Stage Name"}
            placeholder={"Edit Call Stage Name"}
            onChange={formik.handleChange}
            value={formik.values.editedCallStageName}
          />
        </ContentDialog>
      )}
      {addNewCallStage && (
        <ContentDialog
          title={"Add New Call Stage"}
          isOpen={addNewCallStage}
          onClose={() => setAddNewCallStage(false)}
          contentHeight="200px"
          submitButtonLabel={"Add"}
          isCancel={true}
          event={
            addFormik.values.newCallStageName === ""
              ? null
              : addFormik.handleSubmit
          }
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="newCallStageName"
            label={"New Call Stage Name"}
            placeholder={"New Call Stage Name"}
            onChange={addFormik.handleChange}
            value={addFormik.values.newCallStageName}
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>Call Stages</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledMainSearchContainer className="main-container">
        <StyledDOM.StyledSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="Call Stages"
            placeholder="Call Stages"
            name="callStageSearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.callStageSearch}
            onChange={formik.handleChange}
          />
          <Button
            label="Search"
            event={() => {
              console.log(
                "CallStage search value",
                formik.values.callStageSearch
              );
            }}
          />
          <Button label="Cancel" isCancel={true} />
        </StyledDOM.StyledSearchContainer>
        <StyledDOM.StyledButtonStageDiv>
          <Button
            label="Call Stage Access"
            event={() => navigate("/stage-access-control")}
          />
          <StyledDOM.StyledAddingButton
            iconSrc={AddIcon}
            label="Add New Call Stage"
            event={() => setAddNewCallStage(true)}
          />
        </StyledDOM.StyledButtonStageDiv>
      </StyledDOM.StyledMainSearchContainer>
      <Table
        data={callStages}
        columns={columns}
        fixedHeader={true}
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
      />
    </>
  );
}

export default CallStages;
