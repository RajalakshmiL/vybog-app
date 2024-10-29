import React from "react";
import PropTypes from "prop-types";
import * as StyledDom from "./style.jsx";

function HorizontalTabs({
  activeTab,
  handleTabChange,
  tabNames,
  containerStyle,
  HorizontalTabContainerStyle,
}) {
  const handleChange = (index) => {
    handleTabChange(index);
  };

  return (
    <StyledDom.StyledHorizontalTabs
      className="Horizontal-tabs"
      style={HorizontalTabContainerStyle}
    >
      <StyledDom.StyledTabsList className="tabs-list" style={containerStyle}>
        {tabNames.map((tab, index) => (
          <StyledDom.StyledTab
            key={index}
            active={activeTab === index ? "active" : ""}
            onClick={() => handleChange(index)}
          >
            {tab.icon && <tab.icon />}
            {tab.name}
            {tab.number}
          </StyledDom.StyledTab>
        ))}
      </StyledDom.StyledTabsList>
    </StyledDom.StyledHorizontalTabs>
  );
}

HorizontalTabs.propTypes = {
  activeTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  tabNames: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      number:PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    })
  ).isRequired,
  containerStyle: PropTypes.object,
  HorizontalTabContainerStyle:PropTypes.object
};

export default HorizontalTabs;
