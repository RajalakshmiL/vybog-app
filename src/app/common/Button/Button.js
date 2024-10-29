import React from "react";
import styled from "@emotion/styled";

export const StyledButton = styled("button")(({ backgroundColor, color }) => ({
  backgroundColor: backgroundColor || "#0D52A7",
  color: color || "white",
  padding: "12px 32px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
}));

export const ExportButton = styled(StyledButton)({
  backgroundColor: "#EEF8F1",
  color: "#216E3A",
  border: "1px solid #216E3A",
});

export const CancelButton = styled(StyledButton)({
  backgroundColor: "#F5F4F3",
  border: "1px solid #ACACAC",
  color: "#7B7A7A",
  marginRight: "25px",
});

export const StyledIcon = styled("img")({
  marginRight: "8px",
  width: "20px",
});

function Button(props) {
  const {
    event = () => "",
    type = "button",
    label = "",
    className = "",
    loading = false,
    customLoading = false,
    disabled = false,
    isCancel = false,
    style = {},
    icon = null,
    iconSrc = null,
    isExport = false,
    backgroundColor = "",
    color = "",
  } = props || {};

  const ButtonComponent = isExport
    ? ExportButton
    : isCancel
    ? CancelButton
    : StyledButton;

  return (
    <ButtonComponent
      onClick={event}
      type={type}
      className={className}
      style={{
        ...style,
        cursor: loading || customLoading ? "no-drop" : "pointer",
      }}
      disabled={disabled}
      backgroundColor={backgroundColor}
      color={color}
    >
      {iconSrc && <StyledIcon src={iconSrc} alt="icon" />} {label}
      {icon}
    </ButtonComponent>
  );
}

export default Button;
