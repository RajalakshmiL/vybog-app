import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as StyledDOM from "./SpecificationPage.jsx";
import Button from "../../../common/Button/Button.js";
import Table from "../../../common/Table/Table.js";
import certificateDetailsImg from "../../../../assets/image/certificate-detalis.svg";
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

function SpecificationPage(props) {
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
  const [certificateDetails, setCertificateDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const validationSchema = Yup.object().shape({
    certificateName: Yup.string()
      .required("Certificate name is required.")
      .matches(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed for Certificate Name"
      ),
    certificateStartDate: Yup.string().required("From date is required."),
    certificateEndDate: Yup.string()
      .required("To date is required.")
      .test(
        "not-same",
        "End date cannot be the same as start date",
        function (value) {
          return value !== this.parent.certificateStartDate;
        }
      ),
    certificateCode: Yup.string().required("Certificate code is required."),
  });

  const formik = useFormik({
    initialValues: {
      certificateName: "",
      certificateStartDate: "",
      certificateEndDate: "",
      certificateCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useDateValidation(formik, "certificateStartDate", "certificateEndDate");

  const calculateFillingPercentage = () => {
    const filledFields = Object.values(formik.values).filter(Boolean).length;
    const totalFields = Object.keys(formik.values).length;
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };
  function handleSubmit(values) {

    const trimmedValues = handleCustomTrim(values);

    // handleCloseMenuSelector();
    console.log("Specialization page:", trimmedValues);

    if (editIndex !== null) {
      const updatedCertificates = [...certificateDetails];
      updatedCertificates[editIndex] = trimmedValues;
      setCertificateDetails(updatedCertificates);
      setEditIndex(null);
    } else {
      const certificate = {
        certificateName: trimmedValues.certificateName,
        certificateStartDate: trimmedValues.certificateStartDate,
        certificateEndDate: trimmedValues.certificateEndDate,
        certificateCode: trimmedValues.certificateCode,
      };
      setCertificateDetails([...certificateDetails, certificate]);

      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        specification: percentage,
      }));
    }

    setDialogOpen(false);
    formik.resetForm();
  }

  const handleCancel = () => {
    // handleCloseMenuSelector();
    setDialogOpen(false);
    formik.resetForm();
    setEditIndex(null);
    setIsDeleteConfirmationOpen(false);
  };

  const deleteCertificate = (index) => {
    setSelectedRow(index);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = (index, confirmation) => {
    // handleCloseMenuSelector();
    if (confirmation === "yes") {
      const updatedCertificates = [...certificateDetails];
      updatedCertificates.splice(index, 1);
      setCertificateDetails(updatedCertificates);
      const percentage = calculateFillingPercentage();
      setFillingPercentages((prev) => ({
        ...prev,
        specification: percentage,
      }));
    }
    setSelectedRow(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleEditCertificate = (index) => {
    setEditIndex(index);
    setDialogOpen(true);
    const selectedCertificate = certificateDetails[index];
    formik.setValues({
      certificateName: selectedCertificate.certificateName,
      certificateStartDate: selectedCertificate.certificateStartDate,
      certificateEndDate: selectedCertificate.certificateEndDate,
      certificateCode: selectedCertificate.certificateCode,
    });
  };

  const handleNext = () => {
    let data = candidateDetails;
    let details = certificateDetails;
    if (data) {
      data = [...data, details];
    } else {
      data.push([details]);
    }
    setCandidateDetails(data);
    console.log("specification page output", data);
    setActiveTab(activeTab + 1);
  };

  const options = [
    {
      name: "Edit certificate",
      icon: "",
    },
    {
      name: "Delete certificate",
      icon: "",
    },
  ];

  const handleSelect = (item, index) => {
    switch (item) {
      case "Edit certificate":
        handleEditCertificate(index);
        break;
      case "Delete certificate":
        deleteCertificate(index);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
    },
    {
      name: "Certificate Name",
      selector: (row) => (
        <CustomTooltip title={row.certificateName} arrow>
          <span>{row.certificateName}</span>
        </CustomTooltip>
      ),
      sortable: true,
      sortFunction: sortByProperty("certificateName"),
    },
    {
      name: "Start Date",
      selector: (row) => (
        <CustomTooltip title={row.certificateStartDate} arrow>
          <span>{row.certificateStartDate}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "End Date",
      selector: (row) => (
        <CustomTooltip title={row.certificateEndDate} arrow>
          <span>{row.certificateEndDate}</span>
        </CustomTooltip>
      ),
    },
    {
      name: "Certificate Code",
      selector: (row) => (
        <CustomTooltip title={row.certificateCode} arrow>
          <span>{row.certificateCode}</span>
        </CustomTooltip>
      ),
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

  Popupscroll(dialogOpen);

  return (
    <>
      <StyledDOM.StyledOuterHeadingCont>
        <StyledDOM.StyledSubhead>Certifications</StyledDOM.StyledSubhead>
        <StyledDOM.StyledButton
          label="Add Certificate"
          event={() => {
            setEditIndex(null);
            setDialogOpen(true);
          }}
          icon={<StyledDOM.StyledAddButtonImage src={AddIcon} alt="addicon" />}
        />
      </StyledDOM.StyledOuterHeadingCont>

      {dialogOpen && (
        <StyledDOM.StyledPopupMainContainer>
          <StyledDOM.StyledPopupInnerContainer>
            <StyledDOM.StyledHeader>
              <StyledDOM.StyledHeading>Add Certificate</StyledDOM.StyledHeading>
              <StyledDOM.StyledPopupCancelIcon onClick={handleCancel}>
                <CancelIcon />
              </StyledDOM.StyledPopupCancelIcon>
            </StyledDOM.StyledHeader>
            <form onSubmit={formik.handleSubmit}>
              <StyledDOM.StyledInputContainer className="certification-container">
                <StyledDOM.StyledTextInput
                  className="certificate-name"
                  type="text"
                  label="Certificate Name"
                  placeholder="Certificate Name"
                  name="certificateName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.certificateName}
                  errorMessage={
                    formik.touched.certificateName &&
                    formik.errors.certificateName
                  }
                  error={
                    formik.touched.certificateName &&
                    formik.errors.certificateName
                  }
                  containerStyle={{ marginBottom: "30px" }}
                />

                <StyledDOM.StyledTextInput
                  type="text"
                  label="Certificate Code"
                  placeholder="Certificate Code"
                  name="certificateCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.certificateCode}
                  errorMessage={
                    formik.touched.certificateCode &&
                    formik.errors.certificateCode
                  }
                  error={
                    formik.touched.certificateCode &&
                    formik.errors.certificateCode
                  }
                />
              </StyledDOM.StyledInputContainer>

              <StyledDOM.StyledInputContainer className="datepicker-input">
                <StyledDOM.StyledDatePicker
                  className="custom-datepickerdiv"
                  dateFormat="MM/yyyy"
                  dropdownMode="select"
                  divStyle={{ display: "flex", width: "100%", gap: "10px" }}
                  startPlaceholder="From Date"
                  endPlaceholder="To Date"
                  startLabel={"From Date"}
                  endLabel={"To Date"}
                  form={formik}
                  field={{
                    value: {
                      startDate: formik.values.certificateStartDate,
                      endDate: formik.values.certificateEndDate,
                    },
                    name: "certificateDateRange",
                    onChange: (e) => {
                      formik.setFieldValue(
                        "certificateStartDate",
                        e.target.value.startDate
                      );
                      formik.setFieldTouched("certificateStartDate", false);
                      formik.setFieldValue(
                        "certificateEndDate",
                        e.target.value.endDate
                      );
                    },
                    onBlur: {
                      startDate: () =>
                        formik.setFieldTouched("certificateStartDate", true),
                      endDate: () =>
                        formik.setFieldTouched("certificateEndDate", true),
                    },
                  }}
                  rangePicker={true}
                  startErrorMessage={
                    formik.touched.certificateStartDate &&
                    formik.errors.certificateStartDate
                  }
                  endErrorMessage={
                    formik.touched.certificateEndDate &&
                    formik.errors.certificateEndDate
                  }
                />
              </StyledDOM.StyledInputContainer>

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
      {certificateDetails.length > 0 ? (
        <div style={{ margin: "100px 0px", width: "100%" }}>
          <Table
            columns={columns}
            data={certificateDetails}
            fixedHeader={true}
            fixedHeaderScrollHeight="400px"
            highlightOnHover={true}
            selectableRows
            pagination={certificateDetails.length > 5 ? true : false}
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[5, 10]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
          />
        </div>
      ) : (
        <StyledDOM.StyledCertficateImage
          style={{ margin: "100px 0px" }}
          alt="certificateDetails"
          src={certificateDetailsImg}
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

export default SpecificationPage;
