import React, { useState, useEffect, useContext } from "react";
import mappingData from "../../../../../assets/json/MenuMapping.json";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import CheckBox from "../../../../common/CheckBox/CheckBox";
import { Popupscroll } from "../../../../common/CommonFunctions/CommonFunctions";
import DynamicSkeleton from "../../../../common/Skeleton/Skeleton";
import { DynamicContext } from "../../../../context/DynamicContext";
function DailyReportAccess() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { menuMapping = {} } = mappingData || {};
  const { mappingMenusData = [] } = menuMapping || {};
  const [assignToUser, setAssignToUser] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);
  const handleChipClick = (user) => {
    setSelectedUser(user);
    setAssignToUser(true);
  };

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
    const selectedDesignation = selectedValues[designation] || {
      users: [],
    };
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
    console.log("Daily Access Users hierarchy:", selectedValues);
    setAssignToUser(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  Popupscroll(assignToUser);
  return (
    <>
      <>
        {assignToUser && (
          <ContentDialog
            isOpen={assignToUser}
            onClose={() => setAssignToUser(false)}
            title={`Daily Access - ${selectedUser}`}
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
        <StyledDOM.StyledMenuHeading>
          Daily Report Access Control
        </StyledDOM.StyledMenuHeading>
        <StyledDOM.StyleMappingMainContainer className="mapping-container">
          {skeletonLoading
            ? Array(mappingMenusData.length || 3)
                .fill("")
                .map((_, index) => (
                  <DynamicSkeleton
                    variant="rectangular"
                    count={mappingMenusData.length || 3}
                    dimensions={{
                      height: 200,
                      width: "100%",
                      sx: { borderRadius: 2, marginBottom: 2 },
                    }}
                    spacing={2}
                  />
                ))
            : mappingMenusData.map((data, index) => (
                <StyledDOM.StyledMappingContainer
                  className="main-container"
                  key={index}
                >
                  <StyledDOM.StyledInnerHeadings>
                    {data.designation}
                  </StyledDOM.StyledInnerHeadings>
                  <StyledDOM.StyledChipContainer className="chip-container">
                    {data.users.map((user, userIndex) => (
                      <StyledDOM.StyledChips
                        key={userIndex}
                        className="chip"
                        onClick={() => handleChipClick(user)}
                      >
                        {user}
                      </StyledDOM.StyledChips>
                    ))}
                  </StyledDOM.StyledChipContainer>
                </StyledDOM.StyledMappingContainer>
              ))}
        </StyledDOM.StyleMappingMainContainer>
      </>
    </>
  );
}

export default DailyReportAccess;
