import React, { useState, useEffect } from "react";
import pdf from "../../../assets/image/PDF-icon.svg";
import docx from "../../../assets/image/DOC-icon.svg";
import xls from "../../../assets/image/xls_8361442.png";
import txt from "../../../assets/image/txt.png";
import { Toast } from "../Toast-Snackbar/ToastSnackbar";
import { parse } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const formatDate = (date, month) => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const monthoptions = { month: "short", day: "2-digit" };
  if (month) {
    return new Date(date).toLocaleDateString("en-US", monthoptions);
  } else {
    return new Date(date).toLocaleDateString("en-US", options);
  }
};

// Age calculater
const calculateAge = (dob) => {
  if (!dob) return "";

  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const capitalizeText = (text) => {
  return text.replace(/\b(\w)/g, (s) => s.toUpperCase());
};

const GlobalSearch = (items, searchKey) => {
  const [filteredItems, setFilteredItems] = useState(items);

  React.useEffect(() => {
    if (searchKey.trim() === "") {
      setFilteredItems(items);
    } else {
      const lowercasedFilter = searchKey.toLowerCase();
      const filteredData = items.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(lowercasedFilter)
        )
      );
      setFilteredItems(filteredData);
    }
  }, [items, searchKey]);

  return filteredItems;
};

function CustomDragAndDrop(onDrop, multiFile = false) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (multiFile) {
      onDrop(files);
    } else {
      const firstFile = files.length > 0 ? files[0] : null;
      if (firstFile) {
        onDrop([firstFile]);
      }
    }
  };
  return {
    isDragging,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

const sortByProperty = (property) => (a, b) => {
  const valueA = a[property].toUpperCase();
  const valueB = b[property].toUpperCase();
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};
//focusFirstInput;
const useFocusFirstInput = (containerSelector = "") => {
  useEffect(() => {
    const container = containerSelector
      ? document.querySelector(containerSelector)
      : document;

    if (!container) {
      return;
    }

    const firstInput = container?.querySelector(
      "input:not([value]), input[value=''],textarea:not([value]), textarea[value='']"
    );

    if (firstInput) {
      firstInput.focus();
    }
  }, [containerSelector]);
};

const getUniqueOptions = (options) => {
  return options.filter(
    (option, index, self) =>
      index === self.findIndex((o) => o.title === option.title)
  );
};

const handleTriggerClear = (formik, setClearTriggered) => {
  formik.resetForm();
  setClearTriggered(true);
};

const handleClear = (formik) => {
  formik.resetForm();
};

// autocomplete freesolo and tag validation function

const validateAutocomplete = (value) => {
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return false;
};

// fileicon handle function

const handleIcon = (fileName) => {
  const extension = fileName?.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return pdf;
    case "docx":
    case "doc":
      return docx;
    case "xls":
    case "xlsx":
      return xls;
    case "txt":
      return txt;
    default:
      return null;
  }
};

// file upload size restriction

const handleFileSelect = (droppedFiles, allowedFormats, maxSizeMB) => {
  const validFiles = [];
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  for (let file of droppedFiles) {
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    const isValidFormat = allowedFormats.includes(fileExtension);
    const isValidSize = file.size <= maxSizeBytes;

    if (validFiles.length < 10) {
      if (!isValidFormat) {
        Toast(
          "warning",
          `Unsupported file format. Please upload files in ${allowedFormats.join(
            ", "
          )} formats.`
        );
      } else if (!isValidSize) {
        Toast("warning", `File size exceeds the limit of ${maxSizeMB}MB.`);
      } else {
        validFiles.push(file);
      }
    } else {
      Toast(
        "warning",
        "File limit exceeded. You can only upload up to 10 files."
      );
      break;
    }
  }

  return validFiles;
};

// popup open background scroll function

