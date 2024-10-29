import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import tableData from "../../../../../assets/json/Menu.json";
import * as StyledDOM from "./MenuStyle.jsx";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
  Popupscroll,
} from "../../../../common/CommonFunctions/CommonFunctions";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import Menuselector from "../../../../common/PageSelector/Menuselector";
import CheckBox from "../../../../common/CheckBox/CheckBox";
import userAccessData from "../../../../../assets/json/MenuMapping.json";
import { useFormik } from "formik";

function UserActions() {
  const { menuDatas = {} } = tableData || {};
  const { UserActionsData = [] } = menuDatas || {};
  const { menuMapping = {} } = userAccessData || {};
  const { mappingMenusData = [] } = menuMapping || [];
  const [assignToUser, setAssignToUser] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserAction, setSelectedUserAction] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [userActionsData, setUserActionsData] = useState(UserActionsData);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      actionName: "",
    },
    onSubmit: () => {
      if (selectedIndex !== null) {
        const updatedActions = [...userActionsData];
        updatedActions[selectedIndex].userActions = formik.values.actionName;
        setUserActionsData(updatedActions);
        setDialogOpen(false);
      }
    },
  });

  const options = [
    {
      name: "Edit User Actions",
    },
    {
      name: "Edit Permissions",
    },
    {
      name: "Delete User Actions",
    },
  ];

  const handleSelect = (item, rowIndex) => {
    switch (item) {
      case "Edit User Actions":
        setSelectedIndex(rowIndex);
        formik.setFieldValue(
          "actionName",
          userActionsData[rowIndex]?.userActions || ""
        );
        setDialogOpen(true);
        break;
      case "Edit Permissions":
        setSelectedUserAction(UserActionsData[rowIndex]?.userActions || "");
        setAssignToUser(true);
        break;
      case "Delete Menu":
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      name: "Actions",
      selector: (row) => (
        <StyledDOM.StyledHeaderSpan subMenu={row?.subMenu}>
          {row?.userActions}
        </StyledDOM.StyledHeaderSpan>
      ),
    },
    {
      name: "Menus",
      selector: (row, index) =>
        row?.subMenu ? (
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
        ) : null,
      width: "200px",
    },
  ];

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

  Popupscroll(assignToUser || dialogOpen);
  return (
    <>
      {assignToUser && (
        <ContentDialog
          isOpen={assignToUser}
          onClose={() => setAssignToUser(false)}
          title={`Permission Access - ${selectedUserAction}`}
          submitButtonLabel="Save"
          cancelButtonLabel="Cancel"
          contentHeight="500px"
          contentWidth="700px"
          isCancel={true}
          event={handleSave}
        >
          <StyledDOM.StyledContent>
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
          title={"User Action Details"}
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          contentHeight="200px"
          submitButtonLabel={"Save"}
          isCancel={true}
          event={formik.handleSubmit}
        >
          <>
            <StyledDOM.StyledTextInput
              type="text"
              name="actionName"
              label="Action Name"
              placeholder="Action Name"
              onChange={formik.handleChange}
              value={formik.values.actionName}
            />
          </>
        </ContentDialog>
      )}
      <StyledDOM.StyledMenuHeading>User Actions</StyledDOM.StyledMenuHeading>
      <div className="table-container">
        <Table
          data={UserActionsData}
          columns={columns}
          fixedHeader={true}
          fixedHeaderScrollHeight={"500px"}
          highlightOnHover
        />
      </div>
    </>
  );
}

export default UserActions;
