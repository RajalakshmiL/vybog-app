import React, { useEffect, useMemo, useState, useContext } from "react";
import Table from "../../../common/Table/Table";
import rowData from "../../../../assets/json/Table.json";
import { LinearIndeterminate } from "../../../common/LinearProgress/LinearProgress";
import PageSelector from "../../../common/PageSelector/PageSelector";
import * as StyledDOM from "./CandidatePage.jsx";
import * as DeleteStyledDOM from "../Candidate-Page/ExperiencePage.jsx";
import manageColumnIcon from "../../../../assets/image/manageColumnIcon.svg";
import {
  GlobalSearch,
  sortByProperty,
  Popupscroll,
} from "../../../common/CommonFunctions/CommonFunctions";
import SearchIcon from "../../../../assets/image/search-icon.svg";
import Menuselector from "../../../common/PageSelector/Menuselector.js";
// import FilterIcon from "../../../../assets/image/FilterIcon.svg";
// import SettingsIcon from "../../../../assets/image/Setting.svg";
import Dropdown from "../../../common/PageSelector/Dropdown.js";
import "../../../common/common.css";
import CustomTooltip from "../../../common/Tooltip/Tooltip";
import { useNavigate } from "react-router-dom";
import {
  dataTrimmer,
  skillDataTrimmer,
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../common/CommonFunctions/CommonFunctions";
import {
  RESUME_PARSER_BASE_URL,
  LOGIN_URL,
} from "../../../../helper/url_helper";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar";
import { post } from "../../../../helper/Api_helper";
import ManageColumns from "../../../common/ManageColumns/ManageColumns";
import ModalPopup from "../../../common/Modal-Popup/ModalPopup";
import { DynamicContext } from "../../../context/DynamicContext";
import deleteAnimation from "../../../../assets/json/Delete-Animation.json";
import Button from "../../../common/Button/Button";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton";
function CandidateTableList() {
  const navigate = useNavigate();
  const {
    currentPage,
    searchKey,
    setSearchKey,
    // pending,
    // setPending,
    // selectedOption,
    setSelectedOption,
    setLoading,
    skeletonLoading,
    setSkeletonLoading,
  } = useContext(DynamicContext);
  const { staticdata = {} } = rowData || [];
  const { rowdata = [] } = staticdata || {};
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showManageColumns, setShowManageColumns] = useState(false);
  const [selectedDeleteIndex, setselectedDeleteIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [columns, setColumns] = useState([
    { id: "1", name: "First Name", visible: true },
    { id: "2", name: "Email", visible: true },
    { id: "3", name: "Contact", visible: true },
    { id: "4", name: "Skill", visible: true },
    { id: "5", name: "Role", visible: true },
    { id: "6", name: "Tag", visible: true },
    { id: "7", name: "Location", visible: true },
    { id: "8", name: "Updated", visible: true },
  ]);

  const isClickable = "true";
  const columnConfig = {
    1: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" dimensions={{ width: 150 }} />
        ) : (
          <CustomTooltip title={row?.name} arrow>
            <StyledDOM.StyledTableActiveSpan
              onClick={() => navigate("/candidate-info")}
              isClickable={isClickable}
            >
              {dataTrimmer(row?.name)}
            </StyledDOM.StyledTableActiveSpan>
          </CustomTooltip>
        ),
      sortable: true,
      sortFunction: sortByProperty("name"),
    },
    2: {
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
    3: {
      selector: (row, rowIndex) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <span>{row?.contact}</span>
        ),
    },
    4: {
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
    5: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <CustomTooltip title={row?.role} arrow>
            <StyledDOM.StyledTableSpan>{row?.role}</StyledDOM.StyledTableSpan>
          </CustomTooltip>
        ),
      sortable: true,
      sortFunction: sortByProperty("role"),
    },
    6: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton
            variant="rectangular"
            dimensions={{ width: "100px", height: "30px" }}
          />
        ) : (
          <StyledDOM.StyledButton
            label={row?.tag}
            style={{
              backgroundColor: getColorByTag(row?.tag),
              color: getFontColorByTag(row?.tag),
            }}
          />
        ),
    },
    7: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledTableSpan>
            {dataTrimmer(row?.location)}
          </StyledDOM.StyledTableSpan>
        ),
      sortable: true,
      sortFunction: sortByProperty("location"),
    },
    8: {
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledTableSpan>
            {dataTrimmer(row?.updated)}
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
      case "View candidate":
        navigate("/candidate-info");
        break;
      case "Edit candidate":
        navigate("/candidate-info");
        break;
      case "Delete candidate":
        setselectedDeleteIndex(rowIndex);
        setShowDeleteConfirmation(true);
        break;
      case "Deactivate":
        navigate("/candidate-info");
        break;
      case "Search resume":
        navigate("/candidate-info");
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
      // handleCloseMenuSelector();
    }
    setShowDeleteConfirmation(false);
    setselectedDeleteIndex(null);
  };

  const renderDeleteConfirmation = (rowIndex) => {
    if (showDeleteConfirmation && rowIndex === selectedDeleteIndex) {
      return (
        <DeleteStyledDOM.StyledDeleteContainer className="delete-confirmation">
          <DeleteStyledDOM.StyledDeleteSpan>
            Do you want to delete this Candidate?
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
      name: "View candidate",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Edit candidate",
      icon: <StyledDOM.StyledRightArrowIcon />,
    },
    {
      name: "Delete candidate",
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

  const getColorByTag = (tag) => {
    switch (tag) {
      case "Interview":
        return "rgba(13, 82, 167,0.16)";
      case "Ready To Join":
        return "#ffcbe3";
      case "Shortlist":
        return "rgba(255, 67, 0, 0.16)";
      case "GD/HR":
        return "rgba(101, 96, 255, 0.16)";
      case "New Applied":
        return "rgba(255, 46, 3, 0.16)";
      case "Challenge":
        return "rgba(14, 95, 7, 0.16)";
      default:
        return "transparent";
    }
  };

  const getFontColorByTag = (tag) => {
    switch (tag) {
      case "Interview":
        return "rgba(13, 82, 167)";
      case "Ready To Join":
        return "#ff56fc";
      case "Shortlist":
        return "rgba(255, 67, 0)";
      case "GD/HR":
        return "rgba(101, 96, 255)";
      case "New Applied":
        return "rgba(255, 46, 3)";
      case "Challenge":
        return "rgba(14, 95, 7)";
      default:
        return "transparent";
    }
  };

  const handleSaveColumns = (updatedColumns) => {
    setColumns(updatedColumns);
    setShowManageColumns(false);
  };
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const handleBulkDelete = () => {
    const updatedRowData = rowdata.filter((row) => !selectedRows.includes(row));
    rowData.staticdata.rowdata = updatedRowData;
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
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setPending(false);
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSkeletonLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredData = GlobalSearch(rowdata, searchKey);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * filteredData.length;
    const lastPageIndex = firstPageIndex + filteredData.length;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleDropDownOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleResumeParser = React.useCallback(() => {
    post(RESUME_PARSER_BASE_URL, LOGIN_URL, {
      email: "nandhakumar@codenatives.com",
      password: "nandhakumar",
    })
      .then((response) => {
        const { access_token } = response;
        localStorage.setItem("token", access_token);
        console.log("LOGIN_SUCCESS_RESPONSE >>>>", response);
        setLoading(false);
      })
      .catch((res_error) => {
        const { response = {} } = res_error || {};
        const { data = {} } = response || {};
        const { error = "" } = data || {};
        console.log("LOGIN_ERROR_RESPONSE >>>>", error);
        Toast("error", "invalid token");
      });
  }, [setLoading]);

  const pageMenuOptions = [
    {
      name: "Manual Creation",
      path: "/create-candidate",
    },
    {
      name: "Import Candidate",
      path: "/import-candidate",
    },
    {
      name: "Upload Resumes",
      path: "/resume-upload",
      onClick: () => handleResumeParser(),
    },
  ];
  Popupscroll(showPopup);
  return (
    <>
      {showPopup ? (
        <ModalPopup
          isOpen={showPopup}
          showPlayer={true}
          onClose={() => setShowPopup(false)}
          playerSrc={deleteAnimation}
          onConfirm={handleBulkDelete}
          title="Delete Confirmation"
          message="Do you want to delete this Candidates Permanently?"
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
            dropdownHeading="Create Candidate"
            options={pageMenuOptions}
            onOptionSelect={handleOptionSelect}
          />
        </StyledDOM.StyledContentOuterDiv>
        <StyledDOM.StyledCandidateContent className="candidate-span">
          <StyledDOM.StyledCandidateLeftSpan>
            <StyledDOM.StyledCandidateLeftSpanHeading>
              Candidates
            </StyledDOM.StyledCandidateLeftSpanHeading>
            <StyledDOM.StyledCandidateSpan>{`${rowData.staticdata.rowdata.length} results`}</StyledDOM.StyledCandidateSpan>
          </StyledDOM.StyledCandidateLeftSpan>
          <StyledDOM.StyledCandidateRightSpan>
            <Dropdown
              dropdownHeading="Bulk Action"
              options={[{ name: "Create" }, { name: "Edit" }]}
              onOptionSelect={handleDropDownOptionSelect}
            />
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
            {/* <StyledDOM.StyledButtonOuterDiv>
              <StyledDOM.StyledFilterIcon src={FilterIcon} alt="Filter-icon" />
              <StyledDOM.StyledCandidateTableButton label={"Filter"} />
            </StyledDOM.StyledButtonOuterDiv>
            <StyledDOM.StyledButtonOuterDiv>
              <StyledDOM.StyledSettingsIcon
                src={SettingsIcon}
                alt="Settings-icon"
              />
              <StyledDOM.StyledCandidateTableButton label={"Settings"} />
            </StyledDOM.StyledButtonOuterDiv> */}
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

export default CandidateTableList;
