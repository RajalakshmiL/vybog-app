import React, { useState, useEffect } from "react";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import ContentEditor from "../../../../common/TextEditer/TextEditer.js";
import { useFormik } from "formik";
import Button from "../../../../common/Button/Button.js";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

function EditEmailTemplates() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailTemplateData = location.state?.Email_Templates_Data || null;
  const [clearTriggered, setClearTriggered] = useState(false);
  const [editorResetTrigger, setEditorResetTrigger] = useState(false);

  const validationSchema = Yup.object().shape({
    emailTitle: Yup.string().required("Title is required."),
    emailSubject: Yup.string().required("Subject is required."),
    emailTemplate: Yup.string().required("Template is required."),
  });

  const formik = useFormik({
    initialValues: {
      emailTitle: emailTemplateData?.title || "",
      emailSubject: emailTemplateData?.subject || "",
      emailTemplate: emailTemplateData?.body || "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      console.log("Email template submitted", formik.values);
    },
  });

  const buttons = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks", "codeView"],
    // ["preview", "print"],
    ["save"],
  ];

  useEffect(() => {
    if (clearTriggered) {
      setClearTriggered(false);
    }
    if (editorResetTrigger) {
      setEditorResetTrigger(false);
    }
  }, [clearTriggered, editorResetTrigger]);
  const handleImageUploadBefore = (files, info, uploadHandler) => {
    console.log(files, info);
  };
  return (
    <>
      {" "}
      <StyledDOM.StyledMenuHeading>
        Edit Email Template
      </StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledEmailTempleteContainer className="template-container">
        <StyledDOM.StyledEmailTempleteFields className="field-container">
          <StyledDOM.StyledTextInput
            label="Title"
            placeholder="Title"
            required={true}
            name="emailTitle"
            value={formik.values.emailTitle}
            onChange={formik.handleChange}
            error={formik.touched.emailTitle && formik.errors.emailTitle}
            errorMessage={formik.errors.emailTitle}
          />
          <StyledDOM.StyledTextInput
            label="Subject"
            placeholder="Subject"
            required={true}
            name="emailSubject"
            value={formik.values.emailSubject}
            onChange={formik.handleChange}
            error={formik.touched.emailSubject && formik.errors.emailSubject}
            errorMessage={formik.errors.emailSubject}
          />
        </StyledDOM.StyledEmailTempleteFields>
        <ContentEditor
          placeholder="Create Email Template"
          buttonList={buttons}
          height="300px"
          value={formik.values.emailTemplate}
          handleImageUploadBefore={handleImageUploadBefore}
          onChange={(content) => {
            formik.setFieldValue("emailTemplate", content);
          }}
          resetTrigger={editorResetTrigger}
          error={formik.errors.emailTemplate && formik.touched.emailTemplate}
          errorMessage={formik.errors.emailTemplate}
        />
      </StyledDOM.StyledEmailTempleteContainer>
      <StyledDOM.StyledConnectionButtonContainer className="connection-button-container">
        <Button
          label="Cancel"
          isCancel={true}
          event={() => navigate("/email-template-list")}
        />
        <Button label={"Save"} event={formik.handleSubmit} />
      </StyledDOM.StyledConnectionButtonContainer>
    </>
  );
}

export default EditEmailTemplates;
