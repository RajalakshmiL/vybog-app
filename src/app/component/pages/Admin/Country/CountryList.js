import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import TableData from "../../../../../assets/json/Menu.json";
import DynamicCheckBox from "../../../../common/CheckBox/CheckBox";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import Button from "../../../../common/Button/Button";
import { useFormik } from "formik";
import lightIcon from "../../../../../assets/image/light.svg";
import AddIcon from "../../../../../assets/image/GreenPlusIcon.svg";
import ModalPopup from "../../../../common/Modal-Popup/ModalPopup";
import ActiveAnimation from "../../../../../assets/json/active.json";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import SelectInput from "../../../../common/SelectInput/SelectInput";
import OptionData from "../../../../../assets/json/staticData.json";
import { Popupscroll } from "../../../../common/CommonFunctions/CommonFunctions";

function CountryList() {
  const { menuDatas = {} } = TableData || {};
  const { CountryList = [] } = menuDatas || [];
  const { staticData = {} } = OptionData || {};
  const {
    country: CountryOption = [],
    city = [],
    states = [],
  } = staticData || [];
  const [checkboxStates, setCheckboxStates] = useState(
    CountryList.map((country) => ({
      Active: country.Active,
    }))
  );
  const [country, setCountry] = useState(CountryList);
  const [showActivePopup, setShowActivePopup] = useState(false);
  const [AddState, setAddState] = useState(false);
  const [AddCity, setAddCity] = useState(false);
  const [AddLocality, setAddLocality] = useState(false);
  const [togglingCountryIndex, setTogglingCountryIndex] = useState(null);
  const [desiredActiveState, setDesiredActiveState] = useState(null);

  const formik = useFormik({
    initialValues: {
      countrySearch: "",
      addNewState: "",
      countryForAddNewState: "",
      addNewCity: "",
      countryForAddNewCity: "",
      stateForAddNewCity: "",
      addNewLocality: "",
      countryForAddNewLocality: "",
      stateForAddNewLocality: "",
      cityForAddNewLocality: "",
    },
  });
  const handleCheckboxChange = (index) => {
    const currentState = checkboxStates[index]?.Active;
    const newState = !currentState;
    setTogglingCountryIndex(index);
    setDesiredActiveState(newState);
    setShowActivePopup(true);
  };

  const handleConfirm = () => {
    if (togglingCountryIndex !== null && desiredActiveState !== null) {
      setCheckboxStates((prevState) =>
        prevState.map((item, idx) =>
          idx === togglingCountryIndex
            ? { ...item, Active: desiredActiveState }
            : item
        )
      );
      setCountry((prevCountry) =>
        prevCountry.map((roles, idx) =>
          idx === togglingCountryIndex
            ? { ...roles, Active: desiredActiveState }
            : roles
        )
      );
    }
    setShowActivePopup(false);
    setTogglingCountryIndex(null);
    setDesiredActiveState(null);
  };

  const handleCancel = () => {
    setShowActivePopup(false);
    setTogglingCountryIndex(null);
    setDesiredActiveState(null);
  };

  const handleAddStateClose = () => {
    if (
      formik.values.addNewState &&
      formik.values.countryForAddNewState !== ""
    ) {
      console.log(
        "Add State",
        formik.values.addNewState,
        "Selected Country",
        formik.values.countryForAddNewState
      );
      setAddState(false);
    }
  };

  const handleAddCityClose = () => {
    if (
      formik.values.addNewCity &&
      formik.values.countryForAddNewCity &&
      formik.values.stateForAddNewCity !== ""
    ) {
      console.log(
        "Add City",
        formik.values.addNewCity,
        "Selected Country",
        formik.values.countryForAddNewCity,
        "Selected State",
        formik.values.stateForAddNewCity
      );
      setAddCity(false);
    }
  };

  const handleAddLocalityClose = () => {
    if (
      formik.values.addNewLocality &&
      formik.values.countryForAddNewLocality &&
      formik.values.stateForAddNewLocality &&
      formik.values.cityForAddNewLocality !== ""
    ) {
      console.log(
        "Add Locality",
        formik.values.addNewLocality,
        "Selected Country",
        formik.values.countryForAddNewLocality,
        "Selected State",
        formik.values.stateForAddNewLocality,
        "Selected city",
        formik.values.cityForAddNewLocality
      );
      setAddLocality(false);
    }
  };
  const columns = [
    {
      name: "Country Name",
      selector: (row) => <span>{row?.countryName}</span>,
    },
    {
      name: "Country Code",
      selector: (row) => <span>{row?.countryCode}</span>,
    },
    {
      name: "Time Zone",
      selector: (row) => <span>{row?.timeZone}</span>,
    },
    {
      name: "Zone Name",
      selector: (row) => <span>{row?.zoneName}</span>,
    },
    {
      name: "Currency Code",
      selector: (row) => <span>{row?.currencyCode}</span>,
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
  Popupscroll(AddState || AddCity || AddLocality);
  return (
    <>
      {showActivePopup &&
        togglingCountryIndex !== null &&
        desiredActiveState !== null && (
          <ModalPopup
            isOpen={showActivePopup}
            showPlayer={true}
            onClose={handleCancel}
            playerSrc={ActiveAnimation}
            title={
              <>
                <StyledDOM.StyledActivatePopupHeader>
                  {country[togglingCountryIndex]?.countryName}
                </StyledDOM.StyledActivatePopupHeader>
              </>
            }
            message={
              desiredActiveState
                ? "Do you want to activate this Country?"
                : "Do you want to deactivate this Country?"
            }
            confirmLabel={desiredActiveState ? "Activate" : "Deactivate"}
            cancelLabel="Cancel"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            normalButton={desiredActiveState ? true : false}
          />
        )}
      {AddState && (
        <ContentDialog
          title={"Add New State"}
          isOpen={AddState}
          onClose={() => setAddState(false)}
          contentHeight="250px"
          submitButtonLabel={"Add"}
          isCancel={true}
          event={handleAddStateClose}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addNewState"
            label={"New State"}
            placeholder={"New State"}
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

      {AddCity && (
        <ContentDialog
          title={"Add New City"}
          isOpen={AddCity}
          onClose={() => setAddCity(false)}
          contentHeight="300px"
          submitButtonLabel={"Add"}
          isCancel={true}
          event={handleAddCityClose}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addNewCity"
            label={"New City"}
            placeholder={"New City"}
            onChange={formik.handleChange}
            value={formik.values.addNewCity}
          />
          <SelectInput
            label="Country"
            options={CountryOption}
            name="countryForAddNewCity"
            value={formik.values.countryForAddNewCity}
            onChange={formik.handleChange}
            wrapperStyle={{ marginBottom: "25px" }}
          />
          <SelectInput
            label="State"
            options={states}
            name="stateForAddNewCity"
            value={formik.values.stateForAddNewCity}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}

      {AddLocality && (
        <ContentDialog
          title={"Add New Locality"}
          isOpen={AddLocality}
          onClose={() => setAddLocality(false)}
          contentHeight="380px"
          submitButtonLabel={"Add"}
          isCancel={true}
          event={handleAddLocalityClose}
        >
          <StyledDOM.StyledTextInput
            type="text"
            name="addNewLocality"
            label={"New Locality"}
            placeholder={"New Locality"}
            onChange={formik.handleChange}
            value={formik.values.addNewLocality}
          />
          <SelectInput
            label="Country"
            options={CountryOption}
            name="countryForAddNewLocality"
            value={formik.values.countryForAddNewLocality}
            onChange={formik.handleChange}
            wrapperStyle={{ marginBottom: "25px" }}
          />
          <SelectInput
            label="State"
            options={states}
            name="stateForAddNewLocality"
            value={formik.values.stateForAddNewLocality}
            onChange={formik.handleChange}
            wrapperStyle={{ marginBottom: "25px" }}
          />
          <SelectInput
            label="City"
            options={city}
            name="cityForAddNewLocality"
            value={formik.values.cityForAddNewLocality}
            onChange={formik.handleChange}
          />
        </ContentDialog>
      )}
      <StyledDOM.StyledMenuHeading>Country List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledMainSearchContainer className="main-container">
        <StyledDOM.StyledSearchContainer className="search-container">
          <StyledDOM.StyledTextInput
            label="Country"
            placeholder="Search by Country"
            name="countrySearch"
            containerStyle={{ marginBottom: "0px" }}
            value={formik.values.countrySearch}
            onChange={formik.handleChange}
          />{" "}
          <Button
            label="Search"
            event={() => {
              console.log(
                "countrySearch search value",
                formik.values.countrySearch
              );
            }}
          />
          <Button label="Cancel" isCancel={true} event={formik.resetForm} />
        </StyledDOM.StyledSearchContainer>
        <StyledDOM.StyledAddingButtonCountryContainer className="Adding-button-container">
          <StyledDOM.StyledAddingButton
            label="Add State"
            iconSrc={AddIcon}
            event={() => setAddState(true)}
          />
          <StyledDOM.StyledAddingButton
            label="Add City"
            iconSrc={AddIcon}
            event={() => setAddCity(true)}
          />
          <StyledDOM.StyledAddingButton
            label="Add Locality"
            iconSrc={AddIcon}
            event={() => setAddLocality(true)}
          />
        </StyledDOM.StyledAddingButtonCountryContainer>
      </StyledDOM.StyledMainSearchContainer>
      <StyledDOM.StyledLightIconContainer className="image-container">
        <StyledDOM.StyledLightIcon alt="light" src={lightIcon} />
        <StyledDOM.StyledLightIconText>
          CONFIRM NON-EXISTENCE OF COUNTRY BEFORE ADDING
        </StyledDOM.StyledLightIconText>
      </StyledDOM.StyledLightIconContainer>
      <Table
        data={CountryList}
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

export default CountryList;
