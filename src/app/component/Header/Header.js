import React, { useState, useEffect, useRef, useContext } from "react";
import * as StyledDOM from "./style";
import mainLogo from "../../../assets/image/vybog 2.0.svg";
import SettingIcon from "../../../assets/image/Setting.svg";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Profile from "../../../assets/image/Profile.svg";
import Subsrciption from "../../../assets/image/subscription.svg";
import Help from "../../../assets/image/Help.svg";
import Logout from "../../../assets/image/Logout-icon.svg";
import EditIcon from "../../../assets/image/edit-icon.svg";
import NotificationsIcon from "../../../assets/image/Notification.svg";
import MailIcon from "../../../assets/image/Mail.svg";
import { ReactComponent as CancelIcon } from "../../../assets/image/cancel-icon.svg";
import { ScrollToTop } from "../../common/CommonFunctions/CommonFunctions";
import { DynamicContext } from "../../context/DynamicContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Header() {
  const { setSearchKey, setDocumentsCount } = useContext(DynamicContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const [profileInfo, setProfileInfo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);

  const {
    setSelectedOption = () => {},
    setMoreOptions = () => {},
    setActiveTab,
  } = useContext(DynamicContext);

  const dropdownOptions = [
    { label: "Email Pro", path: "/compose-mail", id: "compose-mail" },
    { label: "Planner", path: "/scheduler", id: "scheduler" },
  
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileInfo(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        windowWidth <= 800 &&
        displayNavbar &&
        event.target.closest(".navbar-left") === null
      ) {
        setDisplayNavbar(false);
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [windowWidth, displayNavbar]);

  const toggleNavbar = () => {
    setDisplayNavbar(!displayNavbar);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeNavbar = () => {
    setDisplayNavbar(false);
    setIsMenuOpen(false);
    setActiveTab(0);
  };

  const handleSelect = (link) => {
    setSelectedOption(null);
    setMoreOptions(null);
    setActiveTab(0);
    closeNavbar();
    setSearchKey("");
    setDocumentsCount(0);
  };

  const handleProfileInfo = () => {
    setProfileInfo(!profileInfo);
  };

  const handleLogout = () => {
    setSelectedOption(null);
    setMoreOptions(false);
    setActiveTab(0);
    console.log("The profile signout");
    localStorage.removeItem("avatarImage");
    localStorage.removeItem("formValues");
    localStorage.removeItem("email");
    localStorage.removeItem("temporaryToken");
    navigate("/auth/login");
  };
  const AccountDetails = JSON.parse(localStorage.getItem("formValues"));
  const ProfileImage = localStorage.getItem("avatarImage");
  const emailinfo = localStorage.getItem("email");
  const { fullName = "" } = AccountDetails || {};
  const handleProfileUpdate = () => {
    console.log("the edit profile account");
    navigate("/manage-account");
    setProfileInfo(false);
  };
  const handleManageAccount = () => {
    console.log("the managed account");
    navigate("/manage-account");
    setProfileInfo(false);
  };
  const handleDropdownSelect = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
    handleSelect(path);
  };
  const getActiveLink = () => {
    const { pathname } = location;
    if (
      pathname.includes("/candidates") ||
      pathname.includes("/create-candidate") ||
      pathname.includes("/import-candidate") ||
      pathname.includes("/resume-upload") ||
      pathname.includes("/candidate-info") ||
      pathname.includes("/candidate-field-mapping")
    ) {
      return "candidate";
    }
    if (pathname.includes("/dashboard")) {
      return "dashboard";
    }
    if (
      pathname.includes("/jobs") ||
      pathname.includes("/create-job") ||
      pathname.includes("/import-job")
    ) {
      return "jobs";
    }
    if (
      pathname.includes("/clients") ||
      pathname.includes("/create-client") ||
      pathname.includes("/import-client") ||
      pathname.includes("/client-field-mapping")
    ) {
      return "clients";
    }
    if (
      pathname.includes("/reports") ||
      pathname.includes("team-reports") ||
      pathname.includes("/report-details")
    ) {
      return "reports";
    }
    if (
      pathname.includes("/employee-list") ||
      pathname.includes("/add-employee-details") ||
      pathname.includes("/add-employee-designation") ||
      pathname.includes("/leave-history-monthly") ||
      pathname.includes("/leave-history-yearly")
    ) {
      return "employee-list";
    }
    if (pathname.includes("/manage-account")) {
      return "manage-account";
    }
    if (
      pathname.includes("/menu") ||
      pathname.includes("/menu-mapping") ||
      pathname.includes("/user-actions") ||
      pathname.includes("/call-stages") ||
      pathname.includes("/stage-access-control") ||
      pathname.includes("/daily-report-access") ||
      pathname.includes("/skills-list") ||
      pathname.includes("/roles-list") ||
      pathname.includes("/country-list") ||
      pathname.includes("/state-list") ||
      pathname.includes("/city-list") ||
      pathname.includes("/locality-list") ||
      pathname.includes("/external-login-track") ||
      pathname.includes("/customer-priority-access") ||
      pathname.includes("/connection-list") ||
      pathname.includes("/add-connection") ||
      pathname.includes("/add-ip-address") ||
      pathname.includes("/email-template-list") ||
      pathname.includes("/edit-email-template")
    ) {
      return "menu";
    }
    if (pathname.includes("/compose-mail")) {
      return "compose-mail";
    }
    if (pathname.includes("/scheduler")) {
      return "scheduler";
    }
    if (pathname.includes("/demo")) {
      return "demo";
    }
    return "candidate";
  };

  const getCurrentDropdownOption = () => {
    const { pathname } = location;
    return dropdownOptions.find((option) => pathname.includes(option.id));
  };
  const getFilteredDropdownOptions = () => {
    const currentOption = getCurrentDropdownOption();
    return dropdownOptions.filter(
      (option) => !currentOption || option.id !== currentOption.id
    );
  };
  const activeLink = getActiveLink();
  const currentDropdownOption = getCurrentDropdownOption();
  const filteredDropdownOptions = getFilteredDropdownOptions();
  return (
    <>
      <ScrollToTop />
      <StyledDOM.StyledNavbar>
        <StyledDOM.StyledMenuContainer className="menu-container">
          <StyledDOM.StyledLogoContainer>
            <StyledDOM.StyledMainLogo src={mainLogo} alt="Logo" />
          </StyledDOM.StyledLogoContainer>
          <StyledDOM.StyledNavbarLeft
            displayNavbar={displayNavbar}
            className="navbar-left"
          >
            <StyledDOM.StyledLink
              to="/dashboard"
              onClick={() => handleSelect("dashboard")}
              className={activeLink === "dashboard" ? "headeractive" : ""}
            >
              Dashboard
            </StyledDOM.StyledLink>
            <StyledDOM.StyledLink
              to="/candidates"
              onClick={() => handleSelect("candidate")}
              className={activeLink === "candidate" ? "headeractive" : ""}
            >
              Candidates
            </StyledDOM.StyledLink>
            <StyledDOM.StyledLink
              to="/jobs"
              onClick={() => handleSelect("jobs")}
              className={activeLink === "jobs" ? "headeractive" : ""}
            >
              Jobs
            </StyledDOM.StyledLink>
            <StyledDOM.StyledLink
              to="/clients"
              onClick={() => handleSelect("clients")}
              className={activeLink === "clients" ? "headeractive" : ""}
            >
              Clients
            </StyledDOM.StyledLink>
            <StyledDOM.StyledLink
              to="/reports"
              onClick={() => handleSelect("reports")}
              className={activeLink === "reports" ? "headeractive" : ""}
            >
              Reports
            </StyledDOM.StyledLink>
            <StyledDOM.StyledLink
              to="/employee-list"
              onClick={() => handleSelect("employee-list")}
              className={activeLink === "employee-list" ? "headeractive" : ""}
            >
              HR Desk
            </StyledDOM.StyledLink>
            <StyledDOM.StyledLink
              to="/menu"
              onClick={() => handleSelect("menu")}
              className={activeLink === "menu" ? "headeractive" : ""}
            >
              Admin
            </StyledDOM.StyledLink>

            {currentDropdownOption && (
              <StyledDOM.StyledLink
                to={currentDropdownOption.path}
                onClick={() => handleSelect(currentDropdownOption.id)}
                className={
                  activeLink === currentDropdownOption.id ? "headeractive" : ""
                }
              >
                {currentDropdownOption.label}
              </StyledDOM.StyledLink>
            )}
            <div style={{ position: "relative" }}>
              <MoreHorizIcon
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <StyledDOM.StyledDropdownMenu ref={dropdownRef} id="headermenu">
                  {filteredDropdownOptions.map((option) => (
                    <StyledDOM.StyledDropdownItem
                      key={option.id}
                      to={option.path}
                      onClick={() => handleDropdownSelect(option.path)}
                    >
                      {option.label}
                    </StyledDOM.StyledDropdownItem>
                  ))}
                </StyledDOM.StyledDropdownMenu>
              )}
            </div>
          </StyledDOM.StyledNavbarLeft>
        </StyledDOM.StyledMenuContainer>
        <StyledDOM.StyledNavbarRight className="Navbar-right">
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="primary">
              <StyledDOM.StyledNotificationIcon
                src={NotificationsIcon}
                alt="Notification-icon"
              />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="primary">
              <StyledDOM.StyledMailIcon src={MailIcon} alt="Mail-icon" />
            </Badge>
          </IconButton>
          <IconButton size="large" aria-label="setting icon" color="inherit">
            <Badge>
              <StyledDOM.StyledSettingIcon
                src={SettingIcon}
                alt="settingicon"
              />
            </Badge>
          </IconButton>
          <StyledDOM.StyledNavAvatar
            alt="Profileicon"
            src={ProfileImage}
            onClick={handleProfileInfo}
          />
          {profileInfo && (
            <StyledDOM.StyledProfileDiv
              className="profile-mainouter-div"
              ref={profileRef}
            >
              <StyledDOM.StyledProfileInnerdiv className="profile-main">
                <Badge
                  variant="circular"
                  className="avatar component"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <StyledDOM.StyledSmallAvatar
                      className="edit-icon"
                      src={EditIcon}
                      onClick={handleProfileUpdate}
                    />
                  }
                >
                  <Avatar
                    src={ProfileImage || null}
                    sx={{ width: 70, height: 70 }}
                    className="popup-profileAvatar"
                  />
                </Badge>
                <StyledDOM.StyledProfileUpdateInfo className="profile-update-info">
                  <StyledDOM.StyledProfileName>
                    Hi {fullName}
                  </StyledDOM.StyledProfileName>
                  <StyledDOM.StyledProfileEmail>
                    {emailinfo}
                  </StyledDOM.StyledProfileEmail>
                </StyledDOM.StyledProfileUpdateInfo>
              </StyledDOM.StyledProfileInnerdiv>
              <StyledDOM.StyledProfileInfoMainDiv className="profile-info-main-div">
                <StyledDOM.StyledProfileInfoInnerDiv className="profile-info-inner-div">
                  <StyledDOM.StyledProfileOption
                    className="profile-options-acount"
                    onClick={handleManageAccount}
                  >
                    <StyledDOM.StyledProfileOptionImage
                      src={Profile}
                      alt="profileicon"
                    />
                    <StyledDOM.StyledProfileOptionspan>
                      Manage Profile
                    </StyledDOM.StyledProfileOptionspan>
                  </StyledDOM.StyledProfileOption>
                  <StyledDOM.StyledProfileOptionDiv className="profile-options-acount">
                    <StyledDOM.StyledProfileOptionImage
                      src={Subsrciption}
                      alt="subscription"
                    />
                    <StyledDOM.StyledProfileOptionspan>
                      current subscription
                    </StyledDOM.StyledProfileOptionspan>
                  </StyledDOM.StyledProfileOptionDiv>
                  <StyledDOM.StyledProfileOptionDiv className="profile-options-acount">
                    <StyledDOM.StyledProfileOptionImage src={Help} alt="Help" />
                    <StyledDOM.StyledProfileOptionspan>
                      Help
                    </StyledDOM.StyledProfileOptionspan>
                  </StyledDOM.StyledProfileOptionDiv>
                  <StyledDOM.StyledProfileOptionDiv className="profile-options-acount">
                    <StyledDOM.StyledProfileOptionImage
                      src={SettingIcon}
                      alt="Settings"
                    />
                    <StyledDOM.StyledProfileOptionspan>
                      Settings
                    </StyledDOM.StyledProfileOptionspan>
                  </StyledDOM.StyledProfileOptionDiv>
                </StyledDOM.StyledProfileInfoInnerDiv>
                <StyledDOM.StyledProfileLogoutOptionDiv
                  onClick={handleLogout}
                  className="profile-options-acount"
                >
                  <StyledDOM.StyledProfileOptionImage
                    src={Logout}
                    alt="Settings"
                  />
                  <StyledDOM.StyledProfileOptionspan>
                    Logout
                  </StyledDOM.StyledProfileOptionspan>
                </StyledDOM.StyledProfileLogoutOptionDiv>
              </StyledDOM.StyledProfileInfoMainDiv>
            </StyledDOM.StyledProfileDiv>
          )}
          {windowWidth <= 991 &&
            (isMenuOpen ? (
              <CancelIcon
                onClick={toggleNavbar}
                style={{ marginLeft: "14px", marginTop: "10px" }}
              />
            ) : (
              <StyledDOM.StyledMenuIcon onClick={toggleNavbar} />
            ))}
        </StyledDOM.StyledNavbarRight>
      </StyledDOM.StyledNavbar>
      <Outlet />
    </>
  );
}
export default Header;
