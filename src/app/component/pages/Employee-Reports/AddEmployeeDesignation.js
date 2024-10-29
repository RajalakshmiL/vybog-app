import React, { useState, useEffect, useContext } from "react";
import employeeTabledata from "../../../../assets/json/Table.json";
import Table from "../../../common/Table/Table.js";
import CustomTooltip from "../../../common/Tooltip/Tooltip";
import Menuselector from "../../../common/PageSelector/Menuselector";
import ContentDialog from "../../../common/Modal-Popup/ContentDialog";
import {
  Popupscroll,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../common/CommonFunctions/CommonFunctions";
import * as EmployeeStyledDOM from "./EmployeePageStyle.jsx";
import * as DeleteStyledDOM from "../Candidate-Page/ExperiencePage.jsx";
import { useFormik } from "formik";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton";
import { DynamicContext } from "../../../context/DynamicContext";
function AddEmployeeDesignation() {
  const { staticdata = {} } = employeeTabledata || {};
  const [employeeDesignations, setEmployeeDesignations] = useState(
    staticdata.EmployeeDesignation || []
  );
  const {
    skeletonLoading,
    setSkeletonLoading,
  } = useContext(DynamicContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedDeleteIndex, setSelectedDeleteIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
  const [rowsPerEmployeePage, setRowsPerEmployeePage] = useState(5);

  const formik = useFormik({
    initialValues: {
      addDesignation: "",
    },
    onSubmit: (values) => {
      if (editingRow !== null) {
        const updatedDesignations = employeeDesignations.map((item) => {
          if (item.orderNO === editingRow.orderNO) {
            return { ...item, designation: values.addDesignation };
          }
          return item;
        });
        setEmployeeDesignations(updatedDesignations);
        setEditingRow(null);
      } else {
        const newDesignation = {
          orderNO: employeeDesignations.length + 1,
          designation: values.addDesignation,
        };
        setEmployeeDesignations([...employeeDesignations, newDesignation]);
      }
      formik.resetForm();
      setDialogOpen(false);
    },
  });

  const handleSelect = (item, rowIndex) => {
    const actualIndex =
      (currentEmployeePage - 1) * rowsPerEmployeePage + rowIndex;

    switch (item) {
      case "Edit Designation":
        const row = employeeDesignations[actualIndex];
        setEditingRow(row);
        formik.setFieldValue("addDesignation", row.designation);
        setDialogOpen(true);
        break;
      case "Delete Designation":
        setSelectedDeleteIndex(actualIndex);
        setShowDeleteConfirmation(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteConfirmation = (confirm) => {
    if (confirm && selectedDeleteIndex !== null) {
      const updatedDesignations = employeeDesignations.filter(
        (item, index) => index !== selectedDeleteIndex
      );
      setEmployeeDesignations(updatedDesignations);
    }
    // handleCloseMenuSelector();

    setShowDeleteConfirmation(false);
    setSelectedDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    const actualIndex =
      (currentEmployeePage - 1) * rowsPerEmployeePage + rowIndex;

    if (showDeleteConfirmation && actualIndex === selectedDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this Employee?
          </DeleteStyledDOM.StyledDeleteSpan>
          <DeleteStyledDOM.StyledDeleteButtonContainer className="delete-button-container">
            {" "}
            <DeleteStyledDOM.StyledYesButton
              label="Yes"
              event={() => handleDeleteConfirmation(true)}
            />
            <DeleteStyledDOM.StyledNoButton
              label="No"
              event={() => handleDeleteConfirmation(false)}
            />
          </DeleteStyledDOM.StyledDeleteButtonContainer>
        </DeleteStyledDOM.StyledDeleteContainer>
      );
    }
    return null;
  };

  const options = [
    {
      name: "Edit Designation",
      icon: <EmployeeStyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Delete Designation",
      icon: <EmployeeStyledDOM.StyledRightArrowIcon />,
    },
  ];

  const columns = [
    {
      id: "1",
      name: "#",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" dimensions={{ width: 15 }} />
        ) : (
          <CustomTooltip title={row?.orderNO} arrow>
            <span>{row?.orderNO}</span>
          </CustomTooltip>
        ),
    },
    {
      id: "2",
      name: "Designation",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.designation} arrow>
            <span>{row?.designation}</span>
          </CustomTooltip>
        ),
    },
    {
      selector: (row, index) =>
        skeletonLoading ? null : (
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

  const handleSubmit = () => {
    formik.handleSubmit();
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSkeletonLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  Popupscroll(dialogOpen);

  return (
    <>
      {dialogOpen && (
        <ContentDialog
          title={editingRow ? "Edit Designation" : "Add Designation"}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          contentHeight="200px"
          submitButtonLabel={editingRow ? "Update" : "Add"}
          isCancel={true}
          event={handleSubmit}
        >
          <div className="child-content">
            <EmployeeStyledDOM.StyledEmployeeTextInput
              label="Designation"
              placeholder="Designation"
              name="addDesignation"
              value={formik.values.addDesignation}
              onChange={formik.handleChange}
            />
          </div>
        </ContentDialog>
      )}
      <div>
        <EmployeeStyledDOM.StyledEmployeeHeading>
          Employee Designation
        </EmployeeStyledDOM.StyledEmployeeHeading>
        <EmployeeStyledDOM.StyledButtonContainer className="button-container">
          <EmployeeStyledDOM.StyledAddDesignationButton
            label={"Add Designation"}
            event={() => {
              formik.resetForm();
              setDialogOpen(true);
            }}
          />
        </EmployeeStyledDOM.StyledButtonContainer>
        <Table
          columns={columns}
          data={employeeDesignations}
          fixedHeader={true}
          fixedHeaderScrollHeight={"500px"}
          highlightOnHover
          pagination={true}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          onChangePage={(newPage) => {
            setCurrentEmployeePage(newPage);
            // handleCloseMenuSelector();
          }}
          onChangeRowsPerPage={(newRowsPerPage) =>
            setRowsPerEmployeePage(newRowsPerPage)
          }
        />
      </div>
    </>
  );
}

export default AddEmployeeDesignation;
