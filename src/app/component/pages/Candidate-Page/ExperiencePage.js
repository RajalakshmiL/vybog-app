import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as StyledDOM from "./ExperiencePage.jsx";
import Button from "../../../common/Button/Button.js";
import Table from "../../../common/Table/Table.js";
import experienceDetailsImg from "../../../../assets/image/Experience details.svg";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox.js";
import AddIcon from "../../../../assets/image/AddIcon.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/image/Close-icon.svg";
import MenuSelector from "../../../common/PageSelector/Menuselector.js";
import CustomTooltip from "../../../common/Tooltip/Tooltip.js";
import {
  Popupscroll,
  useDateValidation,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
  sortByProperty,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { DynamicContext } from "../../../context/DynamicContext.js";
function ExperiencePage(props) {
  const {
    setActiveTab,
    activeTab,
    candidateDetails,
    setCandidateDetails,
    dialogOpen,
    setDialogOpen,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage,
  } = useContext(DynamicContext);
  const { setFillingPercentages } = props || {};
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const validationSchema = Yup.object().shape({
    occupation: Yup.string()
      .required("Occupation / title is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for Occupation."),
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
    company: Yup.string()
      .required("Company name is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for Company. "),
    summary: Yup.string().required("Summary is required."),
  });

  const formik = useFormik({
    initialValues: {
      occupation: "",
      startDate: "",
      endDate: "",
      company: "",
      summary: "",
      currentWork: false,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useDateValidation(formik, "startDate", "endDate");

  // function handleSubmit(values) {
  //   handleCloseMenuSelector();
  //   console.log("experience page values onsubmit", values);
  //   if (editIndex !== null) {
  //     const updatedCertificates = [...experienceDetails];
  //     updatedCertificates[editIndex] = values;
  //     setExperienceDetails(updatedCertificates);
  //     setEditIndex(null);
  //   } else {
  //     const newExperience = {
  //       occupation: formik.values.occupation,
  //       startDate: formik.values.startDate,
  //       endDate: formik.values.endDate,
  //       company: formik.values.company,
  //       summary: formik.values.summary,
  //       currentWork: formik.values.currentWork,
  //     };
  //     setExperienceDetails([...experienceDetails, newExperience]);
  //     const percentage = calculateFillingPercentage();
  //     setFillingPercentages((prev) => ({
  //       ...prev,
  //       experience: percentage,
  //     }));
  //   }

  //   setDialogOpen(false);
  //   formik.resetForm();
  // }
  function handleSubmit(values) {
    // handleCloseMenuSelector();
    const trimmedValues = handleCustomTrim(values);
    console.log("experience page values onsubmit", trimmedValues);
    if (editIndex !== null) {
      const updatedCertificates = [...experienceDetails];
      updatedCertificates[editIndex] = trimmedValues;
      setExperienceDetails(updatedCertificates);
      setEditIndex(null);
    } else {
      const newExperience = {
        occupation: trimmedValues.occupation,
        startDate: trimmedValues.startDate,
        endDate: trimmedValues.endDate,
        company: trimmedValues.company,
        summary: trimmedValues.summary,
        currentWork: trimmedValues.currentWork,
      };
      setExperienceDetails([...experienceDetails, newExperience]);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        experience: percentage,
      }));
    }

    setDialogOpen(false);
    formik.resetForm();
  }

  const calculateFillingPercentage = () => {
    const filledFields = Object.values(formik.values).filter(Boolean).length;
    const totalFields = Object.keys(formik.values).length;
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };
  const handleEditexperienceDetails = (index) => {
    setEditIndex(index);
    setDialogOpen(true);
    const selectedExperience = experienceDetails[index];
    formik.setValues({
      ...formik.values,
      occupation: selectedExperience.occupation || formik.values.occupation,
      startDate: selectedExperience.startDate || formik.values.startDate,
      endDate: selectedExperience.endDate || formik.values.endDate,
      company: selectedExperience.company || formik.values.company,
      summary: selectedExperience.summary || formik.values.summary,
      currentWork: selectedExperience.currentWork || formik.values.currentWork,
    });
  };
  const deleteExperience = (index) => {
    setSelectedRow(index);
    setIsDeleteConfirmationOpen(true);
  };
  const confirmDelete = (index, confirmation) => {
    // handleCloseMenuSelector();
    if (confirmation === "yes") {
      const updatedExperiences = [...experienceDetails];
      updatedExperiences.splice(index, 1);
      setExperienceDetails(updatedExperiences);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        experience: percentage,
      }));
    }
    setSelectedRow(null);
    setIsDeleteConfirmationOpen(false);
  };
  const handleSelect = (item, index) => {
    switch (item) {
      case "Edit experience":
        handleEditexperienceDetails(index);
        break;
      case "Delete experience":
        deleteExperience(index);
        break;
      default:
        break;
    }
  };
  const handleNext = () => {
    let data = candidateDetails;
    let details = experienceDetails;
    if (data) {
      data = [...data, details];
    } else {
      data.push([details]);
    }
    setCandidateDetails(data);
    console.log("Experience page output", data);
    setActiveTab(activeTab + 1);
  };
  const options = [
    {
      name: "Edit experience",
      icon: "",
    },
    {
      name: "Delete experience",
      icon: "",
    },
  ];
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
    },
    {
      name: "Occupation",
      selector: (row) => (
        <CustomTooltip title={row.occupation} arrow>
          <span>{row.occupation}</span>
        </CustomTooltip>
      ),
      sortable: true,
      sortFunction: sortByProperty("occupation"),
    },
    {
      name: "Start Date",
      selector: (row) => (
        <CustomTooltip title={row.startDate} arrow>
          <span>{row.startDate}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "End Date",
      selector: (row) => (
        <CustomTooltip title={row.endDate} arrow>
          <span>{row.endDate}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "Company",
      selector: (row) => (
        <CustomTooltip title={row.company} arrow>
          <span>{row.company}</span>
        </CustomTooltip>
      ),
      sortable: true,
      sortFunction: sortByProperty("company"),
    },
    {
      name: "Summary",
      selector: (row) => (
        <CustomTooltip title={row.summary} arrow>
          <span>{row.summary.substring(0, 25)}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "Currently Working Here",
      selector: (row) => (row.currentWork ? "Yes" : "No"),
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
        <StyledDOM.StyledSubhead>Work Experience</StyledDOM.StyledSubhead>
        <StyledDOM.StyledButtonTop
          label="Add Experience"
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
            <StyledDOM.StyledHeader className="experience-main-container">
              <StyledDOM.StyledHeading>Add Experience</StyledDOM.StyledHeading>
              <StyledDOM.StyledPopupCancelIcon onClick={handleCancel}>
                <CancelIcon />
              </StyledDOM.StyledPopupCancelIcon>
            </StyledDOM.StyledHeader>
            <form onSubmit={formik.handleSubmit}>
              <StyledDOM.StyledInputContainer style={{ marginBottom: "0px" }}>
                <StyledDOM.StyledTextinput
                  type="text"
                  containerClassName="experience-textinput"
                  label="Occupation / Title"
                  placeholder="Occupation / Title"
                  name="occupation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.occupation}
                  errorMessage={
                    formik.touched.occupation && formik.errors.occupation
                  }
                  error={formik.touched.occupation && formik.errors.occupation}
                />

                <StyledDOM.StyledTextinput
                  type="text"
                  label="Company Name"
                  placeholder="Company Name"
                  containerClassName="experience-textinput"
                  name="company"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company}
                  errorMessage={formik.touched.company && formik.errors.company}
                  error={formik.touched.company && formik.errors.company}
                />
              </StyledDOM.StyledInputContainer>
              {/* <StyledDOM.StyledInputContainer style={{ marginBottom: "0px" }}>
                <StyledDOM.StyledDatePicker
                  type="month-year"
                  placeholder="From Date"
                  label={"From Date"}
                  form={formik}
                  field={{
                    value: formik.values.startDate,
                    name: "startDate",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                  }}
                  errorMessage={
                    formik.touched.startDate && formik.errors.startDate
                  }
                  error={formik.touched.startDate && formik.errors.startDate}
                />
                <StyledDOM.StyledDatePicker
                  type="month-year"
                  placeholder="To Date"
                  label={"To Date"}
                  form={formik}
                  field={{
                    value: formik.values.endDate,
                    name: "endDate",
                    onChange: formik.handleChange,
                    onBlur: formik.handleBlur,
                  }}
                  errorMessage={formik.touched.endDate && formik.errors.endDate}
                  error={formik.touched.endDate && formik.errors.endDate}
                  startDate={formik.values.startDate}
                />
              </StyledDOM.StyledInputContainer> */}

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
                    formik.setFieldValue("startDate", e.target.value.startDate);
                    formik.setFieldTouched("startDate", false);
                    formik.setFieldValue("endDate", e.target.value.endDate);
                  },
                  onBlur: {
                    startDate: () => formik.setFieldTouched("startDate", true),
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

              <StyledDOM.StyledTextArea
                placeholder="Summary"
                containerClassName="summary-container"
                name="summary"
                label="Summary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.summary}
                errorMessage={formik.errors.summary}
                error={formik.touched.summary && formik.errors.summary}
              />
              <DynamicCheckbox
                label="Currently Working Here"
                id={`currentWork`}
                containerStyle={{
                  paddingTop: "12px",
                  fontSize: "14px",
                  fontWeight: "400",
                  marginLeft: "-12px",
                }}
                checked={formik.values.currentWork}
                onChange={() =>
                  formik.setFieldValue(
                    `currentWork`,
                    !formik.values.currentWork
                  )
                }
                name="currently working here"
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
      {experienceDetails.length > 0 ? (
        <div style={{ margin: "100px 0px", width: "100%" }}>
          <Table
            columns={columns}
            data={experienceDetails}
            fixedHeader={true}
            fixedHeaderScrollHeight="400px"
            highlightOnHover={true}
            selectableRows
            pagination={experienceDetails.length > 5 ? true : false}
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
          src={experienceDetailsImg}
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

export default ExperiencePage;
