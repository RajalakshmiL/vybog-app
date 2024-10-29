import React, { useState, useEffect, useContext } from "react";
import * as StyleDOM from "../EmployeeInfo/Tracking.jsx";
import CustomAutocomplete from "../../../common/AutoComplete/AutoComplete";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import Button from "../../../common/Button/Button.js";
import staticValues from "../../../../assets/json/staticData.json";
import { useFormik } from "formik";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar.js";
import {
  formatDate,
  handleTriggerClear,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import ReadMore from "../../../common/ReadMore/ReadMore.jsx";
import CustomDatePicker from "../../../common/DatePicker/DatePicker";
import DynamicSelectInput from "../../../common/SelectInput/SelectInput";
import DynamicMultipleSelectCheckmarks from "../../../common/Multi-Select-CheckMarks/MultiSelectCheckMarks.js";
import { DynamicContext } from "../../../context/DynamicContext.js";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton.jsx";
function ClientTracking() {
  const { staticData = {} } = staticValues || {};
  const {
    roles = [],
    jobStatus = [],
    Reminder = [],
    TimeZone = [],
    ReminderTime = [],
    candidate = [],
  } = staticData || [];

  const reminderTimeOptions = ReminderTime.map((option) => ({
    value: Object.keys(option)[0],
    label: Object.values(option)[0],
  }));
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [clearTriggered, setClearTriggered] = useState(false);
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);
  // console.log("Skeletonloading", skeletonLoading);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
  }, [clearTriggered]);

  const formik = useFormik({
    initialValues: {
      addTracking: "",
      tagstage: "",
      callMode: "",
      selectJob: "",
      scheduler: false,
      reminderDate: "",
      reminderTime: "",
      reminderTimeZone: "",
      reminderBeforeTheTime: "",
      assignTo: [],
      notifyUsers: false,
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
        console.log("ClientTrackingHistory", trimmedValues);
      } else {
        Toast("warning", "Please add tracking details");
      }
    },
  });

  return (
    <>
      <div className="TrackingMainContainer">
        <StyleDOM.TrackingMainContainer>
          <StyleDOM.TrackingMainInnerContainer className="tracking-maininnercontainer">
            <StyleDOM.TrackingUpperOuterContainer className="upperoutercontainer">
              <StyleDOM.TrackingLeftContainer className="job-div">
                <StyleDOM.AutoCompleteContainer className="job-auto">
                  <CustomAutocomplete
                    clearTriggered={clearTriggered}
                    fieldLabel="Job"
                    freeSolo={true}
                    placeholder="Job"
                    options={roles}
                    defaultValues={formik.values.selectJob}
                    value={formik.values.selectJob}
                    showDownArrowIcon={true}
                    onChange={(newValue) => {
                      formik.setFieldValue("selectJob", newValue);
                    }}
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
                    onChange={(newValue) => {
                      formik.setFieldValue("tagstage", newValue);
                    }}
                    defaultValues={formik.values.tagstage}
                    value={formik.values.tagstage}
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
                    onChange={(newValue) => {
                      formik.setFieldValue("callMode", newValue);
                    }}
                    defaultValues={formik.values.callMode}
                    value={formik.values.callMode}
                  />
                </StyleDOM.CallStageDiv>
              </StyleDOM.TrackingLeftContainer>
              <StyleDOM.TrackingHeader>Add Tracking</StyleDOM.TrackingHeader>
              <StyleDOM.AddTrackingLeftContainer>
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
                    />
                  </StyleDOM.StyledCheckboxDiv>
                  {formik.values.scheduler === true ? (
                    <StyleDOM.StyledReminderContainer className="reminderContainer">
                      {" "}
                      <CustomDatePicker
                        label="Reminder Date"
                        dateFormat="dd/MM/yyyy"
                        labelColor="black"
                        divStyle={{ width: "100%", marginBottom: "0px" }}
                        form={formik}
                        placeholder="Reminder Date"
                        field={{
                          name: "reminderDate",
                          value: formik.values.reminderDate,
                          onChange: (e) => {
                            formik.setFieldValue(
                              "reminderDate",
                              e.target.value
                            );
                          },
                          onBlur: () => {
                            formik.setFieldTouched("reminderDate", true);
                          },
                        }}
                      />
                      <DynamicSelectInput
                        label="Reminder Time"
                        options={reminderTimeOptions}
                        name="reminderTime"
                        value={formik.values.reminderTime}
                        onChange={formik.handleChange}
                        labelKey="label"
                      />
                      <DynamicSelectInput
                        label="Time Zone"
                        options={TimeZone}
                        name="reminderTimeZone"
                        value={formik.values.reminderTimeZone}
                        onChange={formik.handleChange}
                      />
                      <DynamicSelectInput
                        label="Reminder Before The Time"
                        options={Reminder}
                        name="reminderBeforeTheTime"
                        value={formik.values.reminderBeforeTheTime}
                        onChange={formik.handleChange}
                      />
                      <DynamicMultipleSelectCheckmarks
                        options={candidate}
                        label="Assign to"
                        placeholder="Assign to"
                        value={formik.values.assignTo}
                        onChange={(values) =>
                          formik.setFieldValue("assignTo", values)
                        }
                      />
                      <DynamicCheckbox
                        labelStyle={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#000000",
                        }}
                        label="Notify Users"
                        checked={formik.values.notifyUsers}
                        onChange={(e) =>
                          formik.setFieldValue("notifyUsers", e.target.checked)
                        }
                      />
                    </StyleDOM.StyledReminderContainer>
                  ) : null}

                  <StyleDOM.StyledButtonDiv>
                    <Button
                      label="Clear"
                      isCancel
                      event={() =>
                        handleTriggerClear(formik, setClearTriggered)
                      }
                    />
                    <Button label="Add Track" event={formik.handleSubmit} />
                  </StyleDOM.StyledButtonDiv>
                </StyleDOM.StyledScheduler>
              </StyleDOM.AddTrackingLeftContainer>
            </StyleDOM.TrackingUpperOuterContainer>
          </StyleDOM.TrackingMainInnerContainer>
        </StyleDOM.TrackingMainContainer>
      </div>
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
                      <StyleDOM.TrackingMainInnerContainer className="clienttracking-inner">
                        <StyleDOM.TrackingLowerInnerContainer className="lower-innercontainer">
                          <StyleDOM.TrackingContentDiv>
                            <StyleDOM.ContentDate className="content-date">
                              {formatDate(new Date())}
                            </StyleDOM.ContentDate>
                            <StyleDOM.DetailsDiv className="details">
                              <StyleDOM.CandidateDetailsDiv className="Candidate-details">
                                <StyleDOM.InfoName>
                                  Candidate:
                                  <StyleDOM.InfoNamespan>
                                    thirumurgan Sethupathy
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
                          <StyleDOM.ContentStatusContainer className="contentstatus">
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

export default ClientTracking;
