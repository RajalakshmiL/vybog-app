import React from "react";
import Table from "../../../common/Table/Table";
import reportData from "../../../../assets/json/Table.json";
import * as StyledDOM from "./Reports.jsx";
import * as SearchDOM from "../Employee-Reports/Employee-Leave-Details/EmpLeave.jsx";
import DatePicker from "../../../common/DatePicker/DatePicker";
import SelectInput from "../../../common/SelectInput/SelectInput";
import Button from "../../../common/Button/Button";
import { useFormik } from "formik";
import optionsJsonData from "../../../../assets/json/staticData.json";
import Menuselector from "../../../common/PageSelector/Menuselector";
import {
  handleCloseMenuSelector,
  handleOpenMenuSelector,
} from "../../../common/CommonFunctions/CommonFunctions";
import { useNavigate } from "react-router-dom";
function TeamsReport() {
  const navigate = useNavigate();
  const { staticData = {} } = optionsJsonData || {};
  const { candidate = [] } = staticData || [];
  const { staticdata = {} } = reportData || {};
  const { AllReports = [] } = staticdata || {};

  const formik = useFormik({
    initialValues: {
      fromDate: "",
      toDate: "",
      employee: "",
    },
    onSubmit: () => {
      console.log("TeamsReport", formik.values);
    },
  });

  const options = [
    // {
    //   name: "Summary",
    // },
    {
      name: "Detailed Report",
    },
  ];

  const handleSelect = (item, rowIndex) => {
    switch (item) {
      case "Summary":
        break;
      case "Detailed Report":
        navigate("/report-details");
        break;
      default:
        break;
    }
  };
  const columns = [
    { name: "Name", selector: (row) => <span>{row?.name}</span> },
    { name: "Department", selector: (row) => <span>{row?.department}</span> },
    { name: "Date", selector: (row) => <span>{row?.date}</span> },
    { name: "In Time", selector: (row) => <span>{row?.inTime}</span> },
    { name: "Out Time", selector: (row) => <span>{row?.outTime}</span> },
    { name: "Time Spent", selector: (row) => <span>{row?.timeSpent}</span> },
    { name: "W.hrs", selector: (row) => <span>{row?.workingHrs}</span> },
    { name: "Zone", selector: (row) => <span>{row?.zone}</span> },
    { name: "Recks", selector: (row) => <span>{row?.Recks}</span> },
    {
      name: "Menu",
      selector: (row, index) => (
        <>
          <Menuselector
            options={options}
            onSelect={(item) => handleSelect(item, index)}
            onOpen={() => handleOpenMenuSelector(index)}
            onClose={handleCloseMenuSelector}
            rowIndex={index}
            menuStyle={{
              "& .MuiPaper-root": {
                width: "200px!important",
                left: "calc(100% - 230px) !important",
              },
            }}
          />
        </>
      ),
      width: "200px",
    },
  ];
  return (
    <div>
      <StyledDOM.StyledReportHeading>All Reports</StyledDOM.StyledReportHeading>
      <SearchDOM.StyledMainSearchContainer className="Search">
        <SearchDOM.StyledSelectContainer className="select-container">
          <DatePicker
            label="From / Particular Date"
            dateFormat="dd/MM/yyyy"
            labelColor="black"
            divStyle={{ width: "100%", marginBottom: "0px" }}
            form={formik}
            placeholder="From / Particular Date"
            field={{
              name: "fromDate",
              value: formik.values.fromDate,
              onChange: (e) => {
                formik.setFieldValue("fromDate", e.target.value);
              },
              onBlur: () => {
                formik.setFieldTouched("fromDate", true);
              },
            }}
          />
          <DatePicker
            label="To Date"
            dateFormat="dd/MM/yyyy"
            labelColor="black"
            divStyle={{ width: "100%", marginBottom: "0px" }}
            form={formik}
            placeholder="To Date"
            field={{
              name: "toDate",
              value: formik.values.toDate,
              onChange: (e) => {
                formik.setFieldValue("toDate", e.target.value);
              },
              onBlur: () => {
                formik.setFieldTouched("toDate", true);
              },
            }}
          />
          <SelectInput
            label="Employee"
            labelColor="black"
            options={candidate}
            name="employee"
            value={formik.values.employee}
            onChange={formik.handleChange}
          />
          <SearchDOM.StyledButtonContainer className="button-container">
            <Button label="Search" event={formik.handleSubmit} />
            <Button
              label="Clear"
              isCancel={true}
              event={formik.resetForm}
              style={{ marginRight: "0px" }}
            />
          </SearchDOM.StyledButtonContainer>
        </SearchDOM.StyledSelectContainer>
      </SearchDOM.StyledMainSearchContainer>
      <SearchDOM.StyledExportButtonContainer>
        <Button label="Export As Excel" isExport={true} />
      </SearchDOM.StyledExportButtonContainer>
      <Table
        columns={columns}
        data={AllReports}
        fixedHeader={true}
        fixedHeaderScrollHeight={"500px"}
        highlightOnHover
        pagination={true}
        paginationPerPage={20}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
}

export default TeamsReport;
