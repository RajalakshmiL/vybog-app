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

function CityList() {
  const { menuDatas = {} } = TableData || {};
  const { CityList = [] } = menuDatas || {};
  const { staticData = {} } = OptionData || {};
  const { country: CountryOption = [], states = [] } = staticData || {};

  const [cityList, setCityList] = useState(CityList);
  const [AddCity, setAddCity] = useState(false);
  const [editingCityIndex, setEditingCityIndex] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      citySearch: "",
      addNewCity: "",
      countryForAddNewCity: "",
      stateForAddNewCity: "",
    },
  });

  const handleSelect = (item, rowIndex) => {
    const selectedCity = cityList[rowIndex];

    switch (item) {
      case "Edit City":
        setAddCity(true);
        formik.setValues({
          addNewCity: selectedCity?.cityName,
          stateForAddNewCity: selectedCity?.stateName,
          countryForAddNewCity: selectedCity?.country,
        });
        setEditingCityIndex(rowIndex);
        break;

      case "Delete City":
        setConfirmDeleteIndex(rowIndex);
        break;

      default:
        break;
    }
  };

  const handleDeleteCity = (rowIndex) => {
    const updatedCityList = cityList.filter((_, index) => index !== rowIndex);
    setCityList(updatedCityList);
    setConfirmDeleteIndex(null);
  };

  const handleAddOrEditCity = () => {
    const { addNewCity, stateForAddNewCity, countryForAddNewCity } =
      formik.values;

    if (addNewCity && stateForAddNewCity && countryForAddNewCity) {
      const newCity = {
        cityName: addNewCity,
        stateName: stateForAddNewCity,
        country: countryForAddNewCity,
      };

      if (editingCityIndex !== null) {
        const updatedCityList = [...cityList];
        updatedCityList[editingCityIndex] = newCity;
        setCityList(updatedCityList);
        setEditingCityIndex(null);
      } else {
        setCityList([...cityList, newCity]);
      }

      setAddCity(false);
      formik.resetForm();
    }
  };

  const options = [
    {
      name: "Edit City",
    },
    {
      name: "Delete City",
    },
  ];

  const renderDeleteConfirmation = (rowIndex) => {
    if (rowIndex === confirmDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this City?
          </DeleteStyledDOM.StyledDeleteSpan>
          <DeleteStyledDOM.StyledDeleteButtonContainer className="delete-button-container">
            <DeleteStyledDOM.StyledYesButton
              label="Yes"
              event={() => handleDeleteCity(rowIndex)}
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

  Popupscroll(AddCity);

  return (
    <>
      {AddCity && (
        <ContentDialog
          title={editingCityIndex !== null ? "Edit City" : "Add New City"}
          isOpen={AddCity}
          onClose={() => {
            setAddCity(false);
            setEditingCityIndex(null);
            formik.resetForm();
          }}
          contentHeight="300px"
          submitButtonLabel={editingCityIndex !== null ? "Save" : "Add"}
          isCancel={true}
          event={handleAddOrEditCity}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addNewCity"
            label={"City Name"}
            placeholder={"Enter City Name"}
            onChange={formik.handleChange}
            value={formik.values.addNewCity}
          />
          <SelectInput
            options={states}
            name="stateForAddNewCity"
            label={"State"}
            placeholder={"State"}
            onChange={formik.handleChange}
            value={formik.values.stateForAddNewCity}
            wrapperStyle={{ marginBottom: "25px" }}
          />
          <SelectInput
            label="Country"
            options={CountryOption}
            name="countryForAddNewCity"
            value={formik.values.countryForAddNewCity}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>City List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledMainSearchContainer className="main-container">
        <StyledDOM.StyledSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="City"
            placeholder="Search by City"
            name="citySearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.citySearch}
            onChange={formik.handleChange}
          />
          <Button
            label="Search"
            event={() => {
              console.log("City Search value:", formik.values.citySearch);
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
            label="Add New City"
            iconSrc={AddIcon}
            event={() => setAddCity(true)}
          />
        </StyledDOM.StyledAddingButtonContainer>
      </StyledDOM.StyledMainSearchContainer>

      <StyledDOM.StyledLightIconContainer className="image-container">
        <StyledDOM.StyledLightIcon alt="light" src={lightIcon} />
        <StyledDOM.StyledLightIconText>
          CONFIRM NON-EXISTENCE OF CITY BEFORE ADDING
        </StyledDOM.StyledLightIconText>
      </StyledDOM.StyledLightIconContainer>

      <Table
        data={cityList}
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

export default CityList;
