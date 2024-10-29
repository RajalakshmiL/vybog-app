import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as StyledDOM from "./AutoComplete.jsx";

export default function CustomAutocomplete({
  tags,
  text,
  placeholder,
  options,
  onChange,
  onBlur = () => { },
  clearTriggered,
  InputWrapperStyle = {},
  containerStyle = {},
  iconStyle = {},
  listBoxStyle = {},
  autocompleteOuterDiv = {},
  customstyle = {},
  showDownArrowIcon = false,
  downArrow = true,
  inputStyle = {},
  error = "",
  fieldLabel = "",
  errorMessage = "",
  labelColor = "#000",
  backgroundColor = "#fff",
  defaultValues = [],
  dataattr,
  required = false,
  ...props
}) {
  const inputWrapperRef = useRef(null);
  const [listBoxWidth, setListBoxWidth] = useState("auto");
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(defaultValues || []);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (props.clearTriggered) {
      setInputValue("");
      setValue([]);
    }
  }, [props.clearTriggered]);

  useEffect(() => {
    if (clearTriggered) {
      setInputValue("");
      setValue([]);
    }
  }, [clearTriggered]);

  useEffect(() => {
    if (inputWrapperRef.current) {
      const width = inputWrapperRef.current.offsetWidth;
      setListBoxWidth(`${width}px`);
    }
    const handleResize = () => {
      if (inputWrapperRef.current) {
        const width = inputWrapperRef.current.offsetWidth;
        setListBoxWidth(`${width}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: defaultValues,
    multiple: tags,
    options: options.map((option, index) => ({
      id: `${option.title}-${index}`,
      title: typeof option === "string" ? option : option.title,
    })),
    getOptionLabel: (option) => {
      if (typeof option === "string") {
        return option;
      }
      if (option && option.inputValue) {
        return option.inputValue;
      }
      return option && option.title ? option.title : "";
    },
    onInputChange: (_, newInputValue, reason) => {
      if (reason === "input") {
        const filteredInputValue = newInputValue.replace(/[^a-zA-Z]/g, "");
        if (!tags) {
          setInputValue(filteredInputValue);
        }
      } else {
        setInputValue(newInputValue);
      }
    },
    onChange: (_, newValue) => {
      if (typeof newValue === "string") {
        if (newValue.trim() !== "") {
          onChange(newValue);
        }
      } else if (Array.isArray(newValue)) {
        const uniqueNewValue = Array.from(
          new Set(
            newValue
              .map((option) => option.title || option)
              .filter((value) => value.trim() !== "")
          )
        );
        if (uniqueNewValue.length > 0) {
          onChange(uniqueNewValue);
        }
      } else if (newValue && newValue.inputValue) {
        onChange(newValue.inputValue);
      } else if (newValue) {
        onChange(newValue.title || newValue);
      } else {
        onChange("");
      }
      setValue(
        Array.isArray(newValue)
          ? Array.from(
            new Set(
              newValue
                .map((option) => option.title || option)
                .filter((value) => value.trim() !== "")
            )
          )
          : newValue || []
      );
    },

    value: value,
    filterOptions: (options, params) => {
      const filtered = options.filter(
        (option) =>
          option.title &&
          option.title.toLowerCase().includes(params.inputValue.toLowerCase())
      );

      if (params.inputValue !== "" && props.freeSolo) {
        const existingText = options.some(
          (option) => option.title === params.inputValue
        );
        if (!existingText && /^[a-zA-Z]+$/.test(params.inputValue)) {
          filtered.push({
            inputValue: params.inputValue,
            title: `${params.inputValue}`,
          });
        }
      }

      return filtered;
    },
    selectOnFocus: true,
    clearOnBlur: true,
    handleHomeEndKeys: true,
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    renderOption: (props, option, { selected }) => (
      <li {...props}>
        <span>{option.title}</span>
        {selected && <CheckIcon fontSize="small" style={{ color: "blue" }} />}
      </li>
    ),
    freeSolo: true,
    renderInput: (params) => (
      <TextField {...params} label="Free solo with text demo" />
    ),
  });

  const handleIconClick = () => {
    setAnchorEl(inputWrapperRef.current);
    setOpen(true);
    inputWrapperRef.current.querySelector("input").focus(); // Focus the input on icon click
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setOpen(true);
  };

  const handleInputBlur = (event) => {
    setIsFocused(false);
    onBlur(event);
  };

  return (
    <StyledDOM.StyledRoot style={containerStyle}>
      <StyledDOM.StyledAutoCompleteOuterDiv
        {...getRootProps()}
        className="outer-autocomplete"
        style={autocompleteOuterDiv}
      >
        <div style={{ position: "relative" }}>
          <StyledDOM.StyledInputWrapper
            style={{ ...InputWrapperStyle }}
            ref={inputWrapperRef}
            className={`${focused ? "focused" : ""} styled-scrollbar`}
            labelColor={labelColor}
            backgroundColor={backgroundColor}
            onBlur={handleInputBlur}
          >
            {tags &&
              value.map((option, index) => {
                let label;
                if (typeof option === "string") {
                  label = option;
                } else {
                  label = option.title || "";
                }

                return (
                  <StyledDOM.StyledTag
                    key={`${label}-${index}`}
                    label={label}
                    {...getTagProps({ index })}
                  />
                );
              })}

            <input
              {...getInputProps()}
              placeholder={
                isFocused || value.length > 0 || inputValue
                  ? ""
                  : `${placeholder}`
              }
              className={value.length > 0 ? "has-value" : ""}
              {...(!tags && { value: inputValue })}
              style={inputStyle}
              onFocus={handleInputFocus}
              dataattr={dataattr}
            />
            {required && !isFocused && value.length === 0 && !inputValue && (
              <span className="asterisk">*</span>
            )}

            {showDownArrowIcon && (
              <StyledDOM.StyledArrowDiv onClick={handleIconClick}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </StyledDOM.StyledArrowDiv>
            )}
          </StyledDOM.StyledInputWrapper>
          <StyledDOM.StyledLabel
            isVisible={isFocused || value.length > 0 || inputValue}
            labelColor={labelColor}
            backgroundColor={backgroundColor}
          >
            {fieldLabel}
            {required && <span className="asterisk">*</span>}
          </StyledDOM.StyledLabel>
        </div>
        {error && (
          <StyledDOM.StyledErrorMessage className="error-message">
            {errorMessage}
          </StyledDOM.StyledErrorMessage>
        )}
      </StyledDOM.StyledAutoCompleteOuterDiv>
      {
        groupedOptions.length > 0 ? (
          <StyledDOM.StyledListbox
            {...getListboxProps()}
            style={{ ...listBoxStyle, width: listBoxWidth }}
            className="autocomplete-listoption"
          >
            {groupedOptions.map((option, index) => {
              const isSelected = Array.isArray(value)
                ? value.includes(option.title)
                : value.title === option.title;
              return (
                <StyledDOM.StyledListItem
                  key={option.id}
                  {...getOptionProps({ option, index })}
                  isSelected={isSelected}
                >
                  <span>{option.title}</span>
                  {isSelected && (
                    <CheckIcon fontSize="small" style={{ color: "#004b9e" }} />
                  )}
                </StyledDOM.StyledListItem>
              );
            })}
          </StyledDOM.StyledListbox>
        ) : null
      }
    </StyledDOM.StyledRoot >
  );
}

CustomAutocomplete.propTypes = {
  tags: PropTypes.bool,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  clearTriggered: PropTypes.bool,
  InputWrapperStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  listBoxStyle: PropTypes.object,
  autocompleteOuterDiv: PropTypes.object,
  customstyle: PropTypes.object,
  showDownArrowIcon: PropTypes.bool,
  downArrow: PropTypes.bool,
  inputStyle: PropTypes.object,
  error: PropTypes.string,
  fieldLabel: PropTypes.string,
  errorMessage: PropTypes.string,
  labelColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  dataattr: PropTypes.string,
  required: PropTypes.bool,
};

CustomAutocomplete.defaultProps = {
  tags: false,
  placeholder: "",
  clearTriggered: false,
  onBlur: () => { },
  required: false,
};
