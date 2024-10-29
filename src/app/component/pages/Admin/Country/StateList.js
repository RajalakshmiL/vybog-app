import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import TableData from "../../../../../assets/json/Menu.json";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import * as DeleteStyledDOM from "../../Candidate-Page/ExperiencePage.jsx";
import Button from "../../../../common/Button/Button";
import { useFormik } from "formik";
import lightIcon from "../../../../../assets/image/light.svg";
import AddIcon from "../../../../../assets/image/GreenPlusIcon.svg";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import SelectInput from "../../../../common/SelectInput/SelectInput";
import OptionData from "../../../../../assets/json/staticData.json";
import {
  Popupscroll,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../../common/CommonFunctions/CommonFunctions";
import Menuselector from "../../../../common/PageSelector/Menuselector";

function StateList() {
  const { menuDatas = {} } = TableData || {};
  const { StateList = [] } = menuDatas || {};
  const { staticData = {} } = OptionData || {};
  const { country: CountryOption = [] } = staticData || {};

  const [stateList, setStateList] = useState(StateList);
  const [AddState, setAddState] = useState(false);
  const [editingStateIndex, setEditingStateIndex] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      stateSearch: "",
      addNewState: "",
      countryForAddNewState: "",
    },
  });

  const handleSelect = (item, rowIndex) => {
    const selectedState = stateList[rowIndex];

    switch (item) {
      case "Edit State":
        setAddState(true);
        formik.setValues({
          addNewState: selectedState?.stateName,
          countryForAddNewState: selectedState?.country,
        });
        setEditingStateIndex(rowIndex);
        break;

      case "Delete State":
        setConfirmDeleteIndex(rowIndex);
        break;

      default:
        break;
    }
  };

  const handleDeleteState = (rowIndex) => {
    const updatedStateList = stateList.filter((_, index) => index !== rowIndex);
    setStateList(updatedStateList);
    setConfirmDeleteIndex(null);
  };

  const handleAddOrEditState = () => {
    const { addNewState, countryForAddNewState } = formik.values;

    if (addNewState && countryForAddNewState !== "") {
      const newState = {
        stateName: addNewState,
        country: countryForAddNewState,
      };

      if (editingStateIndex !== null) {
        const updatedStateList = [...stateList];
        updatedStateList[editingStateIndex] = newState;
        setStateList(updatedStateList);
        setEditingStateIndex(null);
      } else {
        setStateList([...stateList, newState]);
      }

      setAddState(false);
      formik.resetForm();
    }
  };

  const options = [
    {
      name: "Edit State",
    },
    {
      name: "Delete State",
    },
  ];

  const renderDeleteConfirmation = (rowIndex) => {
    if (rowIndex === confirmDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this state?
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

  const columns = [
    {
      name: "State Name",
      selector: (row) => <span>{row?.stateName}</span>,
    },
    {
      name: "Country Name",
      selector: (row) => <span>{row?.country}</span>,
    },
    {
      selector: (row, index) => (
        <>
          {renderDeleteConfirmation(index)}
          {confirmDeleteIndex !== index && (
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
          )}
        </>
      ),
      width: "200px",
    },
  ];

  Popupscroll(AddState);

  return (
    <>
      {AddState && (
        <ContentDialog
          title={editingStateIndex !== null ? "Edit State" : "Add New State"}
          isOpen={AddState}
          onClose={() => {
            setAddState(false);
            setEditingStateIndex(null);
            formik.resetForm();
          }}
          contentHeight="250px"
          submitButtonLabel={editingStateIndex !== null ? "Save" : "Add"}
          isCancel={true}
          event={handleAddOrEditState}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addNewState"
            label={"State Name"}
            placeholder={"Enter State Name"}
            onChange={formik.handleChange}
            value={formik.values.addNewState}
          />
          <SelectInput
            label="Country"
            options={CountryOption}
            name="countryForAddNewState"
            value={formik.values.countryForAddNewState}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>State List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledMainSearchContainer className="main-container">
        <StyledDOM.StyledSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="State"
            placeholder="Search by State"
            name="stateSearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.stateSearch}
            onChange={formik.handleChange}
          />
          <Button
            label="Search"
            event={() => {
              console.log("State Search value:", formik.values.stateSearch);
            }}
          />
          <Button
            label="Cancel"
            isCancel={true}
            event={() => {
              formik.resetForm();
            }}
          />
        </StyledDOM.StyledSearchContainer>
        <StyledDOM.StyledAddingButtonContainer className="Adding-button-container">
          <StyledDOM.StyledAddingButton
            label="Add New State"
            iconSrc={AddIcon}
            event={() => setAddState(true)}
          />
        </StyledDOM.StyledAddingButtonContainer>
      </StyledDOM.StyledMainSearchContainer>

      <StyledDOM.StyledLightIconContainer className="image-container">
        <StyledDOM.StyledLightIcon alt="light" src={lightIcon} />
        <StyledDOM.StyledLightIconText>
          CONFIRM NON-EXISTENCE OF STATE BEFORE ADDING
        </StyledDOM.StyledLightIconText>
      </StyledDOM.StyledLightIconContainer>

      <Table
        data={stateList}
        columns={columns}
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

export default StateList;
