import React, { useState, useEffect, useContext } from "react";
import mappingData from "../../../../../assets/json/MenuMapping.json";
import * as StyledDOM from "./MenuStyle.jsx";
import MenuAccess from "./MenuAccess";
import DynamicSkeleton from "../../../../common/Skeleton/Skeleton";
import { DynamicContext } from "../../../../context/DynamicContext";
function MenuMapping() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { menuMapping = {} } = mappingData || {};
  const { mappingMenusData = [] } = menuMapping || {};
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);
  const handleChipClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackToUsersList = () => {
    setSelectedUser(null);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {selectedUser ? (
        <MenuAccess
          selectedUser={selectedUser}
          onBack={handleBackToUsersList}
        />
      ) : (
        <>
          <StyledDOM.StyledMenuHeading>
            Menu Mapping{" "}
            <StyledDOM.StyledMenuSubHeading>
              ( Select the user to assign menus)
            </StyledDOM.StyledMenuSubHeading>
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
      )}
    </>
  );
}

export default MenuMapping;
