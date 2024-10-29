import React, { useContext, useState } from "react";
import menudatas from "../../../../../assets/json/Menu.json";
import Table from "../../../../common/Table/Table";
import { useNavigate } from "react-router-dom";
import * as StyledDOM from "./MenuStyle.jsx";
import Menuselector from "../../../../common/PageSelector/Menuselector";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
  Popupscroll,
} from "../../../../common/CommonFunctions/CommonFunctions";
import PageSelector from "../../../../common/PageSelector/PageSelector";
import { DynamicContext } from "../../../../context/DynamicContext";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
// import DynamicSelectInput from "../../../../common/SelectInput/SelectInput";
import { useFormik } from "formik";
// import OptionData from "../../../../../assets/json/staticData.json";
import userAccessData from "../../../../../assets/json/MenuMapping.json";
import CheckBox from "../../../../common/CheckBox/CheckBox";

function MenuList() {
  const navigate = useNavigate();
  const { setSelectedOption } = useContext(DynamicContext);
  const { menuDatas = {} } = menudatas || {};
  const { menuLists = [] } = menuDatas || {};
  const { menuMapping = {} } = userAccessData || {};
  const { mappingMenusData = [] } = menuMapping || [];
  // const { staticData = {} } = OptionData || {};
  // const { pageName = [] } = staticData || {};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignToUser, setAssignToUser] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const [menuListData, setMenuListData] = useState(menuLists);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      parentPage: "",
      pageName: "",
      pageLink: "",
    },
    onSubmit: () => {
      console.log("values", formik.values);
      if (selectedMenuIndex !== null) {
        const updatedMenuList = [...menuListData];
        updatedMenuList[selectedMenuIndex] = {
          ...updatedMenuList[selectedMenuIndex],
          pageName: formik.values.pageName,
          pageLinkName: formik.values.pageLink,
        };
        setMenuListData(updatedMenuList);
        setDialogOpen(false);
      }
    },
  });

  const isClickable = "true";

  const options = [
    {
      name: "Edit Menu",
    },
    {
      name: "Assign Users",
    },
    {
      name: "Delete Menu",
    },
  ];

  const columns = [
    {
      name: "Page Name",
      selector: (row) => (
        <StyledDOM.StyledHeaderSpan subMenu={row?.subMenu}>
          {row?.pageName}
        </StyledDOM.StyledHeaderSpan>
      ),
    },
    {
      name: "Link",
      selector: (row) => (
        <StyledDOM.StyledTableActiveSpan
          onClick={() => navigate(row?.pagePath)}
          isClickable={isClickable}
        >
          {row?.pageLinkName}
        </StyledDOM.StyledTableActiveSpan>
      ),
    },
    {
      selector: (row, index) => (
        <>
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

  const handleSelect = (item, rowIndex) => {
    switch (item) {
      case "Edit Menu":
        setDialogOpen(true);
        setSelectedMenuIndex(rowIndex);
        formik.setValues({
          parentPage: menuListData[rowIndex].parentPage || "",
          pageName: menuListData[rowIndex].pageName || "",
          pageLink: menuListData[rowIndex].pageLinkName || "",
        });
        break;
      case "Assign Users":
        setAssignToUser(true);
        break;
      case "Delete Menu":
        break;
      default:
        break;
    }
  };
  const pageMenuOptions = [
    {
      name: "Menus",
      children: [
        {
          name: "Menu Mapping",
          path: "/menu-mapping",
        },
        {
          name: "Action Rights",
          path: "/user-actions",
        },
      ],
    },
    {
      name: "Call Stages",
      path: "/call-stages",
      children: [
        {
          name: "Call Stage Access",
          path: "/stage-access-control",
        },
      ],
    },
    {
      name: "Daily Report Access",
      path: "/daily-report-access",
    },
    {
      name: "Masters",
      children: [
        {
          name: "Skill",
          path: "/skills-list",
        },
        {
          name: "Role",
          path: "/roles-list",
        },
      ],
    },
    {
      name: "Country",
      path: "/country-list",
      children: [
        {
          name: "State",
          path: "/state-list",
        },
        {
          name: "City",
          path: "/city-list",
        },
        {
          name: "Locality",
          path: "/locality-list",
        },
      ],
    },
    {
      name: "Login Tracks",
      path: "/external-login-track",
    },
    {
      name: "IP Configure",
      path: "/add-ip-address",
    },
    {
      name: "Connections",
      path: "/connection-list",
    },
    {
      name: "Email Templates",
      path: "/email-template-list",
    },
    {
      name: "Customer Priority Access",
      path: "/customer-priority-access",
    },
  ];
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  Popupscroll(dialogOpen || assignToUser);

  const handleSelectDesignation = (designation) => {
    const isSelected = selectedValues[designation]?.isSelected;
    const updatedUsers = isSelected
      ? []
      : mappingMenusData.find((item) => item.designation === designation)
          ?.users || [];

    setSelectedValues((prev) => ({
      ...prev,
      [designation]: {
        isSelected: !isSelected,
        users: updatedUsers,
      },
    }));
  };

  const handleSelectUser = (designation, user) => {
    const selectedDesignation = selectedValues[designation] || { users: [] };
    const isSelected = selectedDesignation.users.includes(user);

    const updatedUsers = isSelected
      ? selectedDesignation.users.filter((u) => u !== user)
      : [...selectedDesignation.users, user];

    setSelectedValues((prev) => ({
      ...prev,
      [designation]: {
        ...selectedDesignation,
        isSelected:
          updatedUsers.length ===
          mappingMenusData.find((item) => item.designation === designation)
            ?.users.length,
        users: updatedUsers,
      },
    }));
  };

  const handleSave = () => {
    console.log("Assign To Users hierarchy:", selectedValues);
    setAssignToUser(false);
  };

  return (
    <>
      {assignToUser && (
        <ContentDialog
          isOpen={assignToUser}
          onClose={() => setAssignToUser(false)}
          title="Menu Access - Home"
          submitButtonLabel="Save"
          cancelButtonLabel="Cancel"
          contentHeight="500px"
          contentWidth="700px"
          isCancel={true}
          event={handleSave}
          className="assignto-user dialog"
        >
          <StyledDOM.StyledContent className="assign-content">
            {mappingMenusData.map((item, index) => (
              <StyledDOM.StyledDesignationContainer key={index}>
                <StyledDOM.StyledUserHeader className="user-header">
                  <CheckBox
                    label={item.designation}
                    labelStyle={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1b52a7",
                    }}
                    checked={
                      selectedValues[item.designation]?.isSelected || false
                    }
                    onChange={() => handleSelectDesignation(item.designation)}
                  />
                </StyledDOM.StyledUserHeader>
                <StyledDOM.StyledUsersContainer>
                  {item.users.map((user, userIndex) => (
                    <StyledDOM.StyledUserTag key={userIndex}>
                      <CheckBox
                        label={user}
                        labelStyle={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#000000",
                        }}
                        containerStyle={{ marginLeft: "-10px" }}
                        checked={
                          selectedValues[item.designation]?.users.includes(
                            user
                          ) || false
                        }
                        onChange={() =>
                          handleSelectUser(item.designation, user)
                        }
                      />
                    </StyledDOM.StyledUserTag>
                  ))}
                </StyledDOM.StyledUsersContainer>
              </StyledDOM.StyledDesignationContainer>
            ))}
          </StyledDOM.StyledContent>
        </ContentDialog>
      )}
      {dialogOpen && (
        <ContentDialog
          title={"Menu Details"}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          contentHeight="300px"
          submitButtonLabel={"Save"}
          isCancel={true}
          event={formik.handleSubmit}
        >
          <>
            <StyledDOM.StyledTextInput
              type="text"
              name="pageName"
              label="Page Name"
              placeholder="Page Name"
              onChange={formik.handleChange}
              value={formik.values.pageName}
            />
            <StyledDOM.StyledTextInput
              type="text"
              name="pageLink"
              label="Page Link"
              placeholder="Page Link"
              onChange={formik.handleChange}
              value={formik.values.pageLink}
            />
          </>
        </ContentDialog>
      )}
      <StyledDOM.StyledMenuHeading>Menu List</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledPageSelectorContainer className="pageSelector">
        <PageSelector
          dropdownHeading="Menu List"
          options={pageMenuOptions}
          onOptionSelect={handleOptionSelect}
        />
      </StyledDOM.StyledPageSelectorContainer>
      <Table
        data={menuListData}
        columns={columns}
        fixedHeader={true}
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
      />
    </>
  );
}

export default MenuList;
