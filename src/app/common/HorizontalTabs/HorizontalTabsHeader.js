import React from "react";
import PropTypes from "prop-types";
import * as StyledDom from "./style.jsx";

function HorizontalTabsHeader({
  activeTab,
  handleTabChange,
  tabNames,
  isfilled,
}) {
  const handleChange = (index) => {
    handleTabChange(index);
  };

  return (
    <StyledDom.StyledHorizontalTabsNew className="Horizontal-tabs">
      <StyledDom.StyledTabsListNew className="tabs-list-new">
        {tabNames.map((tab, index) => (
          <StyledDom.StyledTabNew
            className="tab-new"
            key={index}
            active={activeTab === index ? "active" : ""}
            onClick={() => handleChange(index)}
            style={isfilled ? { cursor: "pointer" } : { cursor: "default" }}
          >
            <div>{tab.icon && <tab.icon />}</div>
            {tab.name}
            {tab.number}
          </StyledDom.StyledTabNew>
        ))}
      </StyledDom.StyledTabsListNew>
    </StyledDom.StyledHorizontalTabsNew>
  );
}

HorizontalTabsHeader.propTypes = {
  activeTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      number: PropTypes.number,
    })
  ).isRequired,
};

export default HorizontalTabsHeader;
