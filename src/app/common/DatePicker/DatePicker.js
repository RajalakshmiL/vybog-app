import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactComponent as CalendarMonthIcon } from "../../../assets/image/calendar-icon.svg";
import styled from "@emotion/styled";
import { format, parse, isValid } from "date-fns";
import { restrictAlphabets } from "../CommonFunctions/CommonFunctions";

export const StyledDatePicker = styled(DatePicker)(({ isFocused }) => ({
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "7px",
  boxSizing: "border-box",
  width: "100%",
  "::placeholder": {
    color: isFocused ? "transparent" : "#828079",
  },
}));

export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
  marginTop: "6px",
});

export const StyledDatePickerContainer = styled("div")({
  position: "relative",
  width: "75%",
  marginBottom: "25px",
});

const Label = styled.label`
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
  pointer-events: none;
  z-index: 1;

  .required-asterisk {
    color: red;
    margin-left: ${(props) =>
      props.isFocused || props.hasValue ? "1px" : "-2px"};
    position: absolute;
    top: ${(props) => (props.isFocused || props.hasValue ? "-2px" : "-6px")};
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CustomDatePicker = ({
  field,
  form,
  label,
  placeholder = "",
  errorMessage,
  readOnly,
  // type = "month-year",
  disabled = false,
  startDate,
  labelColor = "",
  backgroundColor = "white",
  divStyle = {},
  rangePicker = false,
  startLabel = "",
  endLabel = "",
  startPlaceholder = "",
  endPlaceholder = "",
  startErrorMessage = "",
  endErrorMessage = "",
  dateFormat = "",
  // showMonthDropdown = false,
  // showYearDropdown = false,
  dropdownMode = "select",
  required = false,
  ...props
}) => {
  const { name, value, onChange, onBlur } = field;
  const [isFocusedStart, setIsFocusedStart] = useState(false);
  const [isFocusedEnd, setIsFocusedEnd] = useState(false);
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isFocusedDate, setIsFocusedDate] = useState(false);

  const handleDateChange = (val) => {
    const formattedDate = val ? format(val, dateFormat) : "";
    form.setFieldValue(name, formattedDate);
    onChange({
      target: {
        name,
        value: formattedDate,
      },
    });
  };

  const handleRangeChange = (dates) => {
    const [start, end] = dates;
    const formattedStart = start ? format(start, dateFormat) : "";
    const formattedEnd = end ? format(end, dateFormat) : "";
    form.setFieldValue(`${name}.startDate`, formattedStart);
    form.setFieldValue(`${name}.endDate`, formattedEnd);
    onChange({
      target: {
        name,
        value: { startDate: formattedStart, endDate: formattedEnd },
      },
    });
  };

  const parseDate = (dateString) => {
    return dateString && typeof dateString === "string"
      ? parse(dateString, dateFormat, new Date())
      : null;
  };

  const parsedDate = parseDate(value);
  const parsedStartDate = parseDate(value?.startDate);
  const parsedEndDate = parseDate(value?.endDate);

  const handleFocusDate = () => setIsFocusedDate(true);
  const handleFocusStart = () => setIsFocusedStart(true);
  const handleBlurStart = (event) => {
    setIsFocusedStart(false);
    form.setFieldTouched(`${name}.startDate`, true);
    if (onBlur && onBlur.startDate) {
      onBlur.startDate(event);
    }
  };
  const handleBlurDate = (event) => {
    setIsFocusedDate(false);
    form.setFieldTouched(name, true);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const handleFocusEnd = () => setIsFocusedEnd(true);
  const handleBlurEnd = (event) => {
    setIsFocusedEnd(false);
    form.setFieldTouched(`${name}.endDate`, true);
    if (onBlur && onBlur.endDate) {
      onBlur.endDate(event);
    }
  };

  const commonProps = {
    ...props,
    readOnly,
    dateFormat,
    showMonthYearPicker: dateFormat === "MM/yyyy",
    showYearPicker: dateFormat === "yyyy",
    showYearDropdown: dateFormat === "dd/MM/yyyy",
    showMonthDropdown: dateFormat === "dd/MM/yyyy",
    disabled,
    closeOnScroll: (e) => e.target === document,
    onKeyDown: restrictAlphabets,
    "data-datepicker": name,
  };

  return (
    <StyledDatePickerContainer style={divStyle}>
      {rangePicker ? (
        <>
          <DatePickerWrapper className="datepicker-div">
            <Label
              hasValue={!!value?.startDate}
              isFocused={isFocusedStart}
              labelColor={labelColor}
              backgroundColor={backgroundColor}
            >
              {startLabel}
              {required && <span className="required-asterisk">*</span>}
            </Label>
            <StyledDatePicker
              {...commonProps}
              name={`${name}.startDate`}
              placeholderText={isFocusedStart ? "" : startPlaceholder}
              selected={isValid(parsedStartDate) ? parsedStartDate : null}
              onChange={(date) => handleRangeChange([date, parsedEndDate])}
              maxDate={new Date()}
              open={!readOnly && isOpenStart}
              onClickOutside={() => setIsOpenStart(false)}
              onCalendarOpen={
                !readOnly ? () => setIsOpenStart(true) : undefined
              }
              onCalendarClose={() => setIsOpenStart(false)}
              onFocus={handleFocusStart}
              onBlur={handleBlurStart}
              isFocused={isFocusedStart}
              // showMonthDropdown={showMonthDropdown}
              // showYearDropdown={showYearDropdown}
              dropdownMode={dropdownMode}
            />
            <CalendarMonthIcon
              onClick={() => !readOnly && setIsOpenStart(!isOpenStart)}
              style={{
                position: "absolute",
                top: "6px",
                right: "10px",
                cursor: readOnly ? "not-allowed" : "pointer",
              }}
            />
            {startErrorMessage && (
              <StyledErrorMessage className="starterror-message">
                {startErrorMessage}
              </StyledErrorMessage>
            )}
          </DatePickerWrapper>

          <DatePickerWrapper>
            <Label
              hasValue={!!value?.endDate}
              isFocused={isFocusedEnd}
              labelColor={labelColor}
              backgroundColor={backgroundColor}
            >
              {endLabel}
              {required && <span className="required-asterisk">*</span>}
            </Label>
            <StyledDatePicker
              {...commonProps}
              name={`${name}.endDate`}
              placeholderText={isFocusedEnd ? "" : endPlaceholder}
              selected={isValid(parsedEndDate) ? parsedEndDate : null}
              onChange={(date) => handleRangeChange([parsedStartDate, date])}
              minDate={parsedStartDate}
              maxDate={new Date()}
              open={!readOnly && isOpenEnd}
              onClickOutside={() => setIsOpenEnd(false)}
              onCalendarOpen={!readOnly ? () => setIsOpenEnd(true) : undefined}
              onCalendarClose={() => setIsOpenEnd(false)}
              onFocus={handleFocusEnd}
              onBlur={handleBlurEnd}
              isFocused={isFocusedEnd}
              dropdownMode={dropdownMode}
              // showMonthDropdown={showMonthDropdown}
              // showYearDropdown={showYearDropdown}
            />
            <CalendarMonthIcon
              onClick={() => !readOnly && setIsOpenEnd(!isOpenEnd)}
              style={{
                position: "absolute",
                top: "6px",
                right: "10px",
                cursor: readOnly ? "not-allowed" : "pointer",
              }}
            />
            {endErrorMessage && (
              <StyledErrorMessage className="enderror-message">
                {endErrorMessage}
              </StyledErrorMessage>
            )}
          </DatePickerWrapper>
        </>
      ) : (
        <DatePickerWrapper>
          <Label
            hasValue={!!value}
            isFocused={isFocusedDate}
            labelColor={labelColor}
            backgroundColor={backgroundColor}
          >
            {label}
            {required && <span className="required-asterisk">*</span>}
          </Label>
          <StyledDatePicker
            {...commonProps}
            name={name}
            placeholderText={isFocusedDate || value ? "" : placeholder}
            selected={isValid(parsedDate) ? parsedDate : null}
            onChange={handleDateChange}
            maxDate={new Date()}
            open={!readOnly && isOpenDate}
            onClickOutside={() => setIsOpenDate(false)}
            onCalendarOpen={!readOnly ? () => setIsOpenDate(true) : undefined}
            onCalendarClose={() => setIsOpenDate(false)}
            onFocus={handleFocusDate}
            onBlur={handleBlurDate}
            isFocused={isFocusedDate}
            dropdownMode={dropdownMode}
            showTwoColumnMonthYearPicker
          />
          <CalendarMonthIcon
            onClick={() => !readOnly && setIsOpenDate(!isOpenDate)}
            style={{
              position: "absolute",
              top: "6px",
              right: "10px",
              cursor: readOnly ? "not-allowed" : "pointer",
            }}
          />
          {errorMessage && (
            <StyledErrorMessage className="error-message">
              {errorMessage}
            </StyledErrorMessage>
          )}
        </DatePickerWrapper>
      )}
    </StyledDatePickerContainer>
  );
};

export default CustomDatePicker;
