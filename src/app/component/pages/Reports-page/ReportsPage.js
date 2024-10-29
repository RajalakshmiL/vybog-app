import React, { useState, useContext, useEffect } from "react";
import reportsData from "../../../../assets/json/staticData.json";
import * as StyledDOM from "./Reports.jsx";
import { formatDate } from "../../../common/CommonFunctions/CommonFunctions";
import TextEditor from "../../../common/TextEditer/TextEditer";
import Button from "../../../common/Button/Button";
import { DynamicContext } from "../../../context/DynamicContext";
import PageSelector from "../../../common/PageSelector/PageSelector";
import { useFormik } from "formik";
import DynamicCheckbox from "../../../common/CheckBox/CheckBox";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import reportAnimation from "../../../../assets/json/Report_Animation.json";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
function ReportsPage() {
  const navigate = useNavigate();
  const { setSelectedOption } = useContext(DynamicContext);
  const { staticData = {} } = reportsData || {};
  const { DailyReport = [] } = staticData || {};
  const [showEditor, setShowEditor] = useState(false);
  const [editorResetTrigger, setEditorResetTrigger] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [createdContent, setCreatedContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object({
    remark: Yup.string().required("Remark is required."),
    agree: Yup.boolean().oneOf(
      [true],
      "Please agree to verify the data accuracy."
    ),
  });
  const formik = useFormik({
    initialValues: {
      remark: "",
      agree: false,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      console.log("Submit value", formik.values.remark);
    },
  });

  useEffect(() => {
    if (editorResetTrigger) {
      setEditorResetTrigger(false);
    }
  }, [editorResetTrigger]);

  const buttons = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview"],
    ["save"],
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    console.log(files, info);
  };

  const pageMenuOptions = [
    {
      name: "Team Reports",
      path: "/team-reports",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("temporaryToken");
    navigate("/auth/login");
  };

  const handleSubmit = () => {
    formik.handleSubmit();
    if (formik.values.agree === true) {
      setIsSubmitted(true);
    }
  };

  const handleReview = () => {
    formik.setTouched({ remark: true });
    if (formik.values.remark !== "") {
      setCreatedContent(formik.values.remark);
      setViewMode(true);
    }
  };

  const handleCleardata = () => {
    formik.setFieldValue("remark", "");
    setEditorResetTrigger(Date.now());
    setCreatedContent("");
  };

  console.log(
    "createdContent",
    createdContent,
    "formik.values.remark",
    formik.values.remark
  );

  return (
    <>
      {isSubmitted ? (
        <StyledDOM.StyledAnimationMainContainer className="animation-container">
          <StyledDOM.StyledAnimationHeading>
            Your report has been posted successfully.
          </StyledDOM.StyledAnimationHeading>
          <StyledDOM.StyledAnimationContainer>
            <Player autoplay loop src={reportAnimation}>
              <Controls
                visible={false}
                buttons={["play", "repeat", "frame", "debug"]}
              />
            </Player>
            <StyledDOM.StyledButtonContainer>
              <Button
                label="Home"
                isCancel={true}
                event={() => navigate("/candidates")}
              />
              <Button label="Logout" event={handleLogout} />
            </StyledDOM.StyledButtonContainer>
          </StyledDOM.StyledAnimationContainer>
        </StyledDOM.StyledAnimationMainContainer>
      ) : (
        <div className="report-container">
          <StyledDOM.StyledReportHeading>
            Daily Report
          </StyledDOM.StyledReportHeading>
          <StyledDOM.StyledPageSelectorContainer className="pageSelector">
            <PageSelector
              dropdownHeading="Reports"
              options={pageMenuOptions}
              onOptionSelect={handleOptionSelect}
            />
          </StyledDOM.StyledPageSelectorContainer>

          {DailyReport.map((data, index) => (
            <StyledDOM.StyledReportContainer
              key={index}
              className="report-container"
            >
              <StyledDOM.StyledReportInnerContainer className="report-inner">
                <StyledDOM.StyledInnerHeadings>
                  Report For
                </StyledDOM.StyledInnerHeadings>
                <p>
                  {" "}
                  : {""}
                  {data.reportFor}
                </p>
              </StyledDOM.StyledReportInnerContainer>
              <StyledDOM.StyledReportInnerContainer className="report-inner">
                <StyledDOM.StyledInnerHeadings>
                  Report Date
                </StyledDOM.StyledInnerHeadings>
                <p>
                  {" "}
                  : {""}
                  {formatDate(Date())}
                </p>
              </StyledDOM.StyledReportInnerContainer>
              <StyledDOM.StyledReportInnerContainer className="report-inner">
                <StyledDOM.StyledInnerHeadings>
                  Login IP
                </StyledDOM.StyledInnerHeadings>
                <p>
                  {" "}
                  : {""}
                  {data.loginIP}
                </p>
              </StyledDOM.StyledReportInnerContainer>
              <StyledDOM.StyledReportInnerContainer className="report-inner">
                <StyledDOM.StyledInnerHeadings>
                  Total Calls
                </StyledDOM.StyledInnerHeadings>
                <p>
                  {" "}
                  : {""}
                  {data.totalCalls}
                </p>
              </StyledDOM.StyledReportInnerContainer>
              <StyledDOM.StyledReportInnerContainer className="report-inner">
                <StyledDOM.StyledInnerHeadings>
                  In Time
                </StyledDOM.StyledInnerHeadings>
                <p>
                  {" "}   
                  : {""}
                  {data.inTime}
                </p>
              </StyledDOM.StyledReportInnerContainer>
              <StyledDOM.StyledReportInnerContainer className="report-inner">
                <StyledDOM.StyledInnerHeadings>
                  Out Time
                </StyledDOM.StyledInnerHeadings>
                <p>
                  {" "}
                  : {""}
                  {data.outTime}
                </p>
              </StyledDOM.StyledReportInnerContainer>
            </StyledDOM.StyledReportContainer>
          ))}
          {showEditor ? (
            viewMode ? (
              <StyledDOM.StyledRemarkContainer className="remarks-container">
                <StyledDOM.StyledSubHeadings>
                  Created Content :
                </StyledDOM.StyledSubHeadings>
                <StyledDOM.StyledContentContainer
                  dangerouslySetInnerHTML={{ __html: createdContent }}
                  className="createdContent"
                />
                {formik.touched.agree && formik.errors.agree && (
                  <StyledDOM.StyledErrorMessage>
                    {formik.errors.agree}
                  </StyledDOM.StyledErrorMessage>
                )}
                <DynamicCheckbox
                  label="I agree to verify the data accuracy"
                  labelStyle={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#000000",
                  }}
                  checked={formik.values.agree}
                  onChange={(e) =>
                    formik.setFieldValue("agree", e.target.checked)
                  }
                />
                <StyledDOM.StyledButtonContainer className="Button-container">
                  <Button
                    label="Back to Edit"
                    event={() => {
                      setViewMode(false);
                      formik.resetForm();
                    }}
                    isCancel={true}
                  />
                  <Button label="Submit" event={handleSubmit} />
                </StyledDOM.StyledButtonContainer>
              </StyledDOM.StyledRemarkContainer>
            ) : (
              <StyledDOM.StyledRemarkContainer className="remarks-container">
                <StyledDOM.StyledSubHeadings>
                  Remarks :
                </StyledDOM.StyledSubHeadings>
                <TextEditor
                  placeholder="Type the content here!!"
                  buttonList={buttons}
                  height="250px"
                  handleImageUploadBefore={handleImageUploadBefore}
                  onChange={(content) => {
                    formik.setFieldValue("remark", content);
                  }}
                  resetTrigger={editorResetTrigger}
                  error={formik.errors.remark && formik.touched.remark}
                  errorMessage={formik.errors.remark}
                />
                <StyledDOM.StyledButtonContainer className="Button-container">
                  <Button
                    label="Clear"
                    isCancel={true}
                    event={handleCleardata}
                  />
                  <Button label="Review & Confirm" event={handleReview} />
                </StyledDOM.StyledButtonContainer>
              </StyledDOM.StyledRemarkContainer>
            )
          ) : (
            <StyledDOM.StyledReviewButtonDiv>
              <StyledDOM.StyledACCURACYMessage>
                Review the above data for ACCURACY
              </StyledDOM.StyledACCURACYMessage>
              <StyledDOM.StyledUpdateButton
                label="Click to Type Today's Update"
                event={() => {
                  setShowEditor(true);
                }}
                isExport={true}
              />
            </StyledDOM.StyledReviewButtonDiv>
          )}
        </div>
      )}
    </>
  );
}

export default ReportsPage;
