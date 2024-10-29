import React, { useEffect, useContext } from "react";
import leaveData from "../../../../../assets/json/Table.json";
import Table from "../../../../common/Table/Table";
import * as StyledDOM from "../Employee-Leave-Details/EmpLeave.jsx";
import SelectInput from "../../../../common/SelectInput/SelectInput";
import Button from "../../../../common/Button/Button";
import DynamicCheckbox from "../../../../common/CheckBox/CheckBox";
import { useFormik } from "formik";
import optionsJsonData from "../../../../../assets/json/staticData.json";
import DynamicSkeleton from "../../../../common/Skeleton/Skeleton";
import { DynamicContext } from "../../../../context/DynamicContext";
function EmpYearWiseLeaveHistory() {
  const { staticData = {} } = optionsJsonData || {};
  const { candidate = [] } = staticData || [];
  const { staticdata = {} } = leaveData || {};
  const { EmployeeYearWiseLeaveDetails = [] } = staticdata || {};
  const { skeletonLoading, setSkeletonLoading } = useContext(DynamicContext);
  const formik = useFormik({
    initialValues: {
      employee: "",
      year: "",
      show_Compoff_Pl_EMP: false,
    },
    onSubmit: () => {
      console.log("Search Values", formik.values);
    },
  });
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, index) => ({
    title: currentYear - index,
  }));

  const columns = [
    {
      name: "Name",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <span>{row?.name}</span>
        ),
    },
    {
      name: "Year",
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <span>{row?.year}</span>
        ),
    },
    {
      name: (
        <StyledDOM.StyledColumnContainer>
          <StyledDOM.StyledGroupedHeader>
            Applicable
          </StyledDOM.StyledGroupedHeader>
          <StyledDOM.StyledContentHeaders>
            <StyledDOM.StyledContentSpan className="CLSpan">
              CL
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="MLSpan">
              ML
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="WFHSpan">
              WFH
            </StyledDOM.StyledContentSpan>
          </StyledDOM.StyledContentHeaders>
        </StyledDOM.StyledColumnContainer>
      ),
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledContent className="content-outer">
            <StyledDOM.StyledContentSpan className="CLSpan">
              {row?.applicable?.cl}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="MLSpan">
              {row?.applicable?.ml}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="WFHSpan">
              {row?.applicable?.wfh}
            </StyledDOM.StyledContentSpan>
          </StyledDOM.StyledContent>
        ),
      sortable: false,
    },
    {
      name: (
        <StyledDOM.StyledColumnContainer>
          <StyledDOM.StyledGroupedHeader>
            Taken by employee
          </StyledDOM.StyledGroupedHeader>
          <StyledDOM.StyledContentHeaders>
            <StyledDOM.StyledContentSpan className="TotalSpan">
              Total
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="CLSpan">
              CL
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="MLSpan">
              ML
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="WFHSpan">
              WFH
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="PLSpan">
              PL
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="CompOFFSpan">
              CompOFF
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="NPDSpan">
              NPD
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="LOPSpan">
              LOP
            </StyledDOM.StyledContentSpan>
          </StyledDOM.StyledContentHeaders>
        </StyledDOM.StyledColumnContainer>
      ),
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledContent>
            <StyledDOM.StyledContentSpan className="TotalSpan">
              {row?.takenByEmployee?.totalDays}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="CLSpan">
              {row?.takenByEmployee?.cl}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="MLSpan">
              {row?.takenByEmployee?.ml}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="WFHSpan">
              {row?.takenByEmployee?.wfh}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="PLSpan">
              {row?.takenByEmployee?.pl}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="CompOFFSpan">
              {row?.takenByEmployee?.compOff}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="NPDSpan">
              {row?.takenByEmployee?.npd}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="LOPSpan">
              {row?.takenByEmployee?.lop}
            </StyledDOM.StyledContentSpan>
          </StyledDOM.StyledContent>
        ),
      sortable: false,
      width: "380px",
    },
    {
      name: (
        <StyledDOM.StyledColumnContainer>
          <StyledDOM.StyledGroupedHeader>
            Available
          </StyledDOM.StyledGroupedHeader>
          <StyledDOM.StyledContentHeaders>
            <StyledDOM.StyledContentSpan className="CLSpan">
              CL
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="MLSpan">
              ML
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="WFHSpan">
              WFH
            </StyledDOM.StyledContentSpan>
          </StyledDOM.StyledContentHeaders>
        </StyledDOM.StyledColumnContainer>
      ),
      selector: (row) =>
        skeletonLoading ? (
          <DynamicSkeleton variant="text" />
        ) : (
          <StyledDOM.StyledContent>
            <StyledDOM.StyledContentSpan className="CLSpan">
              {row?.available?.cl}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="MLSpan">
              {row?.available?.ml}
            </StyledDOM.StyledContentSpan>
            <StyledDOM.StyledContentSpan className="WFHSpan">
              {row?.available?.wfh}
            </StyledDOM.StyledContentSpan>
          </StyledDOM.StyledContent>
        ),
      sortable: false,
    },
  ];
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSkeletonLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <StyledDOM.StyledEmployeeHeading>
        Yearly Leave History
      </StyledDOM.StyledEmployeeHeading>
      <StyledDOM.StyledMainSearchContainer className="Main-container">
        <StyledDOM.StyledSelectContainer className="select-container">
          <SelectInput
            label="Employee"
            labelColor="black"
            options={candidate}
            name="employee"
            value={formik.values.employee}
            onChange={formik.handleChange}
          />
          <SelectInput
            label="Year"
            labelColor="black"
            options={yearOptions}
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
          />
          <DynamicCheckbox
            label="Show only Comp OFF / PL assigned employees"
            labelStyle={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#000000",
            }}
            checked={formik.values.show_Compoff_Pl_EMP}
            onChange={(e) =>
              formik.setFieldValue("show_Compoff_Pl_EMP", e.target.checked)
            }
          />

          <StyledDOM.StyledButtonContainer className="button-container">
            <Button label="Search" event={formik.handleSubmit} />
            <Button
              label="Clear"
              isCancel={true}
              event={formik.resetForm}
              style={{ marginRight: "0px" }}
            />
          </StyledDOM.StyledButtonContainer>
        </StyledDOM.StyledSelectContainer>
      </StyledDOM.StyledMainSearchContainer>
      <StyledDOM.StyledExportButtonContainer>
        <Button isExport={true} label="Export As Excel" />
      </StyledDOM.StyledExportButtonContainer>
      <Table
        data={EmployeeYearWiseLeaveDetails}
        columns={columns}
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

export default EmpYearWiseLeaveHistory;
