import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import eyeopen from "../../../assets/image/eyeopen.svg";
import eyesclose from "../../../assets/image/eyesclose.svg";
import "../../common/common.css";

export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
  marginTop: "6px",
});

export const StyledInput = styled.input`
  width: 100%;
  &::placeholder {
    opacity: ${(props) =>
    props.isFocused || props.hasValue || props.showPlaceholder ? 0 : 1};
    transition: opacity 0.3s;
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
`;

export const StyledEyeIconImg = styled("img")`
  width: 22px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 12px;
`;

export const StyledContainer = styled("div")`
  width: 100%;
  margin-bottom: 25px;
  position: relative;
`;

export const StyledImage = styled("img")`
  height: 20px;
  width: 20px;
  position: absolute;
  left: 23px;
  top: 47%;
  transform: translateY(-50%);
`;

export const StyledAsterisk = styled.span`
  color: red;
  margin-left: ${(props) =>
    props.isFocused || props.hasValue ? "1px" : "-2px"};
  position: absolute;
  top: ${(props) => (props.isFocused || props.hasValue ? "-2px" : "-6px")};
`;

function TextInput(props) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const {
    type = "text",
    placeholder = "",
    name = "",
    value = "",
    onChange = () => { },
    className = "",
    id = "",
    label = "",
    error = "",
    errorMessage = "",
    required = false,
    containerClassName = "input-field",
    containerStyle = {},
    autoComplete = "",
    readOnly = false,
    passWordIcon = false,
    style = {},
    icon = null,
    open = false,
    eyeicontoggle = () => { },
    eyetoggleclassname = "",
    backgroundColor = "white",
    labelColor = "black",
    onClick = () => { },
  } = props;

  return (
    <StyledContainer className={containerClassName} style={containerStyle}>
      {icon && <StyledImage src={icon} alt="icon" />}
      <StyledInput
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
        id={id}
        required={required}
        autoComplete={autoComplete}
        readOnly={readOnly}
        style={icon ? { paddingLeft: "30px", ...style } : style}
        ref={inputRef}
        isFocused={isFocused}
        hasValue={value !== ""}
        showPlaceholder={!placeholder}
        onClick={onClick}
      />
      <StyledLabel
        onClick={() => inputRef.current.focus()}
        isFocused={isFocused}
        hasValue={value !== ""}
        backgroundColor={backgroundColor}
        labelColor={labelColor}
      >
        {label}
        {required && (
          <StyledAsterisk isFocused={isFocused} hasValue={value !== ""}>
            *
          </StyledAsterisk>
        )}
      </StyledLabel>

      {passWordIcon && (
        <span className={eyetoggleclassname} onClick={eyeicontoggle}>
          {open ? (
            <StyledEyeIconImg src={eyeopen} alt="eye open" />
          ) : (
            <StyledEyeIconImg src={eyesclose} alt="eye closed" />
          )}
        </span>
      )}

      {error && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledContainer>
  );
}

export default TextInput;