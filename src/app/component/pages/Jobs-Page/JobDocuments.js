import React, { useRef, useState, useEffect, useContext } from "react";
import * as StyleDOM from "../EmployeeInfo/Tracking.jsx";
import Button from "../../../common/Button/Button.js";
import { useFormik } from "formik";
import FileDropIcon from "../../../../assets/image/file-uploadIcon.svg";
import {
  formatDate,
  handleClear,
  handleIcon,
  handleFileSelect,
  handleCustomTrim,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar.js";
import { CustomDragAndDrop } from "../../../common/CommonFunctions/CommonFunctions.js";
import { ReactComponent as DeleteIcon } from "../../../../assets/image/DeleteIcon_Active.svg";
import { DynamicContext } from "../../../context/DynamicContext.js";
import DynamicSkeleton from "../../../common/Skeleton/Skeleton.jsx";
function JobDocuments(props) {
  const ref = useRef(null);
  const [documentTracking, setDocumentTracking] = useState([]);
  const { onJobsContainerLengthChange } = props || {};
  const jobsContainerLength = documentTracking.length;
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onJobsContainerLengthChange(jobsContainerLength);
  }, [jobsContainerLength, onJobsContainerLengthChange]);

  const handleFileUpload = () => {
    ref.current.click();
  };

  const handleDelete = (index) => {
    setDocumentTracking((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails.splice(index, 1);
      return updatedDetails;
    });
  };

  const AllowedFiles = (files) => {
    const validFiles = handleFileSelect(
      files,
      [".pdf", ".docx", ".doc", ".txt", ".xls", ".xlsx"],
      10
    );
    if (validFiles.length > 0) {
      const newFilesData = validFiles.map((file) => ({
        fileName: file.name,
        description: "",
      }));
      return newFilesData;
    } else {
      Toast(
        "warning",
        "Please upload files with valid formats: PDF, DOC, TXT, XLS, XLSX."
      );
      return [];
    }
  };

  const handleDropFiles = (files) => {
    const newFilesData = AllowedFiles(files);
    if (newFilesData.length > 0) {
      formik.setFieldValue("jobsContainer", newFilesData);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.currentTarget.files;
    const newFilesData = AllowedFiles(files);
    if (newFilesData.length > 0) {
      formik.setFieldValue("jobsContainer", newFilesData);
    }
  };

  // const trimDescriptions = (jobsContainer) => {
  //   return jobsContainer.map((job) => ({
  //     ...job,
  //     description: job.description.trim(),
  //   }));
  // };
  const trimDescriptions = (jobsContainer) => {
    return jobsContainer.map((job) => {
      return handleCustomTrim(job);
    });
  };
  const formik = useFormik({
    initialValues: {
      jobsContainer: [{ fileName: "", description: "" }],
    },
    onSubmit: (values) => {
      const trimmedValues = handleCustomTrim(values);
      const trimmedJobsContainer = trimDescriptions(
        trimmedValues.jobsContainer
      );
      if (trimmedJobsContainer.every((file) => !file.fileName)) {
        Toast("warning", "Please upload at least one file");
      } else {
        setDocumentTracking((prevDetails) => {
          const updatedDetails = [...prevDetails, ...trimmedJobsContainer];
          console.log(updatedDetails);
          return updatedDetails;
        });
        formik.setFieldValue("jobsContainer", [
          { fileName: "", description: "" },
        ]);
      }
    },
  });

  const {
    isDragging,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = CustomDragAndDrop(handleDropFiles, false);

  console.log("JobsDocuments", documentTracking);

  return (
    <>
      <StyleDOM.TrackingMainContainer className="trackingmain-container">
        <StyleDOM.TrackingUpperOuterContainer className="tracking-outercontainer">
          <StyleDOM.DocumentHeading>Upload Files</StyleDOM.DocumentHeading>
          <StyleDOM.TrackingUpperContainer className="trackingupper-container">
            <StyleDOM.DocumentLeftContainer className="documentleft-container">
              <StyleDOM.FileDropMainContainer>
                <StyleDOM.FileDropContainer
                  onClick={handleFileUpload}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  isDragging={isDragging}
                  className="FileDrop-container"
                >
                  <img src={FileDropIcon} alt="File-uploadicon" />
                  <StyleDOM.FileDropMessage>
                    {isDragging
                      ? "Drop your files here"
                      : "Drag and Drop your files"}
                  </StyleDOM.FileDropMessage>
                  <input
                    accept=".pdf,.docx,.doc,.txt"
                    name="fileName"
                    type="file"
                    ref={ref}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                </StyleDOM.FileDropContainer>
                <StyleDOM.FileName>
                  {formik.values.jobsContainer.map((file, index) => (
                    <div key={index}>
                      {file.fileName && (
                        <>
                          Uploaded Filename: <strong>{file.fileName}</strong>
                        </>
                      )}
                    </div>
                  ))}
                </StyleDOM.FileName>
              </StyleDOM.FileDropMainContainer>
              <StyleDOM.NoteContainer className="note-container">
                <StyleDOM.NoteHeading>Note:</StyleDOM.NoteHeading>
                <StyleDOM.NoteListContainer className="NoteList-container">
                  <StyleDOM.NoteList>
                    The file size should not exceed 10 mb
                  </StyleDOM.NoteList>
                  <StyleDOM.NoteList>
                    You can upload up to 10 files at a time
                  </StyleDOM.NoteList>
                  <StyleDOM.NoteList>
                    Supported Formats: PDF, DOC, TXT, XLS
                  </StyleDOM.NoteList>
                </StyleDOM.NoteListContainer>
              </StyleDOM.NoteContainer>
            </StyleDOM.DocumentLeftContainer>
            <StyleDOM.DocumentRightContainer className="right-container">
              <div>
                <StyleDOM.DescriptionHeading>
                  Description{" "}
                  <StyleDOM.DescriptionSpan>
                    (Optional)
                  </StyleDOM.DescriptionSpan>
                </StyleDOM.DescriptionHeading>
                <StyleDOM.DocumentDescription className="document-description">
                  <StyleDOM.DocumentDescriptionInnerDiv>
                    {formik.values.jobsContainer.map((file, index) => (
                      <StyleDOM.DescriptionTextBox
                        key={index}
                        name={`jobsContainer[${index}].description`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={file.description}
                        backgroundColor="transparent"
                      ></StyleDOM.DescriptionTextBox>
                    ))}
                  </StyleDOM.DocumentDescriptionInnerDiv>

                  <StyleDOM.StyledDocumentaButtonDiv>
                    <Button
                      label="Clear"
                      isCancel={true}
                      event={() => handleClear(formik)}
                    />
                    <Button label="Upload" event={formik.handleSubmit} />
                  </StyleDOM.StyledDocumentaButtonDiv>
                </StyleDOM.DocumentDescription>
              </div>
            </StyleDOM.DocumentRightContainer>
          </StyleDOM.TrackingUpperContainer>
        </StyleDOM.TrackingUpperOuterContainer>
      </StyleDOM.TrackingMainContainer>
      <StyleDOM.ContentMainContainer className="contentMain-Container">
        {skeletonLoading ? (
          Array(documentTracking.length || 1)
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
        ) : (
          <StyleDOM.DocumentLowerContainer className="document-lowercontainer">
            {documentTracking.map((jobs, index) => (
              <StyleDOM.DocumentMainInnerContainer
                className="content-innercontainer"
                key={index}
              >
                <StyleDOM.ContentDocumentContainer className="content-documentcontainer">
                  <StyleDOM.ContentDocumentDescription className="content-description">
                    <StyleDOM.PdfIcon src={handleIcon(jobs.fileName)} />
                    <StyleDOM.ContentItems className="content-items">
                      <StyleDOM.ContentHeading>
                        {jobs.fileName}
                      </StyleDOM.ContentHeading>
                      <StyleDOM.ContentDate>
                        {formatDate(new Date())}
                      </StyleDOM.ContentDate>
                    </StyleDOM.ContentItems>
                    <StyleDOM.DeleteIcondiv className="delete-icon">
                      <DeleteIcon onClick={() => handleDelete(index)} />
                    </StyleDOM.DeleteIcondiv>
                  </StyleDOM.ContentDocumentDescription>
                  <StyleDOM.ContentInnerDescription
                    className={
                      jobs.description ? "content-innerdescriptions" : ""
                    }
                  >
                    {jobs.description && (
                      <StyleDOM.ContentParagraph>
                        {jobs.description}
                      </StyleDOM.ContentParagraph>
                    )}
                  </StyleDOM.ContentInnerDescription>
                </StyleDOM.ContentDocumentContainer>
              </StyleDOM.DocumentMainInnerContainer>
            ))}
          </StyleDOM.DocumentLowerContainer>
        )}
      </StyleDOM.ContentMainContainer>
    </>
  );
}

export default JobDocuments;
