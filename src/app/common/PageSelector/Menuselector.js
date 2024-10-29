import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as MoreVertIcon } from "../../../assets/image/More-Vert-icon.svg";
import styled from "@emotion/styled";

const StyledMenu = styled(Menu)({
  "& .MuiList-root": {
    padding: "0px",
    backgroundColor: "#f4f5fa",
  },
})
const StyledMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#1b52a7 ",
    color: "white",
  },
})
const Menuselector = ({
  options,
  onSelect,
  menuStyle,
  itemStyle,
  onOpen,
  onClose,
  rowIndex,
  disabled,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  // const [showDropdownIcon, setShowDropdownIcon] = useState(false);

  const handleClick = (event) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
    if (onOpen) onOpen(rowIndex);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onClose) onClose();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option.name);
    onSelect(option.name);
    handleClose();  
  };
   const defaultItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: "#cddcec",
    },
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="menu-selector"
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabled}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="menu-selector"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
        sx={menuStyle}
      >
        {options.map((option, index) => (
          <StyledMenuItem
            sx={{ ...defaultItemStyle, ...itemStyle }}
            className="menu-item"
            key={index}
            selected={option === selectedOption}
            onClick={() => handleOptionSelect(option)}
            // onMouseEnter={() => setShowDropdownIcon(option)}
            // onMouseLeave={() => setShowDropdownIcon(null)}
            disabled={disabled}
          >
            {option.name}
            {/* {showDropdownIcon === option && option.icon && (
              <span style={{ display: "flex" }} className="option-icon">
                {option.icon}
              </span>
            )} */}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Menuselector;