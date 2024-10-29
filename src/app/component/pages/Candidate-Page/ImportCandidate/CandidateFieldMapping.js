import React, { useState } from "react";
import Table from "../../../../common/Table/Table";
import DynamicSelectInput from "../../../../common/SelectInput/SelectInput";
import jsonData from "../../../../../assets/json/Table.json";
import OptionData from "../../../../../assets/json/staticData.json";
import Button from "../../../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import * as StyledDOM from "../ImportCandidate/CandidateFieldMapping.jsx";

function CandidateFieldMapping() {
  const navigate = useNavigate();
  const { staticdata = {} } = jsonData || {};
  const { candidateFieldMappings = {} } = staticdata || {};
  const { headerData = [], sampleData = [] } = candidateFieldMappings || {};

  const { staticData = {} } = OptionData || {};
  const { MappingFields = [] } = staticData || {};

  const rows = Object.keys(headerData[0] || {}).map((key) => ({
    key,
    header: headerData[0][key],
    value: sampleData[0]?.[key] || "",
  }));

  const [selectedOptions, setSelectedOptions] = useState({});
  const [splitScreen, setSplitScreen] = useState(false);
  const getAvailableOptions = (currentKey) => {
    const selectedOption = selectedOptions[currentKey];
    return MappingFields.filter(
      (option) =>
        option.title === selectedOption ||
        !Object.values(selectedOptions).includes(option.title)
    );
  };

  const handleSelectChange = (key, selectedOption) => {
    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [key]: selectedOption,
    }));
  };

  const handleFinish = () => {
    setSplitScreen(true);
  };
  const columns = [
    {
      name: "Field Name (From Uploaded File)",
      selector: (row) => (
        <>
          <StyledDOM.StyledSampleHeader>
            {row?.header} :
          </StyledDOM.StyledSampleHeader>
          <StyledDOM.StyledSampleValueSpan>
            {row?.value}
          </StyledDOM.StyledSampleValueSpan>
        </>
      ),
    },
    {
      name: "Mapping Fields",
      cell: (row) => {
        const selectedValue = selectedOptions[row.key] || "";
        console.log("Selected value :", `${row.header}: ${selectedValue}`);
        return (
          <DynamicSelectInput
            options={getAvailableOptions(row.key)}
            value={selectedValue}
            onChange={(e) => handleSelectChange(row.key, e.target.value)}
            labelKey="title"
          />
        );
      },
    },
  ];

  const handleResetSelectedMapping = () => {
    setSelectedOptions({});
  };
  return (
    <StyledDOM.StyledSplitScreen className="split-container">
      <StyledDOM.StyledOverallContainer
        className="candidatefieldMapping-container"
        splitScreen={splitScreen}
      >
        <StyledDOM.StyledHeading className="candidate-heading">
          Candidate Field Mapping
        </StyledDOM.StyledHeading>
        <StyledDOM.StyledButtonContainer className="Button-container">
          <Button
            label={"Reset Mapping"}
            isCancel={true}
            event={handleResetSelectedMapping}
          />
          <Button
            label={"Back"}
            isCancel={true}
            event={() => {
              navigate("/import-candidate");
            }}
          />
          <Button label={"Finish"} event={handleFinish} />
        </StyledDOM.StyledButtonContainer>
        <Table
          columns={columns}
          data={rows}
          fixedHeader={true}
          fixedHeaderScrollHeight={"500px"}
          highlightOnHover
        />
      </StyledDOM.StyledOverallContainer>
      {splitScreen ? (
        <StyledDOM.StyledInsertMainContainer className="insert-container">
          <StyledDOM.StyledDisplayCountHeader>
            Insert File's Details
          </StyledDOM.StyledDisplayCountHeader>
          <div className="message-container">
            <StyledDOM.StyledSuccessCountValueContainer className="inner-container">
              <StyledDOM.StyledDisplayContent>
                Total Count <span>984</span>
              </StyledDOM.StyledDisplayContent>
            </StyledDOM.StyledSuccessCountValueContainer>
            <StyledDOM.StyledSuccessCountValueContainer className="inner-container">
              <StyledDOM.StyledDisplayContent>
                Inserted Count <span>941</span>
              </StyledDOM.StyledDisplayContent>
            </StyledDOM.StyledSuccessCountValueContainer>
            <StyledDOM.StyledErrorCountValueContainer className="inner-container">
              <StyledDOM.StyledDisplayContent>
                Error Count <span>43</span>
              </StyledDOM.StyledDisplayContent>
            </StyledDOM.StyledErrorCountValueContainer>
            <StyledDOM.StyledErrorCountValueContainer className="inner-container">
              <StyledDOM.StyledDisplayContent>
                Email Or Phone.No already Existing Count <span>26</span>
              </StyledDOM.StyledDisplayContent>
            </StyledDOM.StyledErrorCountValueContainer>
            <StyledDOM.StyledErrorCountValueContainer className="inner-container">
              <StyledDOM.StyledDisplayContent>
                Email already Exists in File Count<span>16</span>
              </StyledDOM.StyledDisplayContent>
            </StyledDOM.StyledErrorCountValueContainer>
            <StyledDOM.StyledErrorCountValueContainer className="inner-container">
              <StyledDOM.StyledDisplayContent>
                Phone.No already Exists in File Count<span>1</span>
              </StyledDOM.StyledDisplayContent>
            </StyledDOM.StyledErrorCountValueContainer>
          </div>
        </StyledDOM.StyledInsertMainContainer>
      ) : null}
    </StyledDOM.StyledSplitScreen>
  );
}

export default CandidateFieldMapping;
