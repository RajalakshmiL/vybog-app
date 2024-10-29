import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as CloseIcon } from "../../../assets/image/cancel-icon.svg";
import "../../common/common.css";
import { DynamicContext } from "../../context/DynamicContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const {dialogOpen,setDialogOpen,setActiveTab} = useContext(DynamicContext);
  const {
    headerText,
    // headerVariant,
    additionalText,
    Icon,
    children,
    childrenComponent,
    jobcode,
  } = props || {};
  const handleClose = () => {
    setDialogOpen(false);
    setActiveTab(0);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} className="appbarstyle">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
            }}
            className="toolbar-container"
          >
            <div
              // variant={headerVariant || "h6"}
              // component="div"
              className="dialogmain-div"
            >
              <div className="dialog-div">
                <div className="dialogcontainer-div">
                  <div className="dialogcontainermain-div">
                    <div className="content-container">
                      <div>
                        <h5>{headerText}</h5>
                      </div>
                    </div>
                    <div className="side-content">
                      {jobcode && (
                        <div className="jobcode-div">
                          <p>{jobcode}</p>
                        </div>
                      )}
                      {additionalText && (
                        <div>
                          <div className="additionaltext-div">
                            <p>{additionalText}</p>
                            {Icon}
                          </div>
                        </div>
                      )}
                      <div className="sideinner-content">
                        <p>
                          Current employer
                          <span>xyz india</span>
                        </p>
                        <p>
                          Certification
                          <span>Aws Certified</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dialogchild-div">{childrenComponent}</div>
            </div>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              className="cancel-iconbutton"
            >
              {/* <CloseIcon onClick={() => setActiveTab(0)} /> */}
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="children">{children}</div>
      </Dialog>
    </React.Fragment>
  );
}
