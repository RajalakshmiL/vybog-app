import React, { useEffect, useMemo, useState, useContext } from "react";
import Table from "../../../common/Table/Table";
import rowData from "../../../../assets/json/Table.json";
import { LinearIndeterminate } from "../../../common/LinearProgress/LinearProgress";
import PageSelector from "../../../common/PageSelector/PageSelector";
import * as StyledDOM from "../Candidate-Page/CandidatePage.jsx";
import * as DeleteStyledDOM from "../Candidate-Page/ExperiencePage.jsx";
import manageColumnIcon from "../../../../assets/image/manageColumnIcon.svg";
import addEmployeeIcon from "../../../../assets/image/add-new-employee-icon.svg";
import {
  GlobalSearch,
  Popupscroll,
} from "../../../common/CommonFunctions/CommonFunctions";
import SearchIcon from "../../../../assets/image/search-icon.svg";
import Menuselector from "../../../common/PageSelector/Menuselector.js";
import "../../../common/common.css";
import CustomTooltip from "../../../common/Tooltip/Tooltip";
import { useNavigate } from "react-router-dom";
import {
  dataTrimmer,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../common/CommonFunctions/CommonFunctions";
import ManageColumns from "../../../common/ManageColumns/ManageColumns";
import ModalPopup from "../../../common/Modal-Popup/ModalPopup";
import { DynamicContext } from "../../../context/DynamicContext";
import deleteAnimation from "../../../../assets/json/Delete-Animation.json";
import ContentDialog from "../../../common/Modal-Popup/ContentDialog";
import { useFormik } from "formik";
import Button from "../../../common/Button/Button";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton";
function EmployeeList() {
  const navigate = useNavigate();
  const {
    currentPage,
    searchKey,
    setSearchKey,
    // pending,
    // setPending,
    // selectedOption,
    setSelectedOption,
    skeletonLoading,
    setSkeletonLoading,
  } = useContext(DynamicContext);
  const formik = useFormik({
    initialValues: {
      changePassword: "",
    },
    onSubmit: (values) => {
      console.log("changePassword", values);
      setShowDialog(false);
    },
  });
  const { staticdata = {} } = rowData || [];
  const { EmployeeData = [] } = staticdata || {};
  const [selectedRows, setSelectedRows] = useState([]);

  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showManageColumns, setShowManageColumns] = useState(false);
  const [selectedDeleteIndex, setselectedDeleteIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [columns, setColumns] = useState([
    { id: "1", name: "Employee Code", visible: true },
    { id: "2", name: "Name", visible: true },
    { id: "3", name: "Email", visible: true },
    { id: "4", name: "DOJ", visible: true },
    { id: "5", name: "Contact No.", visible: true },
    { id: "6", name: "Designation", visible: true },
    { id: "7", name: "DOR", visible: true },
    { id: "8", name: "Status", visible: true },
  ]);

  const columnConfig = {
    1: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.EmployeeCode} arrow>
            <StyledDOM.StyledTableActiveSpan>
              {dataTrimmer(row?.EmployeeCode)}
            </StyledDOM.StyledTableActiveSpan>
          </CustomTooltip>
        ),
    },
    2: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.EmployeeName} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.EmployeeName)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    3: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.EmployeeEmail} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.EmployeeEmail)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    4: {
      selector: (row, rowIndex) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <span>{row?.DateofJoining}</span>
        ),
    },
    5: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.contact} arrow>
            <StyledDOM.StyledTableSpan>
              {row?.contact}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    6: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.Designation} arrow>
            <StyledDOM.StyledTableSpan>
              {row?.Designation}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    7: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledTableSpan>
            {dataTrimmer(row?.DateofRelese)}
          </StyledDOM.StyledTableSpan>
        ),
    },
    8: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledTableSpan>
            {dataTrimmer(row?.status)}
          </StyledDOM.StyledTableSpan>
        ),
    },
    9: {
      cell: (row, index) =>
        skeletonLoading ? null : (
          <div>
            {selectedDeleteIndex === index ? (
              renderDeleteConfirmation(index)
            ) : (
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
          </div>
        ),
      width: "200px",
    },
  };

  const handleSelect = (item, rowIndex) => {
    switch (item) {
      case "View Employee":
        break;
      case "Edit status":
        break;
      case "Lock Employee":
        break;
      case "Reset Password":
        setShowDialog(true);
        break;
      default:
        break;
    }
  };
  const handleDeleteConfirmation = (confirm) => {
    if (confirm && selectedDeleteIndex !== null) {
      const updatedRowData = [...rowData.staticdata.rowdata];
      updatedRowData.splice(selectedDeleteIndex, 1);
      rowData.staticdata.rowdata = updatedRowData;
    }
    setShowDeleteConfirmation(false);
    setselectedDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    if (showDeleteConfirmation && rowIndex === selectedDeleteIndex) {
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
      name: "View Employee",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Edit status",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Lock Employee",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Reset Password",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
  ];
  const pageMenuOptions = [
    {
      name: "Leave",
      // path: "/",

      children: [
        {
          name: "Leave History -Month wise",
          path: "/leave-history-monthly",
        },
        {
          name: "Leave History -Year wise",
          path: "/leave-history-yearly",
        },
      ],
    },
    {
      name: "Employee Designations",
      path: "/add-employee-designation",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
  ];
  const handleSaveColumns = (updatedColumns) => {
    setColumns(updatedColumns);
    setShowManageColumns(false);
  };
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleBulkDelete = () => {
    const updatedRowData = EmployeeData.filter(
      (row) => !selectedRows.includes(row)
    );
    rowData.staticdata.EmployeeData = updatedRowData;
    setSelectedRows([]);
    setToggleClearRows(!toggledClearRows);
    setShowPopup(false);
  };
  const renderColumns = columns
    .filter((col) => col.visible)
    .map((col) => ({
      ...col,
      ...columnConfig[col.id],
    }));
  const allColumns = [
    ...renderColumns,
    {
      ...columnConfig[9],
      id: "9",
      name: "Menu",
    },
  ];
  useEffect(() => {
    const timeout = setTimeout(() => {
      // setPending(false);
      setSkeletonLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = GlobalSearch(EmployeeData, searchKey);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * filteredData.length;
    const lastPageIndex = firstPageIndex + filteredData.length;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  Popupscroll(showDialog);
  return (
    <>
      {showDialog ? (
        <ContentDialog
          title={"Update Password"}
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          contentHeight="200px"
          submitButtonLabel={"Update"}
          isCancel={true}
          event={formik.handleSubmit}
        >
          {" "}
          <div className="child-content">
            <StyledDOM.StyledEmployeeTextInput
              label="Password"
              placeholder="Password"
              name="changePassword"
              value={formik.values.changePassword}
              onChange={formik.handleChange}
            />
          </div>
        </ContentDialog>
      ) : null}
      {showPopup ? (
        <ModalPopup
          isOpen={showPopup}
          showPlayer={true}
          onClose={() => setShowPopup(false)}
          playerSrc={deleteAnimation}
          onConfirm={handleBulkDelete}
          title="Delete Confirmation"
          message="Do you want to delete this Employee Permanently?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      ) : null}
      <div>
        <StyledDOM.StyledContentOuterDiv className="outer-div">
          <div style={{ position: "relative" }}>
            <StyledDOM.StyledGlobelSearch
              type="text"
              placeholder="Search by any keyword or specific attribute"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              icon={SearchIcon}
              backgroundColor="transparent"
            />
            <StyledDOM.StyledAdvancedSearchText>
              Advance Search
            </StyledDOM.StyledAdvancedSearchText>
          </div>

          <PageSelector
            dropdownHeading="Employee"
            options={pageMenuOptions}
            onOptionSelect={handleOptionSelect}
          />
        </StyledDOM.StyledContentOuterDiv>
        <StyledDOM.StyledCandidateContent className="candidate-span">
          <StyledDOM.StyledCandidateLeftSpan>
            <StyledDOM.StyledCandidateLeftSpanHeading>
              Employee
            </StyledDOM.StyledCandidateLeftSpanHeading>
            <StyledDOM.StyledCandidateSpan>{`${EmployeeData?.length} results`}</StyledDOM.StyledCandidateSpan>
          </StyledDOM.StyledCandidateLeftSpan>
          <StyledDOM.StyledCandidateRightSpan>
            {selectedRows.length > 0 && (
              <DeleteStyledDOM.StyledBulkDeleteButton
                label={"Bulk Delete"}
                event={() => setShowPopup(true)}
              />
            )}
            <StyledDOM.StyledButtonOuterDiv>
              <StyledDOM.StyledManageColumnIcon
                src={addEmployeeIcon}
                alt="addEmployeeIcon"
                onClick={() => navigate("/add-employee-details")}
              />
              <StyledDOM.StyledCandidateTableButton
                event={() => navigate("/add-employee-details")}
                label="Add New Employee"
              />
            </StyledDOM.StyledButtonOuterDiv>
            <StyledDOM.StyledButtonOuterDiv>
              <StyledDOM.StyledManageColumnIcon
                src={manageColumnIcon}
                alt="ManageColumnIcon"
                onClick={() => setShowManageColumns(true)}
              />
              <StyledDOM.StyledCandidateTableButton
                event={() => setShowManageColumns(true)}
                label="Manage Columns"
              />
              <Button label="Export As Excel" isExport={true} />
            </StyledDOM.StyledButtonOuterDiv>
          </StyledDOM.StyledCandidateRightSpan>
        </StyledDOM.StyledCandidateContent>

        <ManageColumns
          columns={columns}
          selectedColumns={columns}
          onSave={handleSaveColumns}
          open={showManageColumns}
          onClose={() => setShowManageColumns(false)}
        />
        <Table
          className="candidate-table"
          columns={allColumns}
          data={currentTableData}
          fixedHeader={true}
          fixedHeaderScrollHeight={"500px"}
          selectableRows={skeletonLoading ? false : true}
          highlightOnHover
          progressComponent={<LinearIndeterminate />}
          // progressPending={pending}
          pagination={true}
          paginationPerPage={20}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          onSelectedRowsChange={handleSelectedRowsChange}
          clearSelectedRows={toggledClearRows}
        />
        {/* {pending ? null : (
                <CustomPagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              )} */}
      </div>
    </>
  );
}

export default EmployeeList;
