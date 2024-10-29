import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export const StyledErrorMessage = styled.div({
  color: "red",
  fontSize: "14px",
});

export const StyledContainer = styled.div({
  width: "100%",
  resize: "none",
});

const TextEditor = (props) => {
  const {
    buttonList = [],
    editorMinHeight = "",
    placeholder = "",
    onChange = () => {},
    onBlur = () => {},
    className = "",
    id = "",
    error = "",
    width = "",
    errorMessage = "",
    errorClassName = "",
    required = true,
    containerClassName = "input-field",
    containerStyle = {},
    readOnly = false,
    disable = false,
    style = {},
    autoFocus = false,
    height = "",
    resetTrigger = false,
    value = "",
    ...otherProps
  } = props;

  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    if (resetTrigger) {
      setContent("");
    }
  }, [resetTrigger]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
    onChange(newContent);
  };

  const options = {
    buttonList: buttonList,
    minHeight: editorMinHeight,
  };

  return (
    <StyledContainer className={containerClassName} style={containerStyle}>
      <SunEditor
        setOptions={options}
        placeholder={placeholder}
        setContents={content}
        onChange={handleContentChange}
        onBlur={onBlur}
        className={className}
        id={id}
        required={required}
        style={style}
        {...otherProps}
        width={width}
        disable={disable}
        height={height}
        autoFocus={autoFocus}
        readOnly={readOnly}
      />
      {error && (
        <StyledErrorMessage className={errorClassName}>
          {errorMessage}
        </StyledErrorMessage>
      )}
    </StyledContainer>
  );
};

export default TextEditor;
