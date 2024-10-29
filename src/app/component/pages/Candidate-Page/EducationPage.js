import React, { useState, useContext } from "react";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import * as Yup from "yup";
import { useFormik } from "formik";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import Button from "../../../common/Button/Button";
import * as StyledDOM from "../Candidate-Page/ExperiencePage.jsx";
import staticValues from "../../../../assets/json/staticData.json";
import educationDetailsImg from "../../../../assets/image/Education details.svg";
import Table from "../../../common/Table/Table.js";
import AddIcon from "../../../../assets/image/AddIcon.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/image/Close-icon.svg";
import MenuSelector from "../../../common/PageSelector/Menuselector.js";
import CustomTooltip from "../../../common/Tooltip/Tooltip.js";
import {
  Popupscroll,
  validateAutocomplete,
  useDateValidation,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
  sortByProperty,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions";
import { DynamicContext } from "../../../context/DynamicContext";
function EducationPage(props) {
  const {
    candidateDetails,
    setCandidateDetails,
    activeTab,
    setActiveTab,
    dialogOpen,
    setDialogOpen,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage,
  } = useContext(DynamicContext);
  const { setFillingPercentages } = props || {};
  const [educationDetails, setEducationDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const { staticData = {} } = staticValues;
  const { degree = [], major = [] } = staticData || [];

  const validationSchema = Yup.object().shape({
    institute: Yup.string()
      .required("Institute / school is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for Institute."),
    degree: Yup.mixed().test(
      "validdegree",
      "Degree is required.",
      validateAutocomplete
    ),
    major: Yup.mixed().test(
      "majordegree",
      "Major is required.",
      validateAutocomplete
    ),
    startDate: Yup.string().required("From date is required."),
    endDate: Yup.string()
      .required("To date is required.")
      .test(
        "not-same",
        "End date cannot be the same as start date.",
        function (value) {
          return value !== this.parent.startDate;
        }
      ),
  });

  const calculateFillingPercentage = () => {
    const filledFields = Object.values(formik.values).filter(Boolean).length;
    const totalFields = Object.keys(formik.values).length;
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };
  // const handleSubmit = (values) => {
  //   handleCloseMenuSelector();
  //   console.log("educationpage values", values);
  //   if (editIndex !== null) {
  //     const updatedEducation = [...educationDetails];
  //     updatedEducation[editIndex] = values;
  //     setEducationDetails(updatedEducation);
  //     setEditIndex(null);
  //   } else {
  //     const newExperience = {
  //       institute: formik.values.institute,
  //       degree: formik.values.degree,
  //       major: formik.values.major,
  //       startDate: formik.values.startDate,
  //       endDate: formik.values.endDate,
  //       currentlyPursuing: formik.values.currentlyPursuing,
  //     };
  //     setEducationDetails([...educationDetails, newExperience]);
  //     const percentage = calculateFillingPercentage();
  //     setFillingPercentages((prev) => ({
  //       ...prev,
  //       education: percentage,
  //     }));
  //   }

  //   setDialogOpen(false);
  //   formik.resetForm();
  // };
  const handleSubmit = (values) => {
    // handleCloseMenuSelector();
    const trimmedValues = handleCustomTrim(values); // Trim the values before processing
    console.log("educationpage values", trimmedValues);
    if (editIndex !== null) {
      const updatedEducation = [...educationDetails];
      updatedEducation[editIndex] = trimmedValues;
      setEducationDetails(updatedEducation);
      setEditIndex(null);
    } else {
      const newExperience = {
        institute: trimmedValues.institute,
        degree: trimmedValues.degree,
        major: trimmedValues.major,
        startDate: trimmedValues.startDate,
        endDate: trimmedValues.endDate,
        currentlyPursuing: trimmedValues.currentlyPursuing,
      };
      setEducationDetails([...educationDetails, newExperience]);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        education: percentage,
      }));
    }

    setDialogOpen(false);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      institute: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      currentlyPursuing: false,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useDateValidation(formik, "startDate", "endDate");
  const handleEditeducationDetails = (index) => {
    setEditIndex(index);
    setDialogOpen(true);
    const selectedEducation = educationDetails[index];
    formik.setValues({
      ...formik.values,
      institute: selectedEducation.institute || formik.values.institute,
      degree: selectedEducation.degree || formik.values.degree,
      major: selectedEducation.major || formik.values.major,
      startDate: selectedEducation.startDate || formik.values.startDate,
      endDate: selectedEducation.endDate || formik.values.endDate,
      currentlyPursuing:
        selectedEducation.currentlyPursuing || formik.values.currentlyPursuing,
    });
  };

  const handleSelect = (item, index) => {
    switch (item) {
      case "Edit education":
        handleEditeducationDetails(index);
        break;
      case "Delete education":
        deleteEducation(index);
        break;
      default:
        break;
    }
  };
  const deleteEducation = (index) => {
    setSelectedRow(index);
    setIsDeleteConfirmationOpen(true);
  };
  const confirmDelete = (index, confirmation) => {
    // handleCloseMenuSelector();
    if (confirmation === "yes") {
      const updatedExperiences = [...educationDetails];
      updatedExperiences.splice(index, 1);
      setEducationDetails(updatedExperiences);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        education: percentage,
      }));
    }
    setSelectedRow(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleNext = () => {
    let data = candidateDetails;
    let details = educationDetails;
    if (data) {
      data = [...data, details];
    } else {
      data.push([details]);
    }
    setCandidateDetails(data);
    console.log("education page output", data);
    setActiveTab(activeTab + 1);
  };
  const options = [
    {
      name: "Edit education",
      icon: "",
    },
    {
      name: "Delete education",
      icon: "",
    },
  ];
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
    },
    {
      name: "Institute",
      selector: (row) => (
        <CustomTooltip title={row.institute} arrow>
          <span>{row.institute}</span>
        </CustomTooltip>
      ),
      sortable: true,
      sortFunction: sortByProperty("institute"),
    },
    {
      name: "Degree",
      selector: (row) => (
        <CustomTooltip title={row.degree} arrow>
          <span>{row.degree}</span>
        </CustomTooltip>
      ),
      sortable: true,
      sortFunction: sortByProperty("degree"),
    },
    {
      name: "Major",
      selector: (row) => (
        <CustomTooltip title={row.major} arrow>
          <span>{row.major}</span>
        </CustomTooltip>
      ),
      sortable: true,
      sortFunction: sortByProperty("major"),
    },
    {
      name: "From Date",
      selector: (row) => (
        <CustomTooltip title={row.startDate} arrow>
          <span>{row.startDate}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "To Date",
      selector: (row) => (
        <CustomTooltip title={row.endDate} arrow>
          <span>{row.endDate}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "Currently Pursuing Here",
      selector: (row) => (row.currentlyPursuing ? "Yes" : "No"),
    },
    {
      name: "Action",
      cell: (row, index) => (
        <div className="delete-outer">
          {selectedRow === index ? (
            <StyledDOM.StyledDeleteContainer className="delete-container">
              <StyledDOM.StyledDeleteSpan>
                Do you want to delete this detail?
              </StyledDOM.StyledDeleteSpan>
              <StyledDOM.StyledDeleteButtonContainer className="delete-button-container">
                <StyledDOM.StyledYesButton
                  event={() => confirmDelete(index, "yes")}
                  label="Yes"
                />

                <StyledDOM.StyledNoButton
                  event={() => confirmDelete(index, "no")}
                  label="No"
                />
              </StyledDOM.StyledDeleteButtonContainer>
            </StyledDOM.StyledDeleteContainer>
          ) : (
            <MenuSelector
              options={options}
              onSelect={(item) => handleSelect(item, index)}
              onOpen={() => handleOpenMenuSelector(index)}
              onClose={handleCloseMenuSelector}
              rowIndex={index}
              disabled={isDeleteConfirmationOpen}
            />
          )}
        </div>
      ),
    },
  ];
  const handleCancel = () => {
    handleCloseMenuSelector();
    setDialogOpen(false);
    formik.resetForm();
    setEditIndex(null);
    setIsDeleteConfirmationOpen(false);
  };
  Popupscroll(dialogOpen);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };
  return (
    <>
      <StyledDOM.StyledOuterHeadingCont>
        <StyledDOM.StyledSubhead>Education</StyledDOM.StyledSubhead>
        <StyledDOM.StyledButtonTop
          label="Add Education"
          event={() => {
            setEditIndex(null);
            setDialogOpen(true);
          }}
          icon={<StyledDOM.StyledAddButtonImage src={AddIcon} alt="addicon" />}
        />
      </StyledDOM.StyledOuterHeadingCont>
      {dialogOpen && (
        <StyledDOM.StyledPopupMainContainer className="outer-div">
          <StyledDOM.StyledPopupInnerContainer className="overall-container">
            <StyledDOM.StyledHeader className="education-main-container">
              <StyledDOM.StyledHeading>Add education</StyledDOM.StyledHeading>
              <StyledDOM.StyledPopupCancelIcon onClick={handleCancel}>
                <CancelIcon />
              </StyledDOM.StyledPopupCancelIcon>
            </StyledDOM.StyledHeader>
            <form onSubmit={formik.handleSubmit}>
              <StyledDOM.StyledTextinput
                type="text"
                containerClassName="education-textinput"
                label="Institute / School"
                placeholder="Institute / School"
                name="institute"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.institute}
                errorMessage={
                  formik.touched.institute && formik.errors.institute
                }
                error={formik.touched.institute && formik.errors.institute}
              />
              <StyledDOM.StyledInputContainer className="degree-container">
                <CustomAutocomplete
                  // InputWrapperStyle={{ marginBottom: "5px" }}
                  listBoxStyle={{ width: "250px" }}
                  freeSolo={true}
                  // tags={true}
                  placeholder="Degree"
                  fieldLabel="Degree"
                  options={degree}
                  onChange={(newValue) => {
                    formik.setFieldValue(`degree`, newValue);
                    // console.log("onchanges", newValue);
                    if (newValue.length === 0) {
                      formik.setFieldTouched("degree", true);
                    }
                  }}
                  onBlur={() => formik.setFieldTouched("degree", true)}
                  showDownArrowIcon={true}
                  error={formik.touched.degree && formik.errors.degree}
                  errorMessage={formik.touched.degree && formik.errors.degree}
                  defaultValues={formik.values.degree}
                />
                <CustomAutocomplete
                  // InputWrapperStyle={{ marginBottom: "5px" }}
                  listBoxStyle={{ width: "250px" }}
                  freeSolo={true}
                  // tags={true}
                  placeholder="Major"
                  fieldLabel="Major"
                  options={major}
                  onChange={(newValue) => {
                    formik.setFieldValue(`major`, newValue);
                    // console.log("onchanges", newValue);
                    if (newValue.length === 0) {
                      formik.setFieldTouched("major", true);
                    }
                  }}
                  onBlur={() => formik.setFieldTouched("major", true)}
                  error={formik.touched.major && formik.errors.major}
                  errorMessage={formik.touched.major && formik.errors.major}
                  showDownArrowIcon={true}
                  defaultValues={formik.values.major}
                />
              </StyledDOM.StyledInputContainer>

              <StyledDOM.StyledInputContainer className="datepicker-input">
                <StyledDOM.StyledDatePicker
                  className="custom-datepickerdiv"
                  dateFormat="MM/yyyy"
                  divStyle={{ display: "flex", width: "100%", gap: "10px" }}
                  startPlaceholder="From Date"
                  endPlaceholder="To Date"
                  startLabel={"From Date"}
                  endLabel={"To Date"}
                  form={formik}
                  field={{
                    value: {
                      startDate: formik.values.startDate,
                      endDate: formik.values.endDate,
                    },
                    name: "certificateDateRange",
                    onChange: (e) => {
                      formik.setFieldValue(
                        "startDate",
                        e.target.value.startDate
                      );
                      formik.setFieldValue("endDate", e.target.value.endDate);
                      formik.setFieldTouched("startDate", false);
                    },
                    onBlur: {
                      startDate: () =>
                        formik.setFieldTouched("startDate", true),
                      endDate: () => formik.setFieldTouched("endDate", true),
                    },
                  }}
                  rangePicker={true}
                  startErrorMessage={
                    formik.touched.startDate && formik.errors.startDate
                  }
                  endErrorMessage={
                    formik.touched.endDate && formik.errors.endDate
                  }
                />
              </StyledDOM.StyledInputContainer>
              <DynamicCheckbox
                label="Currently Pursuing Here"
                name="Currently Pursuing"
                id={`currentWork`}
                containerStyle={{
                  paddingTop: "12px",
                  fontSize: "14px",
                  fontWeight: "400",
                  marginTop: "-43px",
                  marginLeft: "-12px",
                }}
                checked={formik.values.currentlyPursuing}
                onChange={() =>
                  formik.setFieldValue(
                    `currentlyPursuing`,
                    !formik.values.currentlyPursuing
                  )
                }
              />

              <StyledDOM.StyledDiv>
                <StyledDOM.StyledButtonDiv>
                  <Button label="Cancel" isCancel={true} event={handleCancel} />
                  <Button
                    label={editIndex !== null ? "Update" : "Add"}
                    event={formik.handleSubmit}
                    type="submit"
                  />
                </StyledDOM.StyledButtonDiv>
              </StyledDOM.StyledDiv>
            </form>
          </StyledDOM.StyledPopupInnerContainer>
        </StyledDOM.StyledPopupMainContainer>
      )}
      {educationDetails.length > 0 ? (
        <div style={{ margin: "100px 0px", width: "100%" }}>
          <Table
            columns={columns}
            data={educationDetails}
            fixedHeader={true}
            fixedHeaderScrollHeight="400px"
            highlightOnHover={true}
            selectableRows
            pagination={educationDetails.length > 5 ? true : false}
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[5, 10]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
          />
        </div>
      ) : (
        <StyledDOM.StyledCertficateImage
          style={{ margin: "100px 0px" }}
          alt="experienceDetails"
          src={educationDetailsImg}
        />
      )}
      <StyledDOM.StyledButtonContainer className="button-container">
        <Button
          label="Previous"
          isCancel={true}
          event={() => setActiveTab(activeTab - 1)}
        />
        <Button label="Next" event={handleNext} />
      </StyledDOM.StyledButtonContainer>
    </>
  );
}

export default EducationPage;
