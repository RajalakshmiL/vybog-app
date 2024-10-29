import React, { useState, useContext } from "react";
import Table from "../../../common/Table/Table.js";
import rowData from "../../../../assets/json/Table.json";
import { LinearIndeterminate } from "../../../common/LinearProgress/LinearProgress.js";
import PageSelector from "../../../common/PageSelector/PageSelector.js";
import * as StyledDOM from "../Candidate-Page/CandidatePage.jsx";
import {
  GlobalSearch,
  sortByProperty,
  Popupscroll,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import SearchIcon from "../../../../assets/image/search-icon.svg";
import ClientPopup from "./ClientPopup.js";
import Menuselector from "../../../common/PageSelector/Menuselector.js";
import ClientDetails from "./ClientDetails.js";
import FullScreenDialog from "../../../common/FullScreenDialog/FullScreenDialog.js";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete.js";
import staticValues from "../../../../assets/json/staticData.json";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CustomTooltip from "../../../common/Tooltip/Tooltip.js";
import Button from "../../../common/Button/Button.js";
import { useFormik } from "formik";
import HorizontalTabs from "../../../common/HorizontalTabs/HorizontalTabs.js";
import { ReactComponent as ProfileInfo } from "../../../../assets/image/Info-icon.svg";
import { ReactComponent as ProfileActiveInfo } from "../../../../assets/image/Info-Active-icon.svg";
import { ReactComponent as TrackingActiveIcon } from "../../../../assets/image/Tracking-star-active-icon.svg";
import { ReactComponent as TrackingIcon } from "../../../../assets/image/Tracking-star-icon.svg";
import { ReactComponent as DocumentsActiveIcon } from "../../../../assets/image/Document-Active-icon.svg";
import { ReactComponent as DocumentsIcon } from "../../../../assets/image/Document-icon.svg";
import {
  dataTrimmer,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { useMediaQuery } from "@mui/material";
import ManageColumns from "../../../common/ManageColumns/ManageColumns";
import manageColumnIcon from "../../../../assets/image/manageColumnIcon.svg";
import * as DeleteStyledDOM from "../Candidate-Page/ExperiencePage.jsx";
import ModalPopup from "../../../common/Modal-Popup/ModalPopup";
import { DynamicContext } from "../../../context/DynamicContext.js";
// import { useNavigate } from "react-router-dom";
import deleteAnimation from "../../../../assets/json/Delete-Animation.json";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton.jsx";
function ClientTableList() {
  // const navigate = useNavigate();
  const { staticData = {} } = staticValues || {};
  const { candidate = [] } = staticData || {};
  const isScreenLessThan991 = useMediaQuery("(max-width: 991px)");

  const {
    currentPage,
    activeTab,
    setActiveTab,
    searchKey,
    setSearchKey,
    // pending,
    // setPending,
    selectedOption,
    setSelectedOption,
    dialogOpen,
    setDialogOpen,
    documentsCount,
    setDocumentsCount,
    skeletonLoading,
    setSkeletonLoading,
  } = useContext(DynamicContext);

  const formik = useFormik({
    initialValues: {
      selectJob: [],
    },
  });
  const { staticdata = {} } = rowData || [];
  const { clientData = [] } = staticdata || {};
  const [showManageColumns, setShowManageColumns] = useState(false);
  const [selectedDeleteIndex, setselectedDeleteIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [columns, setColumns] = useState([
    { id: "1", name: "Client", visible: true },
    { id: "2", name: "Contact Person", visible: true },
    { id: "3", name: "Email", visible: true },
    { id: "4", name: "Contact", visible: true },
    { id: "5", name: "Jobs", visible: true },
    { id: "6", name: "Offer", visible: true },
    { id: "7", name: "Joined", visible: true },
    { id: "8", name: "Location", visible: true },
    { id: "9", name: "Updated", visible: true },
  ]);

  const handleSelect = (item, rowIndex) => {
    switch (item) {
      case "View client":
        setDialogOpen(true);
        break;
      case "Edit client":
        setDialogOpen(true);
        break;
      case "Delete client":
        setselectedDeleteIndex(rowIndex);
        setShowDeleteConfirmation(true);
        break;
      case "Add contact":
        setDialogOpen(true);
        break;
      case "View jobs":
        setDialogOpen(true);
        break;
      case "View candidates":
        setDialogOpen(true);
        break;
      default:
        break;
    }
  };
  const handleDeleteConfirmation = (confirm) => {
    if (confirm && selectedDeleteIndex !== null) {
      const updatedRowData = [...rowData.staticdata.clientData];
      updatedRowData.splice(selectedDeleteIndex, 1);
      rowData.staticdata.clientData = updatedRowData;
    }
    // handleCloseMenuSelector();
    setShowDeleteConfirmation(false);
    setselectedDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    if (showDeleteConfirmation && rowIndex === selectedDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this client detail?
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
              // marginBottom: "3px",
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
    { name: "Jobs", icon: null, number: null },
  ];

  const options = [
    {
      name: "View client",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Edit client",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Delete client",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Add contact",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "View jobs",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "View candidates",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
  ];
  const isClickable = "true";
  const columnConfig = {
    1: {
      id: "1",
      name: "client",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.client} arrow>
            <StyledDOM.StyledTableActiveSpan
              onClick={() => setDialogOpen(true)}
              isClickable={isClickable}
            >
              {dataTrimmer(row?.client)}
            </StyledDOM.StyledTableActiveSpan>
          </CustomTooltip>
        ),
      sortable: true,
      sortFunction: sortByProperty("client"),
    },
    2: {
      name: "Contact Person",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.contact_person} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.contact_person)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
      sortable: true,
      sortFunction: sortByProperty("contact_person"),
    },
    3: {
      name: "Email",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.email} arrow>
            <StyledDOM.StyledTableSpan>
              {dataTrimmer(row?.email)}
            </StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
      sortable: true,
      sortFunction: sortByProperty("email"),
    },
    4: {
      name: "Contact",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledTableSpan>{row?.contact}</StyledDOM.StyledTableSpan>
        ),
    },
    5: {
      name: "Jobs",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton
            variant="rectangular"
            dimensions={{ width: "100px", height: "30px" }}
          />
        ) : (
          <Button
            style={{
              backgroundColor: "#2605F226",
              border: "1px solid #2605F226",
              width: "50px",
              borderRadius: "2px",
              color: "black",
              padding: "10px 10px",
            }}
            label={row?.jobs}
          />
        ),
    },
    6: {
      name: "Offer",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton
            variant="rectangular"
            dimensions={{ width: "100px", height: "30px" }}
          />
        ) : (
          <Button
            style={{
              backgroundColor: "#EFCB0E80",
              border: "1px solid #EFCB0E80",
              width: "50px",
              borderRadius: "2px",
              color: "black",
              padding: "10px 10px",
            }}
            label={row?.offer}
          />
        ),
    },
    7: {
      name: "Joined",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton
            variant="rectangular"
            dimensions={{ width: "100px", height: "30px" }}
          />
        ) : (
          <Button
            style={{
              backgroundColor: "#6CB85180",
              border: "1px solid #6CB85180",
              width: "50px",
              borderRadius: "2px",
              color: "black",
              padding: "10px 10px",
            }}
            label={row?.joined}
          />
        ),
    },
    8: {
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
    9: {
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
    10: {
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
      ...columnConfig[10],
      id: "10",
      name: "Menu",
    },
  ];
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // setPending(false);
      setSkeletonLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredData = GlobalSearch(clientData, searchKey);
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * filteredData.length;
    const lastPageIndex = firstPageIndex + filteredData.length;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  const pageMenuOptions = [
    {
      name: "Create Client",
    },
    {
      name: "Import Client",
      path: "/import-client",
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
    const updatedRowData = clientData.filter(
      (row) => !selectedRows.includes(row)
    );
    rowData.staticdata.clientData = updatedRowData;
    setSelectedRows([]);
    setToggleClearRows(!toggledClearRows);
    setShowPopup(false);
  };
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
          message="Do you want to delete this Clients Permanently?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      ) : null}
      {dialogOpen ? (
        <FullScreenDialog
          headerText="Company Name Private Limited"
          // headerVariant="h3"
          additionalText="Company Type"
          Icon={<LinkedInIcon style={{ color: "#1976d2" }} />}
          childrenComponent={
            <StyledDOM.StyledClientsTabContainer className="tab-container">
              <HorizontalTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                tabNames={tabNames}
                HorizontalTabContainerStyle={{
                  width: "100%",
                  marginBottom: "15px",
                }}
              />
              <CustomAutocomplete
                fieldLabel="Contact Person Name"
                autocompleteOuterDiv={{
                  width: isScreenLessThan991 ? "100%" : "30%",
                }}
                InputWrapperStyle={{
                  width: isScreenLessThan991 ? "auto" : "500px",
                }}
                listBoxStyle={{ width: isScreenLessThan991 ? "auto" : "500px" }}
                freeSolo={true}
                placeholder="Contact Person Name"
                options={candidate}
                showDownArrowIcon={true}
                onChange={(newValue) => {
                  console.log("selectJob", newValue);
                }}
                defaultValues={formik.values.selectJob}
                value={formik.values.selectJob}
              />
            </StyledDOM.StyledClientsTabContainer>
          }
        >
          <ClientDetails />
        </FullScreenDialog>
      ) : (
        <div>
          {selectedOption?.name === "Create Client" ? <ClientPopup /> : null}
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
              dropdownHeading="Create Client"
              options={pageMenuOptions}
              onOptionSelect={handleOptionSelect}
              dropdownStyle={{ width: "140px" }}
              dropdownOptionStyle={{ width: "140px" }}
            />
          </StyledDOM.StyledContentOuterDiv>
          <StyledDOM.StyledCandidateContent className="candidate-span">
            <StyledDOM.StyledCandidateInnerContent>
              <h2>Clients</h2>
              <StyledDOM.StyledCandidateSpan>{`${rowData.staticdata.clientData.length} results`}</StyledDOM.StyledCandidateSpan>
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
            className="clients-table"
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

export default ClientTableList;
