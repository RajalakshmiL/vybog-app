import React from "react";
import SelectInput from "../../../../common/SelectInput/SelectInput";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import MultiSelector from "../../../../common/Multi-Select-CheckMarks/MultiSelectCheckMarks";
import Button from "../../../../common/Button/Button";
import { useFormik } from "formik";
import OptionData from "../../../../../assets/json/staticData.json";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function AddConnection() {
  const location = useLocation();
  const navigate = useNavigate();
  const connectionData = location.state?.connectionData || null;

  const { staticData = {} } = OptionData || {};
  const {
    SourceType = [],
    ConnectionMethods = [],
    ActiveStatus = [],
    candidate = [],
  } = staticData || {};

  const isEditMode = !!connectionData;
  const validationSchema = Yup.object().shape({
    sourceSystem: Yup.string().required("Source system is required."),
    sourceType: Yup.string().required("Source type is required."),
    connectionMethod: Yup.string().required("Connection method is required."),
    userName: Yup.string().required("Username is required."),
    password: Yup.string().required("Password is required."),
    clientID: Yup.string().required("Client id is required."),
    secretKey: Yup.string().required("Secret Key is required."),
  });
  const formik = useFormik({
    initialValues: {
      sourceSystem: connectionData?.sourceSystem || "",
      sourceType: connectionData?.sourceType || "",
      connectionMethod: connectionData?.connectionMethod || "",
      userName: connectionData?.userName || "",
      password: connectionData?.password || "",
      status: connectionData?.status || "",
      authorizationCode: connectionData?.authorizationCode || "",
      accessToken: connectionData?.accessToken || "",
      clientID: connectionData?.clientID || "",
      secretKey: connectionData?.secretKey || "",
      assingnTo: connectionData?.assingnTo || [],
    },
    validationSchema,
    onSubmit: () => {
      console.log("Connections Values", formik.values);
    },
  });

  const getVisibleFields = () => {
    if (!isEditMode) {
      return [
        "sourceSystem",
        "sourceType",
        "connectionMethod",
        "userName",
        "password",
        "status",
        "authorizationCode",
        "accessToken",
        "clientID",
        "secretKey",
      ];
    }
    switch (formik.values.sourceType) {
      case "Resume Parser":
        return [
          "sourceSystem",
          "sourceType",
          "connectionMethod",
          "userName",
          "password",
          "status",
          "assingnTo",
        ];
      case "Whatsapp":
        return [
          "sourceSystem",
          "sourceType",
          "status",
          "clientID",
          "accessToken",
        ];
      case "Dice":
      case "Tech Fetch":
        return [
          "sourceSystem",
          "sourceType",
          "connectionMethod",
          "userName",
          "password",
          "status",
          "authorizationCode",
          "accessToken",
          "clientID",
          "secretKey",
        ];
      default:
        return [];
    }
  };

  const ShowFields = (fieldName) => getVisibleFields().includes(fieldName);

  return (
    <>
      <StyledDOM.StyledMenuHeading>
        {isEditMode ? "Edit Connection" : "Add Connection"}
      </StyledDOM.StyledMenuHeading>

      <StyledDOM.StyledConnectionContainer className="connection-container">
        {ShowFields("sourceSystem") && (
          <StyledDOM.StyledTextInput
            label="Source System"
            placeholder="Source System"
            required={true}
            name="sourceSystem"
            value={formik.values.sourceSystem}
            onChange={formik.handleChange}
            error={formik.touched.sourceSystem && formik.errors.sourceSystem}
            errorMessage={formik.errors.sourceSystem}
          />
        )}

        <SelectInput
          label="Source Type"
          required={true}
          options={SourceType}
          name="sourceType"
          value={formik.values.sourceType}
          onChange={formik.handleChange}
          error={formik.touched.sourceType && formik.errors.sourceType}
          errorMessage={formik.errors.sourceType}
        />

        {ShowFields("connectionMethod") && (
          <SelectInput
            label="Connection Method"
            required={true}
            options={ConnectionMethods}
            name="connectionMethod"
            value={formik.values.connectionMethod}
            onChange={formik.handleChange}
            error={
              formik.touched.connectionMethod && formik.errors.connectionMethod
            }
            errorMessage={formik.errors.connectionMethod}
          />
        )}

        {ShowFields("userName") && (
          <StyledDOM.StyledTextInput
            label="Username"
            placeholder="Username"
            required={true}
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && formik.errors.userName}
            errorMessage={formik.errors.userName}
          />
        )}

        {ShowFields("password") && (
          <StyledDOM.StyledTextInput
            label="Password"
            placeholder="Password"
            required={true}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            errorMessage={formik.errors.password}
          />
        )}

        {ShowFields("assingnTo") && (
          <MultiSelector
            label="Assign Users"
            placeholder="Assign Users"
            name="assingnTo"
            options={candidate}
            value={formik.values.assingnTo}
            onChange={(values) => formik.setFieldValue("assingnTo", values)}
          />
        )}

        {ShowFields("status") && (
          <SelectInput
            label="Status"
            options={ActiveStatus}
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          />
        )}

        {ShowFields("authorizationCode") && (
          <StyledDOM.StyledTextInput
            label="Authorization Code"
            placeholder="Authorization Code"
            name="authorizationCode"
            value={formik.values.authorizationCode}
            onChange={formik.handleChange}
          />
        )}

        {ShowFields("accessToken") && (
          <StyledDOM.StyledTextInput
            label="Access Token"
            placeholder="Access Token"
            name="accessToken"
            value={formik.values.accessToken}
            onChange={formik.handleChange}
          />
        )}

        {ShowFields("clientID") && (
          <StyledDOM.StyledTextInput
            label="Client ID"
            placeholder="Client ID"
            required={true}
            name="clientID"
            value={formik.values.clientID}
            onChange={formik.handleChange}
            error={formik.touched.clientID && formik.errors.clientID}
            errorMessage={formik.errors.clientID}
          />
        )}

        {ShowFields("secretKey") && (
          <StyledDOM.StyledTextInput
            label="Secret Key"
            placeholder="Secret Key"
            name="secretKey"
            value={formik.values.secretKey}
            onChange={formik.handleChange}
          />
        )}
      </StyledDOM.StyledConnectionContainer>

      <StyledDOM.StyledConnectionButtonContainer className="connection-button-container">
        <Button
          label="Cancel"
          isCancel={true}
          event={() => navigate("/connection-list")}
        />
        <Button
          label={isEditMode ? "Update Connection" : "Create Connection"}
          event={formik.handleSubmit}
        />
      </StyledDOM.StyledConnectionButtonContainer>
    </>
  );
}

export default AddConnection;
