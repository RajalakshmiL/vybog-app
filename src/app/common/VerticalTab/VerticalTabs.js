import React from "react";
import PropTypes from "prop-types";
import * as StyledDom from "./style.jsx";
function VerticalTabs({ activeTab, handleTabChange, tabNames }) {
  const handleChange = (index) => {
    handleTabChange(index);
  };

  return (
    <StyledDom.StyledVerticalTabs className="vertical-tabs">
      <StyledDom.StyledTabsList className="tabs-list">
        {tabNames.map((tab, index) => (
          <StyledDom.StyledTab
            key={index}
            active={activeTab === index ? "active" : ""}
            onClick={() => handleChange(index)}
          >
            {tab.name}
            {tab.icon && <tab.icon />}
          </StyledDom.StyledTab>
        ))}
      </StyledDom.StyledTabsList>
    </StyledDom.StyledVerticalTabs>
  );
}

VerticalTabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,
};

export default VerticalTabs;
