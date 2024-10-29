import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import skillData from "../../../../../assets/json/Menu.json";
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

function AddNewSkills() {
  const { menuDatas = {} } = skillData || {};
  const { AddNewSkills = [] } = menuDatas || [];
  const { staticData = {} } = optionData || {};
  const { Domain = [] } = staticData || {};
  const [checkboxStates, setCheckboxStates] = useState(
    AddNewSkills.map((skill) => ({
      Active: skill.Active,
    }))
  );
  const [skills, setSkills] = useState(AddNewSkills);
  const [addNewSkill, setAddNewSkill] = useState(false);
  const [showActivePopup, setShowActivePopup] = useState(false);
  const [togglingSkillIndex, setTogglingSkillIndex] = useState(null);
  const [desiredActiveState, setDesiredActiveState] = useState(null);

  const formik = useFormik({
    initialValues: {
      newSkillName: "",
      newSkillType: "",
      skillSearch: "",
      skillType: "",
    },
    onSubmit: (values) => {
      handleAddNewSkill(values.newSkillName, values.newSkillType);
      console.log("Add New Skill", formik.values);
    },
  });

  const handleCheckboxChange = (index) => {
    const currentState = checkboxStates[index]?.Active;
    const newState = !currentState;
    setTogglingSkillIndex(index);
    setDesiredActiveState(newState);
    setShowActivePopup(true);
  };

  const handleConfirm = () => {
    if (togglingSkillIndex !== null && desiredActiveState !== null) {
      setCheckboxStates((prevState) =>
        prevState.map((item, idx) =>
          idx === togglingSkillIndex
            ? { ...item, Active: desiredActiveState }
            : item
        )
      );
      setSkills((prevSkills) =>
        prevSkills.map((skill, idx) =>
          idx === togglingSkillIndex
            ? { ...skill, Active: desiredActiveState }
            : skill
        )
      );
    }
    setShowActivePopup(false);
    setTogglingSkillIndex(null);
    setDesiredActiveState(null);
  };

  const handleCancel = () => {
    setShowActivePopup(false);
    setTogglingSkillIndex(null);
    setDesiredActiveState(null);
  };

  const handleAddNewSkill = (newSkillName, newSkillType) => {
    const newSkill = {
      skillName: newSkillName,
      skillType: newSkillType,
      Active: true,
    };
    setSkills([...skills, newSkill]);
    setCheckboxStates([...checkboxStates, { Active: true }]);
    setAddNewSkill(false);
  };

  const columns = [
    {
      name: "Skill Name",
      selector: (row) => <span>{row?.skillName}</span>,
    },
    {
      name: "Skill Type",
      selector: (row) => <span>{row?.skillType}</span>,
    },
    {
      name: "Active",
      selector: (row, index) => (
        <DynamicCheckBox
          checked={checkboxStates[index]?.Active}
          onChange={() => handleCheckboxChange(index)}
        >
          {checkboxStates[index]?.Active ? "Active" : "Inactive"}
        </DynamicCheckBox>
      ),
    },
  ];

  Popupscroll(addNewSkill || showActivePopup);

  return (
    <>
      {showActivePopup &&
        togglingSkillIndex !== null &&
        desiredActiveState !== null && (
          <ModalPopup
            isOpen={showActivePopup}
            showPlayer={true}
            onClose={handleCancel}
            playerSrc={ActiveAnimation}
            title={
              <>
                <StyledDOM.StyledActivatePopupHeader>
                  {skills[togglingSkillIndex]?.skillName}
                </StyledDOM.StyledActivatePopupHeader>
              </>
            }
            message={
              desiredActiveState
                ? "Do you want to activate this skill?"
                : "Do you want to deactivate this skill?"
            }
            confirmLabel={desiredActiveState ? "Activate" : "Deactivate"}
            cancelLabel="Cancel"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            normalButton={desiredActiveState ? true : false}
          />
        )}

      {addNewSkill && (
        <ContentDialog
          title={"Add New Skill"}
          isOpen={addNewSkill}
          onClose={() => setAddNewSkill(false)}
          contentHeight="250px"
          submitButtonLabel={"Add"}
          isCancel={true}
          event={
            formik.values.newSkillName && formik.values.newSkillType === ""
              ? null
              : formik.handleSubmit
          }
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="newSkillName"
            label={"New Skill Name"}
            placeholder={"New Skill Name"}
            onChange={formik.handleChange}
            value={formik.values.newSkillName}
          />
          <SelectInput
            label="Skill Type"
            options={Domain}
            name="newSkillType"
            value={formik.values.newSkillType}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}
      <StyledDOM.StyledMenuHeading>Skills List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledSkillMainSearchContainer className="main-container">
        <StyledDOM.StyledSkillSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="Skill"
            placeholder="Skill"
            name="skillSearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.skillSearch}
            onChange={formik.handleChange}
          />{" "}
          <SelectInput
            label="Skill Type"
            options={Domain}
            name="skillType"
            value={formik.values.skillType}
            onChange={formik.handleChange}
          />
          <StyledDOM.StyledDivButton>
            <Button
              label="Search"
              event={() => {
                console.log("Skill search value", formik.values);
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
            label="Add New Skill"
            iconSrc={AddIcon}
            event={() => setAddNewSkill(true)}
          />
        </StyledDOM.StyledAddingButtonContainer>
      </StyledDOM.StyledSkillMainSearchContainer>
      <StyledDOM.StyledLightIconContainer className="image-container">
        <StyledDOM.StyledLightIcon alt="light" src={lightIcon} />
        <StyledDOM.StyledLightIconText>
          CONFIRM NON-EXISTENCE OF SKILL BEFORE ADDING
        </StyledDOM.StyledLightIconText>
      </StyledDOM.StyledLightIconContainer>
      <StyledDOM.StyledConvertContainer className="convert-container">
        <StyledDOM.StyledSkillTableContainer className="skill-table">
          <Table
            data={skills}
            columns={columns}
            fixedHeader={true}
            fixedHeaderScrollHeight={"500px"}
            highlightOnHover
          />
        </StyledDOM.StyledSkillTableContainer>
        <StyledDOM.StyledSkillNotesContainer className="notes-container">
          <h3>Note :</h3>
          <StyledDOM.StyledInnerSkillNotes>
            Create only Technical Skills.
            <span>
              For example:
              <StyledDOM.StyledInnerHighlightSpan className="importent-span">
                {" "}
                SQL Server DBA, Core Java, Oracle DBA, etc.
              </StyledDOM.StyledInnerHighlightSpan>
            </span>
            <StyledDOM.StyledInnerSkillNotes>
              Do not combine more than one skill with one entry (e.g., PHP with
              MySQL).
            </StyledDOM.StyledInnerSkillNotes>
          </StyledDOM.StyledInnerSkillNotes>{" "}
          <StyledDOM.StyledInnerHighlightSpan className="importent-span">
            {" "}
            Skill is a very important element in conducting valid candidate
            searches and is invaluable in the process of shortlisting candidates
            from the huge database.
          </StyledDOM.StyledInnerHighlightSpan>
        </StyledDOM.StyledSkillNotesContainer>
      </StyledDOM.StyledConvertContainer>
    </>
  );
}

export default AddNewSkills;
