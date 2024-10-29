import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import styled from "@emotion/styled";

const StyledMenuPaper = styled("div")({
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "5px",
    backgroundColor: "#e6f1f5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    backgroundColor: "#1b52a729",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: " #1b52a742",
  },
  "&::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#1b52a740",
  },
});

// Existing styled components
export const StyledFormControl = styled(FormControl)({});
export const StyledInputLabel = styled(InputLabel)(({ backgroundColor }) => ({
  transform: "translate(9px, -9px) scale(0.75)",
  padding: "0 4px",
  color: "black",
  backgroundColor: backgroundColor || "white",
  "& .MuiFormLabel-asterisk": {
    color: "red",
    fontSize: "14px",
  },
  "&.MuiFormLabel-root-MuiInputLabel-root": {
    color: "black",
  },
  "&.MuiFormLabel-root.Mui-focused": {
    color: "black",
  },
}));
export const StyledSelect = styled(Select)({
  "& .MuiSelect-icon": {
    color: "#000",
    right: "4px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc",
    borderRadius: "7px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc",
    borderRadius: "7px",
  },
  "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "7px 10px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc",
    borderRadius: "7px",
  },
  "& .MuiSelect-select": {
    padding: "10px",
    paddingLeft: "14px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "white",
  },
});
export const StyledMenuItem = styled(MenuItem)({
  position: "relative",
  "&.Mui-selected": {
    backgroundColor: "#d2e6fd",
    color: "#0055a5",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#e6f7ff",
  },
  "&:hover": {
    backgroundColor: "#e6f7ff",
  },
});
export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
  marginTop: "6px",
});
export const StyledCheckIcon = styled(CheckIcon)({
  marginLeft: "auto",
  color: "#0055a5",
  display: "block",
});

const DynamicSelectInput = ({
  options = [],
  onChange = () => {},
  value = "",
  name = "",
  defaultOption = "- Select -",
  label = "",
  required = false,
  error = false,
  errorMessage = "",
  labelKey = "title",
  selectStyle = {},
  wrapperStyle = {},
  labelstyle = {},
  menuWidth = 300,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderValue = (selected) => {
    if (!selected) {
      return defaultOption;
    }
    return selected;
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      component: StyledMenuPaper,
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: menuWidth,
        backgroundColor: "white",
      },
    },
    disableScrollLock: true,
  };

  return (
    <StyledFormControl
      fullWidth
      required={required}
      focused={isFocused}
      style={wrapperStyle}
    >
      <StyledInputLabel shrink={true} id={`${name}-label`} style={labelstyle}>
        {label}
      </StyledInputLabel>
      <StyledSelect
        labelId={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        displayEmpty
        renderValue={renderValue}
        IconComponent={ExpandMoreIcon}
        MenuProps={MenuProps}
        onOpen={handleOpen}
        onClose={handleClose}
        style={selectStyle}
      >
        <StyledMenuItem value="" className="default-option">
          {defaultOption}
        </StyledMenuItem>
        {options.map((option, index) => (
          <StyledMenuItem
            className="optionmap-list"
            key={`${option[labelKey]}-${index}`}
            value={option[labelKey]}
          >
            <ListItemText
              primary={option[labelKey]}
              className="listitem-text"
            />
            {isOpen && value === option[labelKey] && (
              <StyledCheckIcon className="check-icon" />
            )}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      {error && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledFormControl>
  );
};

export default DynamicSelectInput;
