import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import styled from "@emotion/styled";
import { Icon } from "@mui/material";

export const StyledDynamicCheckbox = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const StyledDynamicCheckboxSpan = styled("span")({
  fontSize: "14px",
  fontWeight: "300",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
});

export const StyledAsterisk = styled("span")({
  color: "red",
  marginLeft: "2px",
  fontSize: "14px",
});

export default function DynamicCheckbox({
  label,
  labelStyle = {},
  checked,
  color = "",
  onChange,
  containerStyle = {},
  name = "",
  icon = null,
  fontSize = "",
  labelId = `${name}`,
  required = false,
}) {
  const handleLabelClick = () => {
    onChange({ target: { checked: !checked, name } });
  };

  return (
    <StyledDynamicCheckbox style={containerStyle} className="dynamic-checkbox">
      <Checkbox
        id={labelId}
        checked={checked}
        onChange={onChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        sx={{
          "& .MuiSvgIcon-root": { fontSize: { fontSize }, color: { color } },
        }}
        name={name}
        className="checkbox-div"
      />

      {icon && (
        <Icon onClick={handleLabelClick} style={{ cursor: "pointer" }}>
          {icon}
        </Icon>
      )}
      <StyledDynamicCheckboxSpan
        onClick={handleLabelClick}
        style={labelStyle}
        className="checkboxspan"
      >
        {label}
        {required && <StyledAsterisk>*</StyledAsterisk>}
      </StyledDynamicCheckboxSpan>
    </StyledDynamicCheckbox>
  );
}
