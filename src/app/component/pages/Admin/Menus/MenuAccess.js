import React, { useState } from "react";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import menudatas from "../../../../../assets/json/Menu.json";
import styled from "@emotion/styled";
import Button from "../../../../common/Button/Button";
import * as StyledDOM from "./MenuStyle.jsx";

const MainMenuAccordion = styled(Accordion)`
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 10px;
`;

const SubMenuGrid = styled(Grid)`
  background-color: #fff;
  padding-left: 30px;
  border-left: 2px solid #ccc;
`;

const MenuAccess = ({ selectedUser, onBack }) => {
  const { menuDatas = {} } = menudatas || {};
  const { menuLists = [] } = menuDatas || {};
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedMenus, setExpandedMenus] = useState({});

  const handleToggle = (name, parentName) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [name]: !prev[name] };

      if (parentName && updatedCheckedItems[name]) {
        updatedCheckedItems[parentName] = true;
      }

      if (!updatedCheckedItems[name] && !parentName) {
        groupedMenuData.forEach((menu) => {
          if (menu.pageName === name) {
            menu.subMenuItems.forEach((subMenu) => {
              updatedCheckedItems[subMenu.pageName] = false;
            });
          }
        });
      }
      if (!parentName) {
        setExpandedMenus((prevExpanded) => ({
          ...prevExpanded,
          [name]: updatedCheckedItems[name],
        }));
      }

      return updatedCheckedItems;
    });
  };

  const handleAssignSelectedMenus = () => {
    const selectedHierarchy = groupedMenuData
      .filter((menu) => checkedItems[menu.pageName])
      .map((menu) => {
        return {
          pageName: menu.pageName,
          subMenuItems: menu.subMenuItems
            .filter((subMenu) => checkedItems[subMenu.pageName])
            .map((subMenu) => ({
              pageName: subMenu.pageName,
              pagePath: subMenu.pagePath,
              pageIndex: subMenu.pageIndex,
            })),
        };
      });
    console.log("Selected Menu Hierarchy:", selectedHierarchy);
  };

  const groupedMenuData = menuLists.reduce((acc, item) => {
    if (item.subMenu) {
      const parentIndex = acc.findIndex(
        (menu) => menu.pageName === item.subMenuParent
      );

      if (parentIndex !== -1) {
        acc[parentIndex].subMenuItems.push(item);
      }
    } else {
      acc.push({
        pageName: item.pageName,
        pagePath: item.pagePath,
        pageIndex: item.pageIndex,
        subMenuItems: [],
      });
    }
    return acc;
  }, []);

  return (
    <>
      <StyledDOM.StyledHeaderDiv>
        <StyledDOM.StyledMenuMappingHeader>
          Menu Mapping
          <StyledDOM.StyledEmployeeName>
            {`( ${selectedUser} )`}
          </StyledDOM.StyledEmployeeName>
        </StyledDOM.StyledMenuMappingHeader>
        <StyledDOM.StyledButtonContainer className="button-container">
          <Button event={onBack} isCancel={true} label={"Back to Users List"} />
        </StyledDOM.StyledButtonContainer>
      </StyledDOM.StyledHeaderDiv>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ padding: "20px" }}
      >
        <Grid item xs={12}>
          {groupedMenuData.map((menu, index) => (
            <MainMenuAccordion
              key={index}
              expanded={expandedMenus[menu.pageName] || false}
              onChange={() =>
                setExpandedMenus((prev) => ({
                  ...prev,
                  [menu.pageName]: !prev[menu.pageName],
                }))
              }
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedItems[menu.pageName] || false}
                      onChange={() => handleToggle(menu.pageName)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label={menu.pageName}
                  onClick={(e) => e.stopPropagation()}
                />
              </AccordionSummary>
              <AccordionDetails>
                {menu.subMenuItems.length > 0 ? (
                  <Grid container spacing={2}>
                    {menu.subMenuItems.map((subMenu, subIndex) => (
                      <SubMenuGrid item xs={12} key={subIndex}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkedItems[subMenu.pageName] || false}
                              onChange={() =>
                                handleToggle(subMenu.pageName, menu.pageName)
                              }
                            />
                          }
                          label={subMenu.pageName}
                        />
                      </SubMenuGrid>
                    ))}
                  </Grid>
                ) : (
                  <StyledDOM.StyledErrorSubMenu>
                    No Sub Menus Available
                  </StyledDOM.StyledErrorSubMenu>
                )}
              </AccordionDetails>
            </MainMenuAccordion>
          ))}
        </Grid>
      </Grid>
      <StyledDOM.StyledAssignButton>
        <Button
          label="Assign Selected Menus"
          event={handleAssignSelectedMenus}
        />
      </StyledDOM.StyledAssignButton>
    </>
  );
};

export default MenuAccess;
