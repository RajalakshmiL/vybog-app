import React, { useState, useEffect, useContext } from "react";
import mappingData from "../../../../../assets/json/MenuMapping.json";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import Button from "../../../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import ContentDialog from "../../../../common/Modal-Popup/ContentDialog";
import OptionData from "../../../../../assets/json/Menu.json";
import DynamicCheckBox from "../../../../common/CheckBox/CheckBox";
import MultiSelector from "../../../../common/Multi-Select-CheckMarks/MultiSelectCheckMarks";
import staticValues from "../../../../../assets/json/staticData.json";
import { useFormik } from "formik";
import { Popupscroll } from "../../../../common/CommonFunctions/CommonFunctions";
import DynamicSkeleton from "../../../../common/Skeleton/Skeleton";
import { DynamicContext } from "../../../../context/DynamicContext";

function StageAccessControl() {
  const { staticData = {} } = staticValues || {};
  const { candidate = [] } = staticData || [];
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { menuDatas = {} } = OptionData || {};
  const { CallStages = [] } = menuDatas || {};
  const { menuMapping = {} } = mappingData || {};
  const { mappingMenusData = [] } = menuMapping || {};
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);
  const [checkedStages, setCheckedStages] = useState(
    CallStages.reduce((acc, stage) => {
      acc[stage.callStageName] = stage.Active || false;
      return acc;
    }, {})
  );

  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const formik = useFormik({
    initialValues: {
      applySameStages: [],
    },
  });

  const handleCheckboxChange = (stageName) => {
    setCheckedStages((prevCheckedStages) => ({
      ...prevCheckedStages,
      [stageName]: !prevCheckedStages[stageName],
    }));
  };

  const handleCheckAll = () => {
    const newCheckStatus = !isAllChecked;
    setIsAllChecked(newCheckStatus);
    const updatedStages = CallStages.reduce((acc, stage) => {
      acc[stage.callStageName] = newCheckStatus;
      return acc;
    }, {});
    setCheckedStages(updatedStages);
  };

  const handleChipClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    console.log("Selected User:", selectedUser);
    console.log("Checked Stages:", checkedStages);
    console.log("Apply Same Stages to:", formik.values.applySameStages);
    setIsDialogOpen(false);
  };

  Popupscroll(isDialogOpen);

  return (
    <>
      {isDialogOpen && (
        <ContentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title={`Stage Access - ${selectedUser}`}
          submitButtonLabel="Save"
          cancelButtonLabel="Cancel"
          contentHeight="500px"
          contentWidth="700px"
          isCancel={true}
          event={handleSave}
          className="assignto-user dialog"
        >
          <div className="checkboxs-inner-container">
            <DynamicCheckBox
              label="Check All"
              checked={isAllChecked}
              onChange={handleCheckAll}
            />
          </div>

          <StyledDOM.StyledCheckBoxsScrollContainer className="checkboxs-container">
            {CallStages.map((stage, index) => (
              <div key={index} className="checkboxs-inner-container">
                <DynamicCheckBox
                  label={stage.callStageName}
                  checked={checkedStages[stage.callStageName]}
                  onChange={() => handleCheckboxChange(stage.callStageName)}
                />
              </div>
            ))}
          </StyledDOM.StyledCheckBoxsScrollContainer>

          <MultiSelector
            name="applySameStages"
            options={candidate}
            label="Select User(s) to Apply Same Stages"
            placeholder="Select User(s) to Apply Same Stages"
            value={formik.values.applySameStages}
            onChange={(values) =>
              formik.setFieldValue("applySameStages", values)
            }
          />
        </ContentDialog>
      )}

      <StyledDOM.StyledMenuHeading>
        Stage Access Control
      </StyledDOM.StyledMenuHeading>

      <StyledDOM.StyledPageSelectorContainer className="pageSelector">
        <Button
          isCancel={true}
          label="Back To Call Stage"
          event={() => navigate("/call-stages")}
        />
      </StyledDOM.StyledPageSelectorContainer>

      <StyledDOM.StyleMappingMainContainer className="mapping-container">
        {skeletonLoading
          ? Array(mappingMenusData.length || 3)
              .fill("")
              .map((_, index) => (
                <DynamicSkeleton
                  variant="rectangular"
                  count={mappingMenusData.length || 3}
                  dimensions={{
                    height: 200,
                    width: "100%",
                    sx: { borderRadius: 2, marginBottom: 2 },
                  }}
                  spacing={2}
                />
              ))
          : mappingMenusData.map((data, index) => (
              <StyledDOM.StyledMappingContainer
                className="main-container"
                key={index}
              >
                <StyledDOM.StyledInnerHeadings>
                  {data.designation}
                </StyledDOM.StyledInnerHeadings>
                <StyledDOM.StyledChipContainer className="chip-container">
                  {data.users.map((user, userIndex) => (
                    <StyledDOM.StyledChips
                      key={userIndex}
                      className="chip"
                      onClick={() => handleChipClick(user)}
                    >
                      {user}
                    </StyledDOM.StyledChips>
                  ))}
                </StyledDOM.StyledChipContainer>
              </StyledDOM.StyledMappingContainer>
            ))}
      </StyledDOM.StyleMappingMainContainer>
    </>
  );
}

export default StageAccessControl;
