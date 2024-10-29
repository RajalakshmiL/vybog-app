import React, { useState, useRef, useEffect, useContext } from "react";
import * as StyledDOM from "../ImportCandidate/style";
import Button from "../../../../common/Button/Button";
import { Toast } from "../../../../common/Toast-Snackbar/ToastSnackbar";
import fileUploadIcon from "../../../../../assets/image/file-uploadIcon.svg";
import cancelIcon from "../../../../../assets/image/cancel-icon.svg";
import backArrowIcon from "../../../../../assets/image/back-arrow.svg";
import {
  CustomDragAndDrop,
  handleIcon,
  handleFileSelect,
  displayFileName,
  Popupscroll,
  highlightText,
} from "../../../../common/CommonFunctions/CommonFunctions";
import { useNavigate } from "react-router-dom";
import {
  RESUME_PARSER_BASE_URL,
  PARSED_RESUME_URL,
  PROCESS_UPLOAD_FILE,
  WEB_SOCKET_URL,
} from "../../../../../helper/url_helper";
import Loader from "../../../../common/Pre-Loader/Loader";
import { DynamicContext } from "../../../../context/DynamicContext";
import importantNotes from "../../../../../assets/json/staticData.json";
import ModalPopup from "../../../../common/Modal-Popup/ModalPopup";
function ResumeUpload() {
  const fileInputRef = useRef(null);
  const { setSelectedOption, loading, setLoading } = useContext(DynamicContext);
  const navigate = useNavigate();
  const { staticData = {} } = importantNotes || {};
  const { ResumeUploadNotes = [] } = staticData || {};
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [UploadedResumes, setUploadedResumes] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  console.log("uploadedFileNames", uploadedFileNames);

  const handleReuploadRestriction = () => {
    setUploadedResumes([]);
    setUploadedFileNames([]);
    setParsedData([]);
    setSuccessMessages([]);
    setErrorMessages([]);
    setIsUploading(false);
    setLoading(false);
    window.location.reload();
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };
  const handleShowPopup = () => {
    if (UploadedResumes.length > 0) {
      setShowPopup(true);
    } else {
      Toast("error", "Please upload a file");
    }
    if (successMessages.length > 0 || errorMessages.length > 0) {
      setShowPopup(false);
      handleReuploadRestriction();
    }
  };
  const handlesubmit = async () => {
    if (UploadedResumes.length > 0) {
      setShowPopup(false);
      setIsUploading(true);
      setLoading(true);
    } else {
      Toast("error", "Please upload a file");
    }
    if (successMessages.length > 0 || errorMessages.length > 0) {
      handleReuploadRestriction();
    }
    const files = UploadedResumes;
    const fileNames = UploadedResumes.map((file) => file.name);
    console.log("files:", files);
    const presignedUrls = await getPresignedUploadUrls(fileNames);
    console.log("presignedUrls:", presignedUrls);

    const uploadPromises = files
      .filter((file, index) => presignedUrls[index])
      .map((file, index) => {
        console.log("uploadPromises files:", file.name);
        const presignedUrl = presignedUrls[index];
        return fetch(presignedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "application/octet-stream",
          },
          mode: "cors",
        })
          .then((response) => {
            if (response.ok) {
              console.log("presignedUrls response:", file.name);
              processUploadedFile(file.name);
            } else {
              alert(`File ${file.name} upload failed.`);
            }
          })
          .catch((error) => {
            console.error("Upload error:", error);
          });
      });

    await Promise.all(uploadPromises);
  };

  const getPresignedUploadUrls = async (files) => {
    const token = localStorage.getItem("token");
    const requestBody = JSON.stringify({ FileNames: files });
    try {
      const response = await fetch(RESUME_PARSER_BASE_URL + PARSED_RESUME_URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const data = await response.json();
      console.log(
        "getPresignedUploadUrls presigned urls:",
        data.PresignedUploadURLs
      );
      return data.PresignedUploadURLs;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const processUploadedFile = async (fileName) => {
    let requestUrl = RESUME_PARSER_BASE_URL + PROCESS_UPLOAD_FILE;
    const token = localStorage.getItem("token");
    const requestBody = JSON.stringify({ fileNames: [fileName] });
    console.log("processUploadedFile requestBody:", requestBody);

    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const contentType = response.headers.get("Content-Type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const jsonResponse = await response.json();
          console.log(`File processing initiated successfully: ${fileName}`);
          console.log(`Response for ${fileName}:`, jsonResponse);
          setMessages("File processing initiated successfully");
        } else {
          const textResponse = await response.text();
          console.log(`File processing initiated successfully: ${fileName}`);
          console.log(`Response for ${fileName}:`, textResponse);
          setMessages("File processing initiated successfully ");
        }
      } else {
        const errorText = await response.text();
        console.log("Response:", errorText);
      }
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const validateBasicInfo = (basicInfo) => {
    const { Name = "", PhoneNumber = "", Email = "" } = basicInfo || {};
    let nonEmptyFields = 0;
    if (Name.trim()) nonEmptyFields++;
    if (PhoneNumber.trim()) nonEmptyFields++;
    if (Email.trim()) nonEmptyFields++;

    return nonEmptyFields >= 2;
  };

  useEffect(() => {
    if (UploadedResumes.length > 0) {
      const token = localStorage.getItem("token");
      const wsProtocol = "wss://";
      const wsUrl = `${wsProtocol}${WEB_SOCKET_URL}/ws?token=${encodeURIComponent(
        "Bearer " + token
      )}`;

      const ws = new WebSocket(wsUrl);
      setSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        const messageParts = event.data.split("|");
        if (messageParts.length >= 2) {
          // const topic = messageParts[0];
          let data = messageParts[1].replace(/^"|"$/g, "");

          try {
            const jsonData = JSON.parse(data);
            const { parsed_resume = {} } = jsonData || {};
            const { BasicInfo = {} } = JSON.parse(parsed_resume) || {};

            console.log(`Received JSON Data:${jsonData.name}`, jsonData);

            const isValidFile = validateBasicInfo(BasicInfo);
            if (isValidFile) {
              setParsedData((prevResumes) => {
                const isExisting = prevResumes.some(
                  (resume) => resume.id === jsonData.id
                );
                return isExisting ? prevResumes : [...prevResumes, jsonData];
              });
              if (jsonData.name) {
                setUploadedFileNames((prevFileNames) => {
                  return !prevFileNames.includes(jsonData.name)
                    ? [...prevFileNames, jsonData.name]
                    : prevFileNames;
                });
              }
              setSuccessMessages((prevMessages) => [
                ...prevMessages,
                `Candidate created successfully for ${jsonData.name}`,
              ]);
            } else {
              setErrorMessages((prevMessages) => [
                ...prevMessages,
                `${jsonData.name} : Unsupported file format or invalid file`,
              ]);
            }
          } catch (error) {
            console.log("[Received WebSocket Message] \n" + event.data);
            setErrorMessages((prevMessages) => [
              ...prevMessages,
              `Error: ${event.data}`,
            ]);
          }
        } else {
          if (messageParts[0].includes("process-resume-blob-err")) {
            const [...rest] = messageParts;
            const errorMessageParts = rest
              .join("|")
              .replace(/^"|"$/g, "")
              .split("|");
            if (errorMessageParts.length >= 2) {
              const fileName = errorMessageParts[0].trim();
              const message = errorMessageParts[1].trim();
              setErrorMessages((prevMessages) => [
                ...prevMessages,
                `${fileName} : ${message}`,
              ]);
            } else {
              setErrorMessages((prevMessages) => [
                ...prevMessages,
                ` Error :${messageParts}`,
              ]);
              console.log("Error: " + messageParts);
            }
          }
          console.log("[Received WebSocket Message] \n" + event.data);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.onerror = (error) => {
        const errorMessage = error?.message || "Unknown WebSocket error";
        console.error("WebSocket error:", errorMessage);
      };

      return () => {
        ws.close();
      };
    }
  }, [
    UploadedResumes,
    messages,
    setParsedData,
    setUploadedFileNames,
    uploadedFileNames,
  ]);

  const handleDelete = (index) => {
    const newFiles = [...UploadedResumes];
    newFiles.splice(index, 1);
    setUploadedResumes(newFiles);
  };

  const handleCancel = () => {
    setUploadedResumes([]);
    setErrorMessages([]);
    setSuccessMessages([]);
  };
  const handleFileDragUpload = (droppedFiles) => {
    if (isUploading) {
      Toast("error", "Please wait, file processing is still in progress.");
      return;
    }
    const newFiles = handleFileSelect(droppedFiles, [".pdf"], 10);
    setUploadedResumes((prevFiles) => {
      const existingFileNames = new Set(prevFiles.map((file) => file.name));
      const duplicateFiles = newFiles.filter((file) =>
        existingFileNames.has(file.name)
      );
      const uniqueFiles = newFiles.filter(
        (file) => !existingFileNames.has(file.name)
      );

      if (duplicateFiles.length > 0) {
        Toast("error", "There are no duplicate files accepted.");
      }

      return [...prevFiles, ...uniqueFiles];
    });
  };

  const handleFileInputChange = (e) => {
    if (isUploading) {
      Toast("error", "Please wait, file processing is still in progress.");
      return;
    }
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = handleFileSelect(uploadedFiles, [".pdf"], 10);
    setUploadedResumes((prevFiles) => {
      const existingFileNames = new Set(prevFiles.map((file) => file.name));
      const duplicateFiles = newFiles.filter((file) =>
        existingFileNames.has(file.name)
      );
      const uniqueFiles = newFiles.filter(
        (file) => !existingFileNames.has(file.name)
      );

      if (duplicateFiles.length > 0) {
        Toast("error", "There are no duplicate files accepted.");
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return [...prevFiles, ...uniqueFiles];
    });
  };

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isDragging,
  } = CustomDragAndDrop(handleFileDragUpload, true);
  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (
      uploadedFileNames.length + errorMessages.length ===
        UploadedResumes.length &&
      UploadedResumes.length > 0
    ) {
      setLoading(false);
      setSelectedOption(false);
      setIsUploading(false);
      Toast("success", "Files uploaded successfully");
      // navigate("/candidates");
    }
  }, [
    UploadedResumes,
    uploadedFileNames,
    errorMessages,
    navigate,
    setLoading,
    setSelectedOption,
  ]);
  const handleBack = () => {
    setSelectedOption(false);
    navigate("/candidates");
  };
  Popupscroll(showPopup);
  return (
    <>
      {showPopup ? (
        <ModalPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onConfirm={handlesubmit}
          title="Confirmation"
          message="If the email or contact already exists, create a new candidate or replace the current one. "
          confirmLabel="Create"
          cancelLabel="Replace"
          showPlayer={false}
          normalButton={true}
        />
      ) : null}
      <StyledDOM.StyledHeaderOuterDiv
        className="header-container"
        // loading={loading ? "true" : undefined}
      >
        <StyledDOM.StyeldHeader2>Upload Resume</StyledDOM.StyeldHeader2>
        <StyledDOM.StyledBackHeader3 onClick={handleBack}>
          <img alt="back" src={backArrowIcon} />
          Back to Candidates list
        </StyledDOM.StyledBackHeader3>
      </StyledDOM.StyledHeaderOuterDiv>
      <StyledDOM.StyledOuterDiv>
        <StyledDOM.StyledFileOuterContainer className="file-upload-outer-div">
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
              accept=".pdf"
              // disabled={isUploading}
            />
          </StyledDOM.StyledFileUploadContainer>
          <StyledDOM.StyledDetailsContainer className="details-container">
            <StyledDOM.StyledPTag>
              Maximum File Size: 10 MB
            </StyledDOM.StyledPTag>
            <StyledDOM.StyledPTag>Supported Format: PDF</StyledDOM.StyledPTag>
          </StyledDOM.StyledDetailsContainer>
          <StyledDOM.StyledButtonContainer className="button-container">
            <Button
              label="Clear"
              isCancel={true}
              event={handleCancel}
              disabled={isUploading ? "disabled" : ""}
              loading={isUploading ? true : false}
            />
            <StyledDOM.StyledUploadButton
              label={isUploading ? "Uploading..." : "Upload"}
              event={handleShowPopup}
              disabled={isUploading ? "disabled" : ""}
              loading={isUploading ? true : false}
            />
          </StyledDOM.StyledButtonContainer>
        </StyledDOM.StyledFileOuterContainer>
        {UploadedResumes.length > 0 ? (
          <StyledDOM.StyledMainFileContainer className="uploadfiles-outer">
            {UploadedResumes.map((file, index) => (
              <StyledDOM.StyledUploadfilesContainer
                key={index}
                className="Uploadfiles-container"
              >
                <StyledDOM.StyledFileNameDiv className="file-name">
                  <img
                    alt="file"
                    src={handleIcon(file.name)}
                    style={{ width: "30px" }}
                  />
                  {displayFileName(file.name)}
                </StyledDOM.StyledFileNameDiv>
                <StyledDOM.StyledCancelIcon
                  onClick={() => (isUploading ? null : handleDelete(index))}
                  isUploading={isUploading}
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
                Supported formats
              </StyledDOM.StyledListItemHeader>
              <StyledDOM.StyledUlItems>
                {" "}
                <StyledDOM.StyledListItems>
                  You can choose to use the .pdf, .doc, or .docx formats, and
                  import up to 20 files only.
                </StyledDOM.StyledListItems>
              </StyledDOM.StyledUlItems>
              <StyledDOM.StyledListItemHeader>
                Important notes
              </StyledDOM.StyledListItemHeader>
              {ResumeUploadNotes.map((data, index) => (
                <StyledDOM.StyledUlItems key={index}>
                  <StyledDOM.StyledListItems>
                    {highlightText(data.notes)}
                  </StyledDOM.StyledListItems>
                </StyledDOM.StyledUlItems>
              ))}
            </StyledDOM.StyledImportentContainer>
          </StyledDOM.StyledMainFileContainer>
        )}
      </StyledDOM.StyledOuterDiv>
      {(successMessages.length > 0 || errorMessages.length > 0) && (
        <div className="messages-container">
          {successMessages.length > 0 && (
            <StyledDOM.StyledSuccessParseMessage className="success-messages">
              {successMessages.map((msg, index) => (
                <p key={`success-${index}`}>{msg}</p>
              ))}
            </StyledDOM.StyledSuccessParseMessage>
          )}
          {errorMessages.length > 0 && (
            <StyledDOM.StyledErrorParseMessage className="error-messages">
              {errorMessages.map((msg, index) => (
                <p key={`error-${index}`}>{msg}</p>
              ))}
            </StyledDOM.StyledErrorParseMessage>
          )}
        </div>
      )}
      {loading && (
        <Loader loaderContentText="Processing data" dataLoader="true" />
      )}
    </>
  );
}

export default ResumeUpload;
