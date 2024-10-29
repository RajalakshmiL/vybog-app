import React from "react";
import styled from "@emotion/styled";

export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
});
export const StyledRadioLabel = styled("label")({
  cursor: "pointer",
  position: "relative",
  top: "-1px",
  left: "5px",
});
const NormalRadio = (props) => {
  const {
    label = "",
    id = Math.random(),
    checked = false,
    value,
    onChange,
    disabled = false,
    errorMessage = "",
    style = {},
    labelStyle = {},
  } = props;

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const combinedStyle = { ...style, cursor: "pointer" };

  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        style={combinedStyle}
      />
      <StyledRadioLabel htmlFor={id} style={labelStyle}>
        {label}
      </StyledRadioLabel>
      {errorMessage && (
        <StyledErrorMessage className="error-message">
          {errorMessage}
        </StyledErrorMessage>
      )}
    </div>
  );
};

export default NormalRadio;
