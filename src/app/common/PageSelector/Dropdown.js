import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { ReactComponent as ExpandMoreIcon } from "../../../assets/image/expandarrow-icon-down.svg";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function Dropdown(props) {
  const {
    dropdownHeading = "",
    options = [],
    onOptionSelect,
    dropdownStyle = {},
    dropdownOptionStyle = {},
  } = props || {};
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const StyledDropDownContent = styled("div")({
    background: "white",
    color: "black",
    // width: "110px",
    padding: "6px",
    display: "flex",
    gap: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    alignItems: "center",
    border: "2px solid black",
    fontSize: "14px",
    // width: "120px",
    "&:hover": {
      backgroundColor: "#d6d6d6",
    },
  });
  const StyledOptions = styled("div")({
    background: "white",
    // width: "120px",
    padding: "6px",
    borderRadius: "5px",
    color: "black",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    width: "110px",
    // "&:hover": {
    //   background: "gray",
    // },
    borderBottom: "1px solid silver",
    "&:hover": {
      background: "darkgray",
    },
    "&:active": {
      background: "darkgray",
    },
  });
  const StyledDropDownContainer = styled("div")({
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-end",
    // marginRight: "10px",
    fontSize: "14px",
    zIndex: "99",
  });
  const StyledOptionsContainer = styled("div")({
    position: "absolute",
    right: "0px",
    top: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    zIndex: "999999",
    fontSize: "14px",
  });

  const handleOptionClick = (option) => {
    setShowDropdown(false);
    onOptionSelect(option);
  };

  return (
    <StyledDropDownContainer
      ref={dropdownRef}
      className="drop-down-content-outer"
    >
      <StyledDropDownContent
        onClick={() => setShowDropdown(!showDropdown)}
        className="drop-down-content"
        style={dropdownStyle}
      >
        {dropdownHeading}
        {showDropdown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </StyledDropDownContent>
      {showDropdown && (
        <StyledOptionsContainer className="option-container">
          {options.map((option, index) => (
            <StyledOptions
              key={index}
              onClick={() => handleOptionClick(option)}
              className="options"
              style={dropdownOptionStyle}
            >
              {option.name}
            </StyledOptions>
          ))}
        </StyledOptionsContainer>
      )}
    </StyledDropDownContainer>
  );
}

export default Dropdown;
