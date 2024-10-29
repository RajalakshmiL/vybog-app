import React, { useState, useContext } from "react";
import Table from "../../../common/Table/Table";
import rowData from "../../../../assets/json/Table.json";
import { LinearIndeterminate } from "../../../common/LinearProgress/LinearProgress";
// import CustomPagination from "../../../common/Pagination/Pagination";
import PageSelector from "../../../common/PageSelector/PageSelector";
import * as StyledDOM from "../Candidate-Page/CandidatePage.jsx";
import * as DeleteStyledDOM from "../Candidate-Page/ExperiencePage.jsx";
import {
  GlobalSearch,
  sortByProperty,
  Popupscroll,
} from "../../../common/CommonFunctions/CommonFunctions";
import SearchIcon from "../../../../assets/image/search-icon.svg";
import JobsPopup from "./JobsPopup.js";
import FullScreenDialog from "../../../common/FullScreenDialog/FullScreenDialog.js";
import JobsDetails from "./JobsDetails.js";
import Menuselector from "../../../common/PageSelector/Menuselector.js";
import CustomTooltip from "../../../common/Tooltip/Tooltip";
import HorizontalTabs from "../../../common/HorizontalTabs/HorizontalTabs.js";
import { ReactComponent as ProfileInfo } from "../../../../assets/image/Info-icon.svg";
import { ReactComponent as ProfileActiveInfo } from "../../../../assets/image/Info-Active-icon.svg";
import { ReactComponent as TrackingActiveIcon } from "../../../../assets/image/Tracking-star-active-icon.svg";
import { ReactComponent as TrackingIcon } from "../../../../assets/image/Tracking-star-icon.svg";
import { ReactComponent as DocumentsActiveIcon } from "../../../../assets/image/Document-Active-icon.svg";
import { ReactComponent as DocumentsIcon } from "../../../../assets/image/Document-icon.svg";
import { ReactComponent as ProposalsIcon } from "../../../../assets/image/Proposalsicon.svg";
import { ReactComponent as ProposalsActiveIcon } from "../../../../assets/image/Proposal-Active-icon.svg";
import {
  dataTrimmer,
  skillDataTrimmer,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../common/CommonFunctions/CommonFunctions";
import Button from "../../../common/Button/Button";
import ManageColumns from "../../../common/ManageColumns/ManageColumns";
import manageColumnIcon from "../../../../assets/image/manageColumnIcon.svg";
import ModalPopup from "../../../common/Modal-Popup/ModalPopup";
import { DynamicContext } from "../../../context/DynamicContext";
import deleteAnimation from "../../../../assets/json/Delete-Animation.json";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton";
function JobsTableList() {
  const {
    currentPage,
    // setCurrentPage,
    // candidateDetails,
    // setCandidateDetails,
    activeTab,
    setActiveTab,
    searchKey,
    setSearchKey,
    // pending,
    // setPending,
    selectedOption,
    setSelectedOption,
    // moreOptions,
    // setMoreOptions,
    dialogOpen,
    setDialogOpen,
    documentsCount,
    setDocumentsCount,
    skeletonLoading,
    setSkeletonLoading,
  } = useContext(DynamicContext);

  const [showManageColumns, setShowManageColumns] = useState(false);
  const [selectedDeleteIndex, setselectedDeleteIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [columns, setColumns] = useState([
    { id: "1", name: "Job Code", visible: true },
    { id: "2", name: "Job Title", visible: true },
    { id: "3", name: "Skill", visible: true },
    { id: "4", name: "Role", visible: true },
    { id: "5", name: "Client", visible: true },
    { id: "6", name: "Location", visible: true },
    { id: "7", name: "Updated", visible: true },
  ]);
  const isClickable = "true";
  const handleSelect = (item, rowIndex) => {
    switch (item) {
      case "View job":
        setDialogOpen(true);
        break;
      case "Edit job":
        setDialogOpen(true);
        break;
      case "Delete job":
        setselectedDeleteIndex(rowIndex);
        setShowDeleteConfirmation(true);
        break;
      case "Deactivate":
        setDialogOpen(true);
        break;
      case "Search resume":
        setDialogOpen(true);
        break;
      default:
        break;
    }
  };
  const handleDeleteConfirmation = (confirm) => {
    if (confirm && selectedDeleteIndex !== null) {
      const updatedRowData = [...rowData.staticdata.jobsData];
      updatedRowData.splice(selectedDeleteIndex, 1);
      rowData.staticdata.jobsData = updatedRowData;
    }
    setShowDeleteConfirmation(false);
    setselectedDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    if (showDeleteConfirmation && rowIndex === selectedDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this job detail?
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
  const handleSaveColumns = (updatedColumns) => {
    setColumns(updatedColumns);
    setShowManageColumns(false);
  };
  const options = [
    {
      name: "View job",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Edit job",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Delete job",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Deactivate",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Search resume",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
  ];
  const { staticdata = {} } = rowData || [];
  const { jobsData = [] } = staticdata || {};

  const columnConfig = {
    1: {
      id: "1",
      name: "Job Code",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.jobCode} arrow>
            <StyledDOM.StyledTableActiveSpan
              onClick={() => setDialogOpen(true)}
              isClickable={isClickable}
            >
              {dataTrimmer(row?.jobCode)}
            </StyledDOM.StyledTableActiveSpan>
          </CustomTooltip>
        ),
      //   sortable: true,
    },
    2: {
      name: "Job Title",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.jobTitle} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.jobTitle)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
      sortable: true,
      sortFunction: sortByProperty("jobTitle"),
    },
    3: {
      name: "Skill",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.skill.join(", ")} arrow>
            <StyledDOM.StyledTableSpan>
              {skillDataTrimmer(row?.skill)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    4: {
      name: "Role",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.role} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.role)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    5: {
      name: "Client",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.client} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.client)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
    },
    6: {
      name: "Location",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.location} arrow>
            <span>{dataTrimmer(row?.location)}</span>
          </CustomTooltip>
        ),
    },
    7: {
      name: "Updated",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.updated} arrow>
            <span>{row?.updated}</span>
          </CustomTooltip>
        ),
    },
    8: {
      cell: (row, index) =>
        skeletonLoading ? null : (
          <>
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
          </>
        ),
      width: "200px",
    },
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
      ...columnConfig[8],
      id: "8",
      name: "Menu",
    },
  ];
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // setPending(false);
      setSkeletonLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredData = GlobalSearch(jobsData, searchKey);
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * filteredData.length;
    const lastPageIndex = firstPageIndex + filteredData.length;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const tabNames = [
    {
      name: "Info",
      icon: activeTab === 0 ? ProfileActiveInfo : ProfileInfo,
      number: null,
    },
    {
      name: "Tracking",
      icon: activeTab === 1 ? TrackingActiveIcon : TrackingIcon,
      number: null,
    },
    {
      name: "Documents",
      icon: activeTab === 2 ? DocumentsActiveIcon : DocumentsIcon,
      number:
        documentsCount > 0 ? (
          <span
            style={{
              borderRadius: "50%",
              padding: "1px 5px",
              color: "rgb(234, 239, 243)",
              border: "2px solid rgb(255 255 255)",
              fontSize: "12px",
            }}
          >
            {documentsCount}
          </span>
        ) : null,
    },
    {
      name: "Proposals",
      icon: activeTab === 3 ? ProposalsActiveIcon : ProposalsIcon,
      number: null,
    },
  ];
  const handleTabChange = (index) => {
    setActiveTab(index);
    setDocumentsCount(0);
  };
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleBulkDelete = () => {
    const updatedRowData = jobsData.filter(
      (row) => !selectedRows.includes(row)
    );
    rowData.staticdata.jobsData = updatedRowData;
    setSelectedRows([]);
    setToggleClearRows(!toggledClearRows);
    setShowPopup(false);
  };

  const pageMenuOptions = [
    {
      name: "Create Job",
    },
    {
      name: "Import Job",
    },
  ];
  Popupscroll(showPopup);
  return (
    <>
      {showPopup ? (
        <ModalPopup
          isOpen={showPopup}
          showPlayer={true}
          playerSrc={deleteAnimation}
          onClose={() => setShowPopup(false)}
          onConfirm={handleBulkDelete}
          title="Delete Confirmation"
          message="Do you want to delete this Jobs Permanently?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      ) : null}
      {dialogOpen ? (
        <FullScreenDialog
          headerText="React Native Developer"
          jobcode="REA930"
          // headerText="React Native Developer - REA9830"
          childrenComponent={
            <HorizontalTabs
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              tabNames={tabNames}
              HorizontalTabContainerStyle={{
                marginBottom: "5px",
              }}
            />
          }
        >
          <JobsDetails />
        </FullScreenDialog>
      ) : (
        <div>
          {selectedOption?.name === "Create Job" ? <JobsPopup /> : null}

          <StyledDOM.StyledContentOuterDiv className="outer-div">
            <div style={{ position: "relative" }}>
              <StyledDOM.StyledGlobelSearch
                type="text"
                placeholder="Search by any keyword or specfic attribute"
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
              dropdownHeading="Create Job"
              options={pageMenuOptions}
              onOptionSelect={handleOptionSelect}
              // dropdownStyle={{ width: "125px" }}
              // dropdownOptionStyle={{ width: "125px" }}
            />
          </StyledDOM.StyledContentOuterDiv>
          <StyledDOM.StyledCandidateContent className="candidate-span">
            <StyledDOM.StyledCandidateInnerContent>
              <h2>Jobs</h2>
              <StyledDOM.StyledCandidateSpan>{`${rowData.staticdata.jobsData.length} results`}</StyledDOM.StyledCandidateSpan>
            </StyledDOM.StyledCandidateInnerContent>
            <StyledDOM.StyledCandidateRightSpan>
              {selectedRows.length > 0 && (
                <DeleteStyledDOM.StyledBulkDeleteButton
                  label={"Bulk Delete"}
                  event={() => setShowPopup(true)}
                />
              )}
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
            className="jobs-table"
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
      )}
      {/* )} */}
    </>
  );
}

export default JobsTableList;
