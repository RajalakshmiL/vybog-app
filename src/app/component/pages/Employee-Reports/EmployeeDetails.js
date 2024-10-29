import React, { useState } from "react";
import { useFormik } from "formik";
import * as EmployeeStyledDOM from "../Employee-Reports/EmployeePageStyle.jsx";
import CustomDatePicker from "../../../common/DatePicker/DatePicker.js";
import DynamicSelectInput from "../../../common/SelectInput/SelectInput.js";
import staticValues from "../../../../assets/json/staticData.json";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraIcon from "../../../../assets/image/camericon.svg";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar.js";
import Button from "../../../common/Button/Button.js";
import { useNavigate } from "react-router-dom";
import PhoneNumberInput from "../../../common/PhoneNumberInput/PhoneNumberInput.jsx";
import { phoneNumberValidation } from "../../../common/CommonFunctions/CommonFunctions.js";
import * as Yup from "yup";

function EmployeeDetails() {
  const navigate = useNavigate();
  const { staticData = {} } = staticValues || {};
  const { country = [], Designation = [] } = staticData || [];
  const [avatarImage, setAvatarImage] = useState(null);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for first name."),
    lastName: Yup.string()
      .required("Last name is required.")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for last name.")
      .test(
        "not-equal",
        "First name and last name cannot be the same.",
        function (value) {
          return (
            value?.replace(/\s+/g, "").trim().toLowerCase() !==
            this.parent.firstName?.replace(/\s+/g, "").trim().toLowerCase()
          );
        }
      ),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required.")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address."
      )
      .nullable(),
    contactNumber: Yup.string()
      .transform((value) => value?.trim())
      .matches(
        /^(\+\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,9}([-.\s]?\d{1,9}){0,4}$/,
        "Invalid phone number format."
      )
      .min(6, "Contact number must be atleast 6 digits.")
      .max(20, "Contact number must not be over 20 digits."),
    desingnation: Yup.string().required("Desingnation is required."),
    country: Yup.string().required("Country is required."),
    dateofJoining: Yup.string().required("Date of joining is required."),
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      dateofJoining: "",
      desingnation: "",
      country: "",
      userName: "",
      countryAccess: [],
      employeeProfileImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Employee Details :", values);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];

    if (file && !allowedFileTypes.includes(file.type)) {
      Toast("warning", "Only PNG, JPG, JPEG, and GIF files are accepted.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (file.size <= 1024 * 1024) {
        setAvatarImage(reader.result);
        formik.setFieldValue("employeeProfileImage", reader.result, false);
      } else {
        Toast("warning", "Please upload an image smaller than 2 MB.");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const userName =
    `${formik.values?.firstName}.${formik.values?.lastName}`.toLowerCase();

  const handleProfileEdit = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = handleImageChange;
    inputElement.click();
  };

  const handlePhoneInputChange = React.useCallback(
    (phone, country) => {
      const isValidNumber = phoneNumberValidation(`+${phone}`);
      console.log("isValidNumber", isValidNumber);
      formik.setFieldValue("contactNumber", phone);
      formik.setFieldTouched("contactNumber", true, false);
      formik.validateField("contactNumber");
    },
    [formik]
  );

  return (
    <>
      <EmployeeStyledDOM.StyledEmployeeContainer>
        <EmployeeStyledDOM.StyledEmployeeHeading>
          Employee Details
        </EmployeeStyledDOM.StyledEmployeeHeading>
        <EmployeeStyledDOM.StyledEmployeeMainContainer className="basic-info-container">
          <EmployeeStyledDOM.StyledEmployeeLeftContainer>
            <h3>Basic Information</h3>
            <EmployeeStyledDOM.StyledIdSpan>
              Id : EMP0158
            </EmployeeStyledDOM.StyledIdSpan>
            <EmployeeStyledDOM.StyledEmployeeTextInput
              label="Employee ID"
              name="employeeId"
              placeholder="Employee ID"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
            />
            <EmployeeStyledDOM.StyledEmployeeTextInput
              label="First Name"
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              required={true}
              error={formik.errors.firstName}
              errorClassName="error-message"
              errorMessage={
                formik.errors.firstName &&
                formik.touched.firstName &&
                formik.errors.firstName
              }
            />
            <EmployeeStyledDOM.StyledEmployeeTextInput
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              required={true}
              error={formik.errors.lastName}
              errorClassName="error-message"
              errorMessage={
                formik.errors.lastName &&
                formik.touched.lastName &&
                formik.errors.lastName
              }
            />
            <EmployeeStyledDOM.StyledEmployeeTextInput
              label="Official Email"
              name="email"
              placeholder="Official Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              required={true}
              error={formik.errors.email}
              errorClassName="error-message"
              errorMessage={
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
            />
            <PhoneNumberInput
              value={formik.values.contactNumber}
              onChange={handlePhoneInputChange}
              onBlur={formik.handleBlur}
              error={formik.errors.contactNumber}
              touched={formik.touched.contactNumber}
              placeholder="Contact No."
              label="Contact No."
              width="100%"
              height="40px"
              marginBottom="30px"
              countryListWidth="380px"
              phoneContainerStyle={{ marginBottom: "25px" }}
            />
            <CustomDatePicker
              label="Date of Joining"
              dateFormat="dd/MM/yyyy"
              labelColor="black"
              divStyle={{ width: "100%", marginBottom: "25px" }}
              form={formik}
              placeholder="Date of Joining"
              field={{
                name: "dateofJoining",
                value: formik.values.dateofJoining,
                onChange: (e) => {
                  formik.setFieldValue("dateofJoining", e.target.value);
                },
                onBlur: () => {
                  formik.setFieldTouched("dateofJoining", true);
                },
              }}
              errorMessage={
                formik.touched.dateofJoining && formik.errors.dateofJoining
              }
              required={true}
            />
            <DynamicSelectInput
              wrapperStyle={{ marginBottom: "25px" }}
              label="Desingnation"
              labelColor="black"
              name="desingnation"
              placeholder="Desingnation"
              value={formik.values.desingnation}
              onChange={formik.handleChange}
              required={true}
              error={formik.touched.desingnation && formik.errors.desingnation}
              errorClassName="error-message"
              errorMessage={formik.errors.desingnation}
              options={Designation}
            />
            <DynamicSelectInput
              wrapperStyle={{ marginBottom: "25px" }}
              label="Country"
              labelColor="black"
              options={country}
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              required={true}
              error={formik.touched.country && formik.errors.country}
              errorMessage={formik.errors.country}
            />
            <EmployeeStyledDOM.StyledEmployeeTextInput
              label="User Name"
              name="user Name"
              placeholder="UserName"
              value={
                formik.values.firstName && formik.values.lastName !== ""
                  ? userName
                  : ""
              }
              onChange={formik.handleChange}
              required={true}
              readOnly={true}
            />
            <EmployeeStyledDOM.StyledDynamicMultipleSelectCheckmarks
              options={country}
              label="Country Access"
              placeholder="Country Access"
              value={formik.values.countryAccess}
              onChange={(values) =>
                formik.setFieldValue("countryAccess", values)
              }
            />
          </EmployeeStyledDOM.StyledEmployeeLeftContainer>
          <EmployeeStyledDOM.StyledEmployeeRightContainer>
            <EmployeeStyledDOM.StyledProfileUpdate>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <EmployeeStyledDOM.StyledUploadAvatar
                    className="edit-icon"
                    src={CameraIcon}
                  />
                }
                onClick={handleProfileEdit}
              >
                <Avatar
                  alt="Profileicon"
                  src={avatarImage}
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
              <EmployeeStyledDOM.StyledDetailSpan>
                Upload a 2 MB-sized image. Please note that PNG, JPG, JPEG, and
                GIF files are accepted.
              </EmployeeStyledDOM.StyledDetailSpan>
            </EmployeeStyledDOM.StyledProfileUpdate>
          </EmployeeStyledDOM.StyledEmployeeRightContainer>
        </EmployeeStyledDOM.StyledEmployeeMainContainer>
        <EmployeeStyledDOM.StyledEmployeeButtonDiv className="button-div">
          <Button
            label="Cancel"
            isCancel={true}
            event={() => navigate("/employee-list")}
            style={{
              color: "#7B7A7A",
              background: "#F5F4F3",
              border: "1px solid #ACACAC",
            }}
          />
          <Button label="Create" event={formik.handleSubmit} />
        </EmployeeStyledDOM.StyledEmployeeButtonDiv>
      </EmployeeStyledDOM.StyledEmployeeContainer>
    </>
  );
}

export default EmployeeDetails;
