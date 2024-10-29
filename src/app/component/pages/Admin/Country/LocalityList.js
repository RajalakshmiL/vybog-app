import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import TableData from "../../../../../assets/json/Menu.json";
import * as StyledDOM from "../Menus/MenuStyle";
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

function LocalityList() {
  const { menuDatas = {} } = TableData || {};
  const { LocalityList = [] } = menuDatas || {};
  const { staticData = {} } = OptionData || {};
  const { country: CountryOption = [], states = [] } = staticData || {};

  const [localityList, setLocalityList] = useState(LocalityList);
  const [AddLocality, setAddLocality] = useState(false);
  const [editingLocalityIndex, setEditingLocalityIndex] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      localitySearch: "",
      addNewLocality: "",
      cityForAddNewLocality: "",
      countryForAddNewLocality: "",
      stateForAddNewLocality: "",
    },
  });

  const handleSelect = (item, rowIndex) => {
    const selectedLocality = localityList[rowIndex];

    switch (item) {
      case "Edit Locality":
        setAddLocality(true);
        formik.setValues({
          addNewLocality: selectedLocality?.LocalityName,
          cityForAddNewLocality: selectedLocality?.cityName,
          stateForAddNewLocality: selectedLocality?.stateName,
          countryForAddNewLocality: selectedLocality?.country,
        });
        setEditingLocalityIndex(rowIndex);
        break;

      case "Delete Locality":
        setConfirmDeleteIndex(rowIndex);
        break;

      default:
        break;
    }
  };

  const handleDeleteLocality = (rowIndex) => {
    const updatedLocalityList = localityList.filter(
      (_, index) => index !== rowIndex
    );
    setLocalityList(updatedLocalityList);
    setConfirmDeleteIndex(null);
  };

  const handleAddOrEditLocality = () => {
    const {
      addNewLocality,
      cityForAddNewLocality,
      stateForAddNewLocality,
      countryForAddNewLocality,
    } = formik.values;

    if (
      addNewLocality &&
      cityForAddNewLocality &&
      stateForAddNewLocality &&
      countryForAddNewLocality
    ) {
      const newLocality = {
        LocalityName: addNewLocality,
        cityName: cityForAddNewLocality,
        stateName: stateForAddNewLocality,
        country: countryForAddNewLocality,
      };

      if (editingLocalityIndex !== null) {
        const updatedLocalityList = [...localityList];
        updatedLocalityList[editingLocalityIndex] = newLocality;
        setLocalityList(updatedLocalityList);
        setEditingLocalityIndex(null);
      } else {
        setLocalityList([...localityList, newLocality]);
      }

      setAddLocality(false);
      formik.resetForm();
    }
  };

  const options = [
    {
      name: "Edit Locality",
    },
    {
      name: "Delete Locality",
    },
  ];

  const renderDeleteConfirmation = (rowIndex) => {
    if (rowIndex === confirmDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this Locality?
          </DeleteStyledDOM.StyledDeleteSpan>
          <DeleteStyledDOM.StyledDeleteButtonContainer className="delete-button-container">
            <DeleteStyledDOM.StyledYesButton
              label="Yes"
              event={() => handleDeleteLocality(rowIndex)}
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
      name: "Locality Name",
      selector: (row) => <span>{row?.LocalityName}</span>,
    },
    {
      name: "City Name",
      selector: (row) => <span>{row?.cityName}</span>,
    },
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

  Popupscroll(AddLocality);

  return (
    <>
      {AddLocality && (
        <ContentDialog
          title={
            editingLocalityIndex !== null ? "Edit Locality" : "Add New Locality"
          }
          isOpen={AddLocality}
          onClose={() => {
            setAddLocality(false);
            setEditingLocalityIndex(null);
            formik.resetForm();
          }}
          contentHeight="350px"
          submitButtonLabel={editingLocalityIndex !== null ? "Save" : "Add"}
          isCancel={true}
          event={handleAddOrEditLocality}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addNewLocality"
            label={"Locality Name"}
            placeholder={"Enter Locality Name"}
            onChange={formik.handleChange}
            value={formik.values.addNewLocality}
          />
          <StyledDOM.StyledTextInput
            type="text"
            name="cityForAddNewLocality"
            label={"City Name"}
            placeholder={"Enter City Name"}
            onChange={formik.handleChange}
            value={formik.values.cityForAddNewLocality}
          />
          <SelectInput
            options={states}
            name="stateForAddNewLocality"
            label={"State"}
            placeholder={"State"}
            onChange={formik.handleChange}
            value={formik.values.stateForAddNewLocality}
            wrapperStyle={{ marginBottom: "25px" }}
          />
          <SelectInput
            label="Country"
            options={CountryOption}
            name="countryForAddNewLocality"
            value={formik.values.countryForAddNewLocality}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>Locality List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledMainSearchContainer className="main-container">
        <StyledDOM.StyledSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="Locality"
            placeholder="Search by Locality"
            name="localitySearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.localitySearch}
            onChange={formik.handleChange}
          />
          <Button
            label="Search"
            event={() => {
              console.log(
                "Locality Search value:",
                formik.values.localitySearch
              );
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
            label="Add New Locality"
            iconSrc={AddIcon}
            event={() => setAddLocality(true)}
          />
        </StyledDOM.StyledAddingButtonContainer>
      </StyledDOM.StyledMainSearchContainer>

      <StyledDOM.StyledLightIconContainer className="image-container">
        <StyledDOM.StyledLightIcon alt="light" src={lightIcon} />
        <StyledDOM.StyledLightIconText>
          CONFIRM NON-EXISTENCE OF LOCALITY BEFORE ADDING
        </StyledDOM.StyledLightIconText>
      </StyledDOM.StyledLightIconContainer>

      <Table
        data={localityList}
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

export default LocalityList;
