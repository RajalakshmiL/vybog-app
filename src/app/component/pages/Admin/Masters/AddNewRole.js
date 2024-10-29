import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import roleData from "../../../../../assets/json/Menu.json";
import DynamicCheckBox from "../../../../common/CheckBox/CheckBox";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import { Popupscroll } from "../../../../common/CommonFunctions/CommonFunctions";
import { useFormik } from "formik";
import Button from "../../../../common/Button/Button";
import SelectInput from "../../../../common/SelectInput/SelectInput";
import optionData from "../../../../../assets/json/staticData.json";
import lightIcon from "../../../../../assets/image/light.svg";
import ModalPopup from "../../../../common/Modal-Popup/ModalPopup";
import ActiveAnimation from "../../../../../assets/json/active.json";
import AddIcon from "../../../../../assets/image/GreenPlusIcon.svg";

function AddNewRoles() {
  const { menuDatas = {} } = roleData || {};
  const { AddNewRoles = [] } = menuDatas || [];
  const { staticData = {} } = optionData || {};
  const { Domain = [] } = staticData || {};

  const [checkboxStates, setCheckboxStates] = useState(
    AddNewRoles.map((role) => ({
      Active: role.Active,
    }))
  );

  const [roles, setRoles] = useState(AddNewRoles);
  const [addNewRole, setAddNewRole] = useState(false);
  const [showActivePopup, setShowActivePopup] = useState(false);
  const [togglingRolesIndex, setTogglingRolesIndex] = useState(null);
  const [desiredActiveState, setDesiredActiveState] = useState(null);
  const formik = useFormik({
    initialValues: {
      newRoleName: "",
      newRoleType: "",
      roleSearch: "",
      roleType: "",
    },
    onSubmit: (values) => {
      handleAddNewRole(values.newRoleName, values.newRoleType);
      console.log("Add New Role", formik.values);
    },
  });

  const handleCheckboxChange = (index) => {
    const currentState = checkboxStates[index]?.Active;
    const newState = !currentState;
    setTogglingRolesIndex(index);
    setDesiredActiveState(newState);
    setShowActivePopup(true);
  };

  const handleAddNewRole = (newRoleName, newRoleType) => {
    const newRole = {
      roleName: newRoleName,
      roleType: newRoleType,
      Active: true,
    };
    setRoles([...roles, newRole]);
    setCheckboxStates([...checkboxStates, { Active: true }]);
    setAddNewRole(false);
  };

  const columns = [
    {
      name: "Role Name",
      selector: (row) => <span>{row?.roleName}</span>,
    },
    {
      name: "Role Type",
      selector: (row) => <span>{row?.roleType}</span>,
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
  ];
  const handleConfirm = () => {
    if (togglingRolesIndex !== null && desiredActiveState !== null) {
      setCheckboxStates((prevState) =>
        prevState.map((item, idx) =>
          idx === togglingRolesIndex
            ? { ...item, Active: desiredActiveState }
            : item
        )
      );
      setRoles((prevRoles) =>
        prevRoles.map((roles, idx) =>
          idx === togglingRolesIndex
            ? { ...roles, Active: desiredActiveState }
            : roles
        )
      );
    }
    setShowActivePopup(false);
    setTogglingRolesIndex(null);
    setDesiredActiveState(null);
  };

  const handleCancel = () => {
    setShowActivePopup(false);
    setTogglingRolesIndex(null);
    setDesiredActiveState(null);
  };
  Popupscroll(addNewRole || showActivePopup);

  return (
    <>
      {showActivePopup &&
        togglingRolesIndex !== null &&
        desiredActiveState !== null && (
          <ModalPopup
            isOpen={showActivePopup}
            showPlayer={true}
            onClose={handleCancel}
            playerSrc={ActiveAnimation}
            title={
              <>
                <StyledDOM.StyledActivatePopupHeader>
                  {roles[togglingRolesIndex]?.roleName}
                </StyledDOM.StyledActivatePopupHeader>
              </>
            }
            message={
              desiredActiveState
                ? "Do you want to activate this Role?"
                : "Do you want to deactivate this Role?"
            }
            confirmLabel={desiredActiveState ? "Activate" : "Deactivate"}
            cancelLabel="Cancel"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            normalButton={desiredActiveState ? true : false}
          />
        )}
      {addNewRole && (
        <ContentDialog
          title={"Add New Role"}
          isOpen={addNewRole}
          onClose={() => setAddNewRole(false)}
          contentHeight="250px"
          submitButtonLabel={"Add"}
          isCancel={true}
          event={
            formik.values.newRoleName && formik.values.newRoleType === ""
              ? null
              : formik.handleSubmit
          }
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="newRoleName"
            label={"New Role Name"}
            placeholder={"New Role Name"}
            onChange={formik.handleChange}
            value={formik.values.newRoleName}
          />
          <SelectInput
            label="Role Type"
            options={Domain}
            name="newRoleType"
            value={formik.values.newRoleType}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>Roles List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledSkillMainSearchContainer className="main-container">
        <StyledDOM.StyledSkillSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="Role"
            placeholder="Role"
            name="roleSearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.roleSearch}
            onChange={formik.handleChange}
          />{" "}
          <SelectInput
            label="Role Type"
            options={Domain}
            name="roleType"
            value={formik.values.roleType}
            onChange={formik.handleChange}
          />
          <StyledDOM.StyledDivButton>
            <Button
              label="Search"
              event={() => {
                console.log("Role search value", formik.values);
              }}
            />
            <Button
              label="Cancel"
              isCancel={true}
              event={formik.resetForm}
              style={{ marginRight: "0px" }}
            />
          </StyledDOM.StyledDivButton>
        </StyledDOM.StyledSkillSearchContainer>
        <StyledDOM.StyledAddingButtonContainer className="Adding-button-container">
          <StyledDOM.StyledAddingButton
            label="Add New Role"
            iconSrc={AddIcon}
            event={() => setAddNewRole(true)}
          />
        </StyledDOM.StyledAddingButtonContainer>
      </StyledDOM.StyledSkillMainSearchContainer>
      <StyledDOM.StyledLightIconContainer className="image-container">
        <StyledDOM.StyledLightIcon alt="light" src={lightIcon} />
        <StyledDOM.StyledLightIconText>
          CONFIRM NON-EXISTENCE OF ROLE BEFORE ADDING
        </StyledDOM.StyledLightIconText>
      </StyledDOM.StyledLightIconContainer>
      <StyledDOM.StyledConvertContainer className="convert-container">
        <StyledDOM.StyledSkillTableContainer className="skill-table">
          <Table
            data={roles}
            columns={columns}
            fixedHeader={true}
            fixedHeaderScrollHeight={"500px"}
            highlightOnHover
          />
        </StyledDOM.StyledSkillTableContainer>
        <StyledDOM.StyledSkillNotesContainer className="notes-container">
          <h3>Note :</h3>
          <StyledDOM.StyledInnerSkillNotes>
            Create only Technical Roles.
            <span>
              For example:
              <StyledDOM.StyledInnerHighlightSpan className="importent-span">
                {" "}
                Hadoop Developer, SQL Server DBA, Sharepoint Developer, etc.
              </StyledDOM.StyledInnerHighlightSpan>
            </span>
            Do not create generic roles such as: Systems Analyst, Software
            Engineer, Systems Engineer, etc.
          </StyledDOM.StyledInnerSkillNotes>
          <StyledDOM.StyledInnerHighlightSpan className="importent-span">
            {" "}
            Role is a very important element in conducting valid candidate
            searches and is invaluable in the process of shortlisting candidates
            from the huge database.
          </StyledDOM.StyledInnerHighlightSpan>
        </StyledDOM.StyledSkillNotesContainer>
      </StyledDOM.StyledConvertContainer>
    </>
  );
}

export default AddNewRoles;
