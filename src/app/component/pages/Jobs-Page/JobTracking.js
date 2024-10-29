import React, { useState, useEffect, useContext } from "react";
import * as StyleDOM from "../EmployeeInfo/Tracking.jsx";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import Button from "../../../common/Button/Button.js";
import staticValues from "../../../../assets/json/staticData.json";
import { useFormik } from "formik";
import MailIcon from "../../../../assets/image/Mail.svg";
import WhatsappIcon from "../../../../assets/image/Whatsapp-Icon.svg";
import LocationIcon from "../../../../assets/image/Location-icon.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/image/Close-icon.svg";
import {
  formatDate,
  handleTriggerClear,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar.js";
import ReadMore from "../../../common/ReadMore/ReadMore.jsx";
import { DynamicContext } from "../../../context/DynamicContext.js";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton.jsx";
function JobTracking() {
  const { staticData = {} } = staticValues || {};
  const { roles = [], jobStatus = [], candidate = [] } = staticData || [];
  const [displayPopupIndex, setDisplayPopupIndex] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [clearTriggered, setClearTriggered] = useState(false);
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);
  const formik = useFormik({
    initialValues: {
      addTracking: "",
      tagstage: "",
      callMode: "",
      selectJob: "",
      scheduler: false,
    },
    onSubmit: (values, { resetForm }) => {
      // const trimmedValues = {
      //   addTracking: values.addTracking.trim(),
      //   tagstage: values.tagstage.trim(),
      //   callMode: values.callMode.trim(),
      //   selectJob: values.selectJob.trim(),
      //   scheduler: values.scheduler,
      // };
      const trimmedValues = handleCustomTrim(values);
      if (
        trimmedValues.addTracking &&
        trimmedValues.tagstage &&
        trimmedValues.callMode &&
        trimmedValues.selectJob
      ) {
        setTrackingHistory([...trackingHistory, trimmedValues]);
        setClearTriggered(true);
        resetForm();
        console.log("JobTrackingHistory", trimmedValues);
      } else {
        Toast("warning", "Please add tracking details");
      }
    },
  });

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
  }, [clearTriggered]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePopup = (index) => {
    setDisplayPopupIndex(index);
  };

  const handleClose = () => {
    setDisplayPopupIndex(null);
  };
  console.log("tracking", trackingHistory);

  return (
    <>
      <StyleDOM.TrackingMainContainer className="job-tracking">
        <StyleDOM.TrackingMainInnerContainer className="tracking-maininnercontainer">
          <StyleDOM.TrackingUpperOuterContainer className="upperoutercontainer">
            <StyleDOM.TrackingLeftContainer className="job-div">
              <StyleDOM.AutoCompleteContainer className="job-auto">
                <CustomAutocomplete
                  clearTriggered={clearTriggered}
                  fieldLabel="Job"
                  InputWrapperStyle={{ width: "100%" }}
                  listBoxStyle={{ width: "500px" }}
                  freeSolo={true}
                  placeholder="Job"
                  options={candidate}
                  values={formik.values.selectJob}
                  showDownArrowIcon={true}
                  onChange={(newValue) => {
                    formik.setFieldValue("selectJob", newValue);
                  }}
                  defaultValues={formik.values.selectJob}
                />
                <StyleDOM.JobOptions>
                  <StyleDOM.ViewJob>View Job</StyleDOM.ViewJob>
                  <StyleDOM.NewJob>Add New Job</StyleDOM.NewJob>
                </StyleDOM.JobOptions>
              </StyleDOM.AutoCompleteContainer>
              <StyleDOM.CallStageDiv className="call-stage">
                <CustomAutocomplete
                  clearTriggered={clearTriggered}
                  fieldLabel="Tag/Stage"
                  listBoxStyle={{ width: "360px" }}
                  freeSolo={true}
                  options={jobStatus}
                  placeholder="Tag/Stage"
                  showDownArrowIcon={true}
                  values={formik.values.tagstage}
                  onChange={(newValue) => {
                    formik.setFieldValue("tagstage", newValue);
                  }}
                  defaultValues={formik.values.tagstage}
                />
              </StyleDOM.CallStageDiv>
              <StyleDOM.CallStageDiv className="call-stage">
                <CustomAutocomplete
                  clearTriggered={clearTriggered}
                  fieldLabel="Call Mode"
                  listBoxStyle={{ width: "360px" }}
                  freeSolo={true}
                  placeholder="Call Mode"
                  options={roles}
                  showDownArrowIcon={true}
                  values={formik.values.callMode}
                  onChange={(newValue) => {
                    formik.setFieldValue("callMode", newValue);
                  }}
                  defaultValues={formik.values.callMode}
                />
              </StyleDOM.CallStageDiv>
            </StyleDOM.TrackingLeftContainer>
            <StyleDOM.TrackingHeader>Add Tracking</StyleDOM.TrackingHeader>
            <StyleDOM.TrackingLeftContainer>
              <StyleDOM.TrackingTextAreaDiv className="tracking-text-area">
                <StyleDOM.StyledTextArea
                  containerClassName="summary-container"
                  name="addTracking"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addTracking}
                ></StyleDOM.StyledTextArea>
              </StyleDOM.TrackingTextAreaDiv>
              <StyleDOM.StyledScheduler className="scheduler-div">
                <StyleDOM.StyledCheckboxDiv className="trackingcheckbox-div">
                  <DynamicCheckbox
                    labelStyle={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#000000",
                    }}
                    label="Add Scheduler"
                    checked={formik.values.scheduler}
                    onChange={(e) =>
                      formik.setFieldValue("scheduler", e.target.checked)
                    }
                  ></DynamicCheckbox>
                </StyleDOM.StyledCheckboxDiv>

                <StyleDOM.StyledButtonDiv>
                  <Button
                    label="Clear"
                    isCancel={true}
                    event={() => handleTriggerClear(formik, setClearTriggered)}
                  />
                  <Button label="Add Track" event={formik.handleSubmit} />
                </StyleDOM.StyledButtonDiv>
              </StyleDOM.StyledScheduler>
            </StyleDOM.TrackingLeftContainer>
          </StyleDOM.TrackingUpperOuterContainer>
        </StyleDOM.TrackingMainInnerContainer>
      </StyleDOM.TrackingMainContainer>
      <StyleDOM.ContentMainContainer className="contentMain-Container">
        {skeletonLoading
          ? Array(trackingHistory.length || 1)
              .fill("")
              .map((_, index) => (
                <DynamicSkeleton
                  key={index}
                  variant="rectangular"
                  dimensions={{
                    height: 130,
                    width: "100%",
                    sx: { borderRadius: 4, marginBottom: 2 },
                  }}
                  spacing={2}
                />
              ))
          : trackingHistory.length > 0 && (
              <>
                <StyleDOM.TrackingHistoryHeader>
                  Tracking History
                </StyleDOM.TrackingHistoryHeader>
                <StyleDOM.TrackingLowerDisplayContainer className="display-container">
                  {trackingHistory.map((tracking, index) => (
                    <StyleDOM.TrackingLowerContainer
                      className={
                        trackingHistory.length > 1
                          ? "tracking-lowercontainer"
                          : ""
                      }
                      key={index}
                    >
                      <StyleDOM.TrackingMainInnerContainer className="tracking-inner">
                        <StyleDOM.TrackingLowerInnerContainer className="lower-innercontainer">
                          <StyleDOM.TrackingContentDiv>
                            <StyleDOM.ContentDate className="content-date">
                              {formatDate(new Date())}
                            </StyleDOM.ContentDate>
                            <StyleDOM.DetailsDiv className="details">
                              <StyleDOM.CandidateDetailsDiv className="Candidate-details">
                                <StyleDOM.InfoName>
                                  Job:
                                  <StyleDOM.InfoNamespan>
                                    Devops Admin(TR58693)
                                  </StyleDOM.InfoNamespan>
                                </StyleDOM.InfoName>
                              </StyleDOM.CandidateDetailsDiv>
                              <StyleDOM.ClientDetailsDiv className="client-details">
                                <StyleDOM.InfoNameClient>
                                  Client:
                                  <StyleDOM.InfoNamespan>
                                    ABCD
                                  </StyleDOM.InfoNamespan>
                                </StyleDOM.InfoNameClient>
                              </StyleDOM.ClientDetailsDiv>
                            </StyleDOM.DetailsDiv>
                          </StyleDOM.TrackingContentDiv>
                          <StyleDOM.ContentStatusContainer
                            className="contentstatus"
                            style={{ width: "60%" }}
                          >
                            <StyleDOM.ContentStatus>
                              {tracking.tagstage}
                            </StyleDOM.ContentStatus>
                          </StyleDOM.ContentStatusContainer>
                        </StyleDOM.TrackingLowerInnerContainer>
                        <StyleDOM.ContentContainer className="contentcontainer">
                          <StyleDOM.ContentDescription className="contentdescription">
                            <StyleDOM.Content>
                              <ReadMore maxCharacterCount={600}>
                                {tracking.addTracking}
                              </ReadMore>
                            </StyleDOM.Content>
                          </StyleDOM.ContentDescription>
                        </StyleDOM.ContentContainer>
                      </StyleDOM.TrackingMainInnerContainer>
                    </StyleDOM.TrackingLowerContainer>
                  ))}
                </StyleDOM.TrackingLowerDisplayContainer>
              </>
            )}
      </StyleDOM.ContentMainContainer>
    </>
  );
}

export default JobTracking;
