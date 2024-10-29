import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadIcon from "../../../assets/image/Uploadicon.svg";
import FileUploadActiveIcon from "../../../assets/image/Uploadactive.svg";
import { displayFileName } from "../CommonFunctions/CommonFunctions";
const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
});

const StyledContainer = styled("div")({
  width: "100%",
  position: "relative",
});

const CancelIconWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.cancelIconTop};
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const FileUploadIcon = styled("img")({
  position: "absolute",
  top: "30%",
  left: "auto",
  right: "5px",
  transform: "translateY(-50%)",
  width: "25px",
  cursor: "pointer",
});

export const StyledInput = styled.input`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &::placeholder {
    opacity: ${(props) =>
      (props.isFocused || props.hasValue) && !props.showPlaceholder ? 0 : 1};
    transition: opacity 0.3s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const StyledLabel = styled.span`
  position: absolute;
  top: ${(props) => (props.isFocused || props.hasValue ? "0px" : "15px")};
  padding: ${(props) => (props.isFocused || props.hasValue ? "0 5px" : "0")};
  left: 8px;
  color: ${(props) =>
    props.isFocused || props.hasValue ? props.labelColor : "transparent"};
  font-size: ${(props) =>
    props.isFocused || props.hasValue ? "12px" : "16px"};
  transform: ${(props) =>
    props.isFocused || props.hasValue ? "translateY(-50%)" : "none"};
  cursor: text;
  transition: top 0.3s, font-size 0.3s, transform 0.3s, color 0.3s;
  pointer-events: none;
  background-color: ${(props) =>
    props.isFocused || props.hasValue ? props.backgroundColor : "transparent"};
  ${(props) => !props.hasValue && "display: none;"}
  transition: display 0.3s, font-size 0.3s, transform 0.3s, color 0.3s;
`;

function FileUploaderTextfield(props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const {
    label = "",
    containerClassName = "input-field",
    containerStyle = {},
    onChange = () => {},
    error = "",
    errorMessage = "",
    type = "text",
    placeholder = "",
    name = "",
    value = [],
    // onBlur = () => { },
    className = "",
    errorClassName = "",
    readOnly = true,
    style = {},
    cancelIconTop = "45%",
    Uploadiconstyle = {},
    backgroundColor = "white",
    labelColor = "black",
    activeicon = false,
  } = props;

  const [fileNames, setFileNames] = useState(value);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFileNames(value);
  }, [value]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newFileNames = Array.from(files).map((file) =>
        displayFileName(file.name)
      );
      setFileNames(newFileNames);
      onChange(newFileNames);
    } else {
      setFileNames([]);
      onChange([]);
    }
  };

  const handleClearFiles = () => {
    fileInputRef.current.value = "";
    setFileNames([]);
    onChange([]);
  };

  return (
    <StyledContainer className={containerClassName} style={containerStyle}>
      <StyledInput
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        onClick={() => fileInputRef.current.click()}
        className={className}
        errorClassName={errorClassName}
        onFocus={handleClick}
        onBlur={handleBlur}
        style={style}
        hasValue={fileNames.length > 0}
        showPlaceholder={!!placeholder}
        isFocused={document.activeElement === inputRef.current && isFocused}
      />
      <StyledLabel
        onClick={handleClick}
        isFocused={document.activeElement === inputRef.current && isFocused}
        hasValue={fileNames.length > 0}
        backgroundColor={backgroundColor}
        labelColor={labelColor}
      >
        {label}
      </StyledLabel>
      {fileNames.length === 0 && (
        <FileUploadIcon
          src={activeicon ? FileUploadActiveIcon : UploadIcon}
          alt="Upload Icon"
          style={Uploadiconstyle}
          onClick={() => fileInputRef.current.click()}
        />
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {error && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      {fileNames.length > 0 && (
        <CancelIconWrapper
          onClick={handleClearFiles}
          cancelIconTop={cancelIconTop}
        >
          <CancelIcon />
        </CancelIconWrapper>
      )}
    </StyledContainer>
  );
}

export default FileUploaderTextfield;