const Popupscroll = (isDialogOpen = false) => {
  React.useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDialogOpen]);
};
// date field validation
const useDateValidation = (formik, startDateField, endDateField) => {
  React.useEffect(() => {
    const startDate = formik.values[startDateField];
    const endDate = formik.values[endDateField];
    if (
      startDate &&
      endDate &&
      parse(startDate, "MM/yyyy", new Date()) >
        parse(endDate, "MM/yyyy", new Date())
    ) {
      formik.setFieldValue(endDateField, "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik, formik.values[startDateField]]);
};

// filename display function

const displayFileName = (fileName) => {
  const maxLength = 40;
  if (fileName.length >= maxLength) {
    const extensionIndex = fileName.lastIndexOf(".");
    const extension = fileName.substring(extensionIndex);
    const start = fileName.substring(0, 10);
    const end = fileName.substring(extensionIndex - 5, extensionIndex);
    return `${start}...${end}${extension}`;
  }
  return fileName;
};

//alphabets restriction function

const restrictAlphabets = (e) => {
  const keyCode = e.keyCode || e.which;
  const keyValue = String.fromCharCode(keyCode);
  if (!e.target) {
    return;
  }
  if (
    !/[0-9]/.test(keyValue) &&
    !(keyCode >= 96 && keyCode <= 105) &&
    keyCode !== 191 &&
    keyCode !== 8 &&
    keyCode !== 37 &&
    keyCode !== 39 &&
    keyCode !== 38 &&
    keyCode !== 40
  ) {
    e.preventDefault();
  }
};
//Phone number validate function
const phoneNumberValidation = (phone) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (phoneNumber) {
    console.log("Parsed phone number:", phoneNumber);
    return phoneNumber.isValid();
  } else {
    console.log("Failed to parse phone number:", phone);
    return false;
  }
};

const dataTrimmer = (data) => {
  const trimmedData = data.length > 15 ? `${data.substring(0, 15)}...` : data;
  return trimmedData;
};

const skillDataTrimmer = (data) => {
  const joinedData = data.join(",");
  const trimmedData =
    joinedData.length > 15 ? `${joinedData.substring(0, 15)}...` : joinedData;
  return trimmedData;
};

// Handle menu open and close
const handleOpenMenuSelector = (index) => {
  const rows = document.querySelectorAll(
    ".global-data-table .rdt_TableRow, .candidate-table .rdt_TableRow, .clients-table .rdt_TableRow, .jobs-table .rdt_TableRow"
  );

  rows.forEach((row, i) => {
    if (i === index) {
      row.setAttribute("data-highlighted", "true");
    } else {
      row.removeAttribute("data-highlighted");
    }
  });
};

const handleCloseMenuSelector = () => {
  const rows = document.querySelectorAll(
    ".global-data-table .rdt_TableRow, .candidate-table .rdt_TableRow, .clients-table .rdt_TableRow, .jobs-table .rdt_TableRow"
  );
  rows.forEach((row) => row.removeAttribute("data-highlighted"));
};
const scrollToErrorField = (formik) => {
  const findNestedErrorField = (errors) => {
    for (const field in errors) {
      if (errors[field] && typeof errors[field] === "object") {
        const nestedErrorField = findNestedErrorField(errors[field]);
        if (nestedErrorField) {
          return `${field}.${nestedErrorField}`;
        }
      } else if (errors[field]) {
        return field;
      }
    }
    return null;
  };

  const firstErrorField = findNestedErrorField(formik.errors);

  if (firstErrorField) {
    const errorElement = document.querySelector(
      `[name="${firstErrorField}"], [dataattr="${firstErrorField}"]`
    );

    if (errorElement) {
      setTimeout(() => {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 0);
    } else {
      const dynamicErrorElement = document.querySelector(
        `[name^="${firstErrorField.split(".")[0]}"], [dataattr^="${
          firstErrorField.split(".")[0]
        }"]`
      );

      if (dynamicErrorElement) {
        setTimeout(() => {
          dynamicErrorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }, 0);
      }
    }
  }
};

const ScrollToTop = () => {
  // const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
  return null;
};
function handleCustomTrim(values) {
  const trimmedValues = { ...values };
  for (let key in trimmedValues) {
    if (typeof trimmedValues[key] === "string") {
      trimmedValues[key] = trimmedValues[key].trim();
    } else if (Array.isArray(trimmedValues[key])) {
      trimmedValues[key] = trimmedValues[key].map((item) =>
        typeof item === "string" ? item.trim() : item
      );
    }
  }
  return trimmedValues;
}

const highlightText = (text) => {
  const wordsToHighlight = [
    "Email",
    "Phone",
    "dd-mm-yyyy",
    "mm/dd/yyyy",
    "Name",
    "Phone Number",
  ];
  const regex = new RegExp(`(${wordsToHighlight.join("|")})`, "gi");

  return text.split(regex).map((part, index) =>
    wordsToHighlight.includes(part) ? (
      <strong key={index} style={{ fontWeight: "bold", color: "#0057a3" }}>
        {part}
      </strong>
    ) : (
      part
    )
  );
};
export {
  formatDate,
  capitalizeText,
  GlobalSearch,
  CustomDragAndDrop,
  sortByProperty,
  getUniqueOptions,
  handleTriggerClear,
  handleClear,
  validateAutocomplete,
  handleIcon,
  handleFileSelect,
  Popupscroll,
  useDateValidation,
  displayFileName,
  restrictAlphabets,
  phoneNumberValidation,
  dataTrimmer,
  skillDataTrimmer,
  handleOpenMenuSelector,
  handleCloseMenuSelector,
  useFocusFirstInput,
  scrollToErrorField,
  ScrollToTop,
  calculateAge,
  // validateField,
  handleCustomTrim,
  highlightText,
};
