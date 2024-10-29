import React, { useState, useRef, useEffect } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledMenuButton = styled(MenuButton)({
  background: "#1b52a7",
  color: "white",
  width: "100%",
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  borderRadius: "5px",
  marginRight: "15px",
  border: "none",
  fontSize: "15px",
});
const StyledHeadingSpan = styled("span")({
  display: "flex",
  flexGrow: 1,
  textAlign: "center",
});
const StyledMenu = styled(Menu)({
  ".szh-menu": {
    padding: "2px 0px",
  },
  "& .react-menu__menu": {
    position: "relative",
  },
  ".szh-menu__item": {
    padding: "0.375rem 1.5rem",
  },
});

const StyledMenuItem = styled(MenuItem)({
  padding: "8px 16px",
  cursor: "pointer",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "#1b52a7",
    color: "white",
  },
});

const StyledSubMenu = styled(SubMenu)({
  "& .react-menu__menu": {
    position: "absolute",
    left: "100%",
    top: "0",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  "& .react-menu__item--hover": {
    backgroundColor: "#1b52a7",
    color: "white",
  },
  "& .szh-menu__item": {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "8px 16px",
    boxSizing: "border-box",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1b52a7",
      color: "white",
    },
  },
});

const StyledDropDownContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  position: "relative",
  marginTop: "10px",
  marginRight: "10px",
  zIndex: "99",
});
const StyledParentDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  cursor: "pointer",
  paddingLeft: "6px",
});

function PageSelector({ dropdownHeading = "", options = [], onOptionSelect }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (option.path) {
      navigate(option.path);
    }
    if (option.onClick) {
      option.onClick();
    }
    if (!option.children) {
      setIsMenuOpen(false);
      if (onOptionSelect) {
        onOptionSelect(option);
      }
    }
  };

  const handleSubMenuIconClick = (event, option) => {
    event.stopPropagation();
    if (screenWidth < 991) {
      setIsMenuOpen((prev) => !prev);
    } else {
      if (option.path) {
        navigate(option.path);
      }
      if (option.onClick) {
        option.onClick();
      }
      if (!option.path && option.children) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    }
  };

  const renderOptions = (options) => {
    return options.map((option, index) =>
      option.children ? (
        <StyledSubMenu
          key={index}
          label={
            <StyledParentDiv
              onClick={(e) => {
                handleOptionClick(option);
                handleSubMenuIconClick(e, option);
              }}
            >
              {option.name}
            </StyledParentDiv>
          }
        >
          {renderOptions(option.children)}
        </StyledSubMenu>
      ) : (
        <StyledMenuItem key={index} onClick={() => handleOptionClick(option)}>
          {option.name}
        </StyledMenuItem>
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledDropDownContainer ref={dropdownRef}>
      <StyledMenu
        menuButton={
          <StyledMenuButton onClick={() => setIsMenuOpen((prev) => !prev)}>
            <StyledHeadingSpan>{dropdownHeading}</StyledHeadingSpan>
            {isMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </StyledMenuButton>
        }
        onMenuChange={(e) => setIsMenuOpen(e.open)}
      >
        {renderOptions(options)}
      </StyledMenu>
    </StyledDropDownContainer>
  );
}

export default PageSelector;
