import React, { useRef, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "@emotion/styled";

export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
  // marginBottom: "20px",
  marginTop: "5px",
});

const StyledPhoneInputContainer = styled("div")`
  position: relative;
  width: 100%;
  .contact-inputField {
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "auto"};
  }

  .react-tel-input .form-control {
    width: 100%;
    height: 100%;
    background-color: transparent;
    ::placeholder {
      opacity: ${(props) => (props.isFocused || props.hasValue ? "0" : "1")};
      transition: opacity 0.3s;
    }
  }

  .react-tel-input {
    margin-bottom: ${(props) => props.marginBottom || "12px"};
  }

   .react-tel-input .country-list {
    width: ${(props) => props.countryListWidth || "340px"};
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: #e6f1f5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #1b52a729;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color:  #1b52a742

;
    }
    &::-webkit-scrollbar-thumb:active {
      background-color: #1b52a740;
    }
`;

const StyledLabel = styled.span`
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
  z-index: ${(props) => (props.isFocused || props.hasValue ? "4" : "0")};
`;

export const StyledAsterisk = styled.span`
  color: red;
   margin-left: ${(props) =>
    props.isFocused || props.hasValue ? "1px" : "31px"};
  position: absolute;
  top: ${(props) => (props.isFocused || props.hasValue ? "-2px" : "0px")};
  display: ${(props) =>
    props.isFocused || !props.hasCountry ? "inline" : "none"};
`;

const PhoneNumberInput = (props) => {
  const {
    value,
    onChange,
    onBlur,
    error,
    touched,
    width,
    height,
    marginBottom,
    placeholder,
    label,
    required = false,
    backgroundColor = "white",
    labelColor = "black",
    country,
    phoneContainerStyle = {},
    countryListWidth,
  } = props || {};

  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (phone, countryData) => {
    if (onChange) {
      onChange(phone, countryData);
    }
  };
  const inputWrapperRef = useRef(null);
  const [dynamicWidth, setDynamicWidth] = useState("auto");

  useEffect(() => {
    if (inputWrapperRef.current) {
      const width = inputWrapperRef.current.offsetWidth;
      setDynamicWidth(`${width}px`);
    }
    const handleResize = () => {
      if (inputWrapperRef.current) {
        const width = inputWrapperRef.current.offsetWidth;
        setDynamicWidth(`${width}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const labelWithAsterisk = required ? `${label} ` : label;

  return (
    <StyledPhoneInputContainer
      width={width}
      height={height}
      marginBottom={marginBottom}
      isFocused={isFocused}
      hasValue={value && value.length > 0}
      hasCountry={!!country}
      style={phoneContainerStyle}
      countryListWidth={countryListWidth}
    >
      <PhoneInput
        country={country}
        value={value}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        inputProps={{
          name: "contact",
          required: true,
          autoFocus: false,
          placeholder: placeholder,
        }}
        specialLabel=""
        containerClass="contact-inputField"
        inputClass={touched && error ? "error" : ""}
      />
      {label && (
        <StyledLabel
          isFocused={isFocused}
          hasValue={value && value.length > 0}
          backgroundColor={backgroundColor}
          labelColor={labelColor}
        >
          {labelWithAsterisk}
          {required && (
            <StyledAsterisk
              isFocused={isFocused}
              hasValue={value !== ""}
              hasCountry={!!country}
            >
              *
            </StyledAsterisk>
          )}
        </StyledLabel>
      )}
      {touched && error && (
        <StyledErrorMessage className="error-message-createaccount">
          {error}
        </StyledErrorMessage>
      )}
    </StyledPhoneInputContainer>
  );
};

export default PhoneNumberInput;
