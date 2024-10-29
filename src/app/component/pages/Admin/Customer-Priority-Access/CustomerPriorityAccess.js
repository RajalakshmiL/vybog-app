import React, { useState } from "react";
import * as StyledDOM from "../Menus/MenuStyle.jsx";
import Table from "../../../../common/Table/Table.js";
import priorityAccessData from "../../../../../assets/json/MenuMapping.json";
import CheckBox from "../../../../common/CheckBox/CheckBox.js";
import { ReactComponent as HotIcon } from "../../../../../assets/image/HotIcon.svg";
import { ReactComponent as WarmIcon } from "../../../../../assets/image/WarmIcon.svg";
import { ReactComponent as CoolIcon } from "../../../../../assets/image/CoolIcon.svg";
function CustomerPriorityAccess() {
  const [clientPriorityAccess, setClientPriorityAccess] = useState(
    priorityAccessData?.menuMapping?.ClientPriorityAccess || []
  );

  const handlePriorityChange = (designationIndex, userIndex, priorityType) => {
    setClientPriorityAccess((prevAccess) =>
      prevAccess.map((designation, dIndex) => {
        if (dIndex !== designationIndex) return designation;
        return {
          ...designation,
          users: designation.users.map((user, uIndex) => {
            if (uIndex !== userIndex) return user;
            const newPriority = user.priority.includes(priorityType)
              ? user.priority.filter((p) => p !== priorityType)
              : [...user.priority, priorityType];

            return { ...user, priority: newPriority };
          }),
        };
      })
    );
  };
  const columns = [
    {
      name: "User Name",
      selector: (row) => <span>{row.userName}</span>,
    },
    {
      name: (
        <StyledDOM.StyledColumnHeaderWithIcon>
          <HotIcon style={{ width: "30px", height: "30px" }} /> Hot
        </StyledDOM.StyledColumnHeaderWithIcon>
      ),
      cell: (row, index) => (
        <CheckBox
          checked={row.priority.includes("Hot")}
          onChange={() =>
            handlePriorityChange(row.designationIndex, row.userIndex, "Hot")
          }
        />
      ),
    },
    {
      name: (
        <StyledDOM.StyledColumnHeaderWithIcon>
          <WarmIcon style={{ width: "30px", height: "30px" }} /> Warm
        </StyledDOM.StyledColumnHeaderWithIcon>
      ),
      cell: (row, index) => (
        <CheckBox
          checked={row.priority.includes("Warm")}
          onChange={() =>
            handlePriorityChange(row.designationIndex, row.userIndex, "Warm")
          }
        />
      ),
    },
    {
      name: (
        <StyledDOM.StyledColumnHeaderWithIcon>
          <CoolIcon style={{ width: "30px", height: "30px" }} /> Cool
        </StyledDOM.StyledColumnHeaderWithIcon>
      ),
      cell: (row, index) => (
        <CheckBox
          checked={row.priority.includes("Cool")}
          onChange={() =>
            handlePriorityChange(row.designationIndex, row.userIndex, "Cool")
          }
        />
      ),
    },
  ];

  return (
    <>
      <StyledDOM.StyledMenuHeading>
        Customer Priority Access
      </StyledDOM.StyledMenuHeading>
      {clientPriorityAccess.map((group, groupIndex) => (
        <div key={groupIndex}>
          <StyledDOM.StyledPriorityHeading>
            {group.designation}
          </StyledDOM.StyledPriorityHeading>
          <Table
            columns={columns}
            data={group.users.map((user, userIndex) => ({
              userName: user.userName,
              priority: user.priority,
              designationIndex: groupIndex,
              userIndex: userIndex,
            }))}
            fixedHeader={true}
            fixedHeaderScrollHeight={"500px"}
            highlightOnHover
          />
        </div>
      ))}
    </>
  );
}

export default CustomerPriorityAccess;
