import React, { useState, useEffect, useRef } from "react";
import * as StyledDOM from "./MultiSelect.jsx";

export default function DynamicMultipleSelectCheckmarks({
  options = [],
  label = "Select",
  width = "",
  labelKey = "title",
  placeholder = "",
  value = [],
  onChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleCheckAll = () => {
    onChange(options.map((option) => option[labelKey]));
  };

  const handleUncheckAll = () => {
    onChange([]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledDOM.StyledDropdownContainer
      className="dropdown-container"
      style={{ width }}
      ref={dropdownRef}
    >
      <StyledDOM.StyledTextfieldContainer
        className="dropdown-textfield"
        label={label}
        placeholder={placeholder}
        onClick={toggleDropdown}
        value={value.length > 0 ? `${value.length} Selected` : ""}
      />

      {isOpen && (
        <StyledDOM.StyledDropdownMenu className="dropdown-menu">
          <StyledDOM.StyledStickyContainer className="sticky-container">
            <StyledDOM.StyledDropdownSearchItem className="dropdown-item">
              <StyledDOM.StyledSearchContainer
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </StyledDOM.StyledDropdownSearchItem>
            <StyledDOM.StyledCheckContainer className="check-container">
              <StyledDOM.StyledDropdownSearchItem
                className="dropdown-item"
                onClick={handleCheckAll}
              >
                <input
                  type="checkbox"
                  checked={value.length === options.length}
                  readOnly
                />
                Check All
                <StyledDOM.StyledTaskAltIcon />
              </StyledDOM.StyledDropdownSearchItem>

              <StyledDOM.StyledDropdownSearchItem
                className="dropdown-item"
                onClick={handleUncheckAll}
              >
                <input type="checkbox" checked={value.length === 0} readOnly />
                Uncheck All
                <StyledDOM.StyledCancelIcon />
              </StyledDOM.StyledDropdownSearchItem>
            </StyledDOM.StyledCheckContainer>
          </StyledDOM.StyledStickyContainer>
          {filteredOptions.map((option) => (
            <StyledDOM.StyledDropdownItem
              key={option[labelKey]}
              className="dropdown-item"
              onClick={() => handleChange(option[labelKey])}
              selected={value.includes(option[labelKey])}
            >
              <input
                type="checkbox"
                checked={value.includes(option[labelKey])}
                readOnly
              />
              {option[labelKey]}
            </StyledDOM.StyledDropdownItem>
          ))}
        </StyledDOM.StyledDropdownMenu>
      )}
    </StyledDOM.StyledDropdownContainer>
  );
}
