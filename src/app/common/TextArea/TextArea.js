import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
});
export const StyledContainter = styled("div")({
  width: "100%",
  position: "relative",
});
export const StyledTextarea = styled.textarea`
  width: 100%;
  rows: ${(props) => props.rows || 3};
  &::placeholder {
    opacity: ${(props) =>
    props.isFocused || props.hasValue || props.showPlaceholder ? 0 : 1};
    transition: opacity 0.3s;
  }
  &:focus {
    outline: none;
  }
`;

export const StyledLabel = styled.span`
  position: absolute;
  top: ${(props) => (props.isFocused || props.hasValue ? "0px" : "15px")};
  padding: ${(props) => (props.isFocused || props.hasValue ? "0 5px" : "0")};
  left: 8px;
  color: ${(props) =>
    props.isFocused || props.hasValue ? "black" : "transparent"};
  font-size: ${(props) =>
    props.isFocused || props.hasValue ? "12px" : "16px"};
  transform: ${(props) =>
    props.isFocused || props.hasValue ? "translateY(-50%)" : "none"};
  cursor: text;
  transition: top 0.3s, font-size 0.3s, transform 0.3s, color 0.3s;
  pointer-events: none;
  background-color: ${(props) =>
    props.isFocused || props.hasValue ? "white" : "transparent"};
`;
export const StyledAsterisk = styled.span`
  color: red;
  margin-left: ${(props) =>
    props.isFocused || props.hasValue ? "1px" : "-2px"};
  position: absolute;
  top: ${(props) => (props.isFocused || props.hasValue ? "-2px" : "-6px")};
`;
function TextArea(props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const {
    placeholder = "",
    name = "",
    value = "",
    onChange = () => "",
    // onBlur = () => "",
    className = "",
    id = "",
    label = "",
    // labelFor = "",
    // labelClassName = "label",
    error = "",
    errorMessage = "",
    errorClassName = "",
    required = false,
    containerClassName = "input-field",
    containerStyle = {},
    autoComplete = "",
    readOnly = false,
    style = {},
    rows = {},
  } = props;
  return (
    <>
      <StyledContainter className={containerClassName} style={containerStyle}>
        <StyledTextarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleClick}
          onBlur={handleBlur}
          className={className}
          id={id}
          required={required}
          autoComplete={autoComplete}
          readOnly={readOnly}
          style={style}
          ref={inputRef}
          isFocused={document.activeElement === inputRef.current && isFocused}
          hasValue={value !== ""}
          showPlaceholder={!placeholder}
          rows={rows}
        />
        <StyledLabel
          onClick={handleClick}
          isFocused={document.activeElement === inputRef.current && isFocused}
          hasValue={value !== ""}
        >
          {label}
          {required && (
            <StyledAsterisk isFocused={isFocused} hasValue={value !== ""}>
              *
            </StyledAsterisk>
          )}
        </StyledLabel>

        {error && (
          <StyledErrorMessage className={errorClassName}>
            {errorMessage}
          </StyledErrorMessage>
        )}
      </StyledContainter>
    </>
  );
}

export default TextArea;
