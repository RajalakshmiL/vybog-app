import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as StyledDOM from "./ManageAccount.jsx";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CameraIcon from "../../../../assets/image/camericon.svg";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar.js";
export default function ManageAccount() {
  const [avatarImage, setAvatarImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      editemail: "",
      contact: "",
      userName: "",
    },
    onSubmit: (values) => {
      const fullName = `${values.firstName} ${values.lastName}`;
      localStorage.setItem(
        "formValues",
        JSON.stringify({ ...values, fullName })
      );
      if (values.editemail !== "") {
        localStorage.setItem("email", values.editemail);
      }
      localStorage.setItem("avatarImage", avatarImage);
      window.location.reload();
    },
  });

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem("formValues"));
    if (storedValues) {
      formik.setValues(storedValues);
    }
    const storedAvatar = localStorage.getItem("avatarImage");
    if (storedAvatar) {
      setAvatarImage(storedAvatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileEdit = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = handleImageChange;
    inputElement.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (file.size <= 1024 * 1024) {
        setAvatarImage(reader.result);
      } else {
        Toast("warning", "Please upload the image less than 1Mb");
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <StyledDOM.StyledManageAccountMaincontainer>
        <StyledDOM.StyledHeaderText>
          Update Profile Information
        </StyledDOM.StyledHeaderText>
        <StyledDOM.StyledOverallContainer className="main-container">
          <StyledDOM.StyledProfileUpdate>
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <StyledDOM.StyledUploadAvatar
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
            <StyledDOM.StyledDetailSpan>
              Image upload size should not exceed 1MB.{" "}
            </StyledDOM.StyledDetailSpan>
          </StyledDOM.StyledProfileUpdate>
          <StyledDOM.StyledUpdateMainProfileDiv>
            <StyledDOM.StyledUpdateMainProfile>
              <StyledDOM.StyledNameDiv>
                <StyledDOM.StyledTextInput
                  type="text"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  className="firstName-inputField"
                  backgroundColor="#ecf4ff"
                />
                <StyledDOM.StyledTextInput
                  type="text"
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  errorClassName="error-message-createaccount"
                  className="lastName-inputField"
                  backgroundColor="#ecf4ff"
                />
              </StyledDOM.StyledNameDiv>
              <StyledDOM.StyledNameDiv>
                <StyledDOM.StyledTextInput
                  type="text"
                  name="userName"
                  id="userName"
                  label="username"
                  placeholder="User Name"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  onBlur={formik.handleBlur}
                  className="userName-inputField"
                  backgroundColor="#ecf4ff"
                />
                <StyledDOM.StyledTextInput
                  type="text"
                  name="editemail"
                  id="email"
                  label="Email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.editemail}
                  onBlur={formik.handleBlur}
                  backgroundColor="#ecf4ff"
                />
              </StyledDOM.StyledNameDiv>

              <StyledDOM.StyledTextInput
                type="text"
                name="contact"
                id="contact"
                label="Contact"
                placeholder="Contact Number"
                onChange={formik.handleChange}
                value={formik.values.contact}
                onBlur={formik.handleBlur}
                className="contact-inputField"
                backgroundColor="#ecf4ff"
              />
            </StyledDOM.StyledUpdateMainProfile>
          </StyledDOM.StyledUpdateMainProfileDiv>
        </StyledDOM.StyledOverallContainer>
        <StyledDOM.StyledButtonDiv>
          <StyledDOM.StyledButton label="update" event={formik.handleSubmit} />
        </StyledDOM.StyledButtonDiv>
      </StyledDOM.StyledManageAccountMaincontainer>
    </>
  );
}
