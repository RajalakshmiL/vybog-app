import React, { useState, useRef, useContext } from "react";
import { Toast } from "../../../../common/Toast-Snackbar/ToastSnackbar";
import Button from "../../../../common/Button/Button";
import fileUploadIcon from "../../../../../assets/image/file-uploadIcon.svg";
import cancelIcon from "../../../../../assets/image/cancel-icon.svg";
import backArrowIcon from "../../../../../assets/image/back-arrow.svg";
import * as StyledDOM from "./style";
import {
  CustomDragAndDrop,
  handleIcon,
  handleFileSelect,
  displayFileName,
  // handleFileNameResize,
  highlightText,
} from "../../../../common/CommonFunctions/CommonFunctions";
import { useNavigate } from "react-router-dom";
import { DynamicContext } from "../../../../context/DynamicContext";
import importNotes from "../../../../../assets/json/staticData.json";
function CandidateImport() {
  const { setSelectedOption } = useContext(DynamicContext);
  const { staticData = {} } = importNotes || {};
  const { CandidateImportNotes = [] } = staticData || {};
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  // const fileNameDivRef = useRef(null);
  // const [fileNameDivWidth, setFileNameDivWidth] = useState(0);
  // useEffect(() => {
  //   const resizeHandler = () =>
  //     handleFileNameResize(fileNameDivRef, setFileNameDivWidth);
  //   resizeHandler();

  //   window.addEventListener("resize", resizeHandler);
  //   return () => window.removeEventListener("resize", resizeHandler);
  // }, [files]);

  const validateFiles = (uploadedFiles) => {
    const validFiles = [];
    const errors = [];
    const maxFileSize = 2 * 1024 * 1024;
    const allowedFormats = [".xls", ".xlsx"];

    for (const file of uploadedFiles) {
      const fileExtension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!allowedFormats.includes(fileExtension)) {
        errors.push(
          `The uploaded file is in an incorrect format.please upload a valid format file.`
        );
      } else if (file.size > maxFileSize) {
        errors.push(`${file.name} exceeds the maximum file size of 2 MB.`);
      } else {
        validFiles.push(file);
      }
    }

    return { validFiles, errors };
  };

  const handleUploadFiles = (newFiles) => {
    const { validFiles, errors } = validateFiles(newFiles);
    const uniqueNewFiles = validFiles.filter(
      (newFile) =>
        !files.some((existingFile) => existingFile.name === newFile.name)
    );

    if (uniqueNewFiles.length < validFiles.length) {
      errors.push("Duplicate files are not allowed.");
    }

    if (errors.length > 0) {
      Toast("error", errors.join(" "));
    }

    setFiles([...files, ...uniqueNewFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileDragUpload = (droppedFiles) => {
    const newFiles = handleFileSelect(droppedFiles, [".xls", ".xlsx"], 10);
    handleUploadFiles(newFiles);
  };

  const handleFileInputChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = handleFileSelect(uploadedFiles, [".xls", ".xlsx"], 10);
    handleUploadFiles(newFiles);
    // fileInputRef.current.value = "";
  };

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
  } = CustomDragAndDrop(handleFileDragUpload, true);

  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (files.length === 0) {
      Toast("error", "No files to upload.");
      return;
    }
    if (files.length > 0) {
      navigate("/candidate-field-mapping");
    }
    console.log("Candidate Import ", files);
    Toast("success", "Files uploaded successfully");
  };

  const handleBack = () => {
    setSelectedOption(false);
    navigate("/candidates");
  };
  return (
    <>
      <StyledDOM.StyledHeaderOuterDiv className="header-container">
        <StyledDOM.StyeldHeader2> Import Candidate</StyledDOM.StyeldHeader2>
        <StyledDOM.StyledBackHeader3 onClick={handleBack}>
          <img alt="back" src={backArrowIcon} onClick={handleBack} />
          Back to Candidates list
        </StyledDOM.StyledBackHeader3>
      </StyledDOM.StyledHeaderOuterDiv>
      <StyledDOM.StyledOuterDiv className="fileupload-outerdiv">
        <StyledDOM.StyledFileOuterContainer className="fileupload-container">
          <StyledDOM.StyledHeader3>Upload Files</StyledDOM.StyledHeader3>
          <StyledDOM.StyledFileUploadContainer
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickUpload}
            isDragging={isDragging}
          >
            <StyledDOM.StyledImgContainer className="img-container">
              <StyledDOM.StyledImg alt="file-upload" src={fileUploadIcon} />
              <p>
                {isDragging
                  ? "Drop your files here"
                  : "Drag and Drop your files"}
              </p>
            </StyledDOM.StyledImgContainer>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              multiple
              accept=".xls,.xlsx"
            />
          </StyledDOM.StyledFileUploadContainer>
          <StyledDOM.StyledDetailsContainer className="details-container">
            <StyledDOM.StyledPTag>
              Maximum File Size : 2 MB
            </StyledDOM.StyledPTag>
            <StyledDOM.StyledPTag>
              Supported Format : XLS, XLSX
            </StyledDOM.StyledPTag>
          </StyledDOM.StyledDetailsContainer>
          <StyledDOM.StyledButtonContainer className="button-container">
            <Button label="Clear" isCancel={true} event={() => setFiles([])} />
            <Button label="Upload" event={handleUpload} />
          </StyledDOM.StyledButtonContainer>
        </StyledDOM.StyledFileOuterContainer>
        {files.length > 0 ? (
          <StyledDOM.StyledMainFileContainer className="uploadfiles-outer">
            {files.map((file, index) => (
              <StyledDOM.StyledUploadfilesContainer
                key={index}
                className="Uploadfiles-container"
                // ref={fileNameDivRef}
              >
                <StyledDOM.StyledFileNameDiv className="file-name">
                  <img
                    alt="file"
                    src={handleIcon(file.name)}
                    style={{ width: "30px" }}
                  />
                  {/* {fileNameDivWidth < 450
                    ? displayFileName(file.name)
                    : file.name}{" "} */}
                  {displayFileName(file.name)}
                </StyledDOM.StyledFileNameDiv>
                <StyledDOM.StyledCancelIcon
                  onClick={() => handleDelete(index)}
                  alt="cancel"
                  src={cancelIcon}
                  className="cancel-icon"
                />
              </StyledDOM.StyledUploadfilesContainer>
            ))}
          </StyledDOM.StyledMainFileContainer>
        ) : (
          <StyledDOM.StyledMainFileContainer className="uploadfiles-outer">
            <StyledDOM.StyledImportentContainer className="CandidateImportNotes">
              <StyledDOM.StyledListItemHeader>
                Important notes
              </StyledDOM.StyledListItemHeader>
              {CandidateImportNotes.map((data, index) => (
                <StyledDOM.StyledUlItems key={index}>
                  <StyledDOM.StyledListItems isSpecial={index === 7}>
                    {highlightText(data.notes)}
                  </StyledDOM.StyledListItems>
                </StyledDOM.StyledUlItems>
              ))}
            </StyledDOM.StyledImportentContainer>
          </StyledDOM.StyledMainFileContainer>
        )}
      </StyledDOM.StyledOuterDiv>
    </>
  );
}

export default CandidateImport;
