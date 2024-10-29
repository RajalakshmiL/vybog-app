import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import Button from "../Button/Button";
import { ColumnItem } from "./ColumnItem";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactComponent as CancelIcon } from "../../../assets/image/Close-icon.svg";
import styled from "@emotion/styled";

export const StyledHeading = styled("h3")({
  margin: "0px",
  marginBottom: "5px",
});
export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    overflowY: "visible",
  },
});
export const StyledHelperText = styled("p")({
  margin: "0px",
  marginBottom: "10px",
  fontSize: "0.875rem",
  color: "#4d8300",
  background: "#bbf5bb",
  padding: "7px",
  borderRadius: "5px",
});
export const StyledDialogTitle = styled(DialogTitle)({
  borderBottom: "1px solid rgb(180, 180, 180)",
  marginBottom: "10px",
});
export const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: 10,
  top: 8,
});
export const StyledDialogContent = styled(DialogContent)({
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "5px",
    backgroundColor: "#e6f1f5",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "5px",
    backgroundColor: "#1b52a729",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#1b52a742",
  },
  "&::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#1b52a740",
  },
});
const ManageColumns = ({
  columns,
  selectedColumns,
  onSave,
  open,
  onClose,
  helperText,
}) => {
  const [localColumns, setLocalColumns] = useState([]);
  const [selectedColumnIds, setSelectedColumnIds] = useState([]);

  useEffect(() => {
    if (open) {
      const visibleColumnIds = columns
        .filter((column) => column.visible)
        .map((column) => column.id);
      setLocalColumns(columns);
      setSelectedColumnIds(visibleColumnIds);
    }
  }, [open, columns]);

  const handleCheckboxChange = useCallback((columnId) => {
    setSelectedColumnIds((prevSelected) =>
      prevSelected.includes(columnId)
        ? prevSelected.filter((id) => id !== columnId)
        : [...prevSelected, columnId]
    );
  }, []);

  const moveColumn = useCallback((dragIndex, hoverIndex) => {
    setLocalColumns((prevColumns) => {
      const reorderedColumns = Array.from(prevColumns);
      const [removed] = reorderedColumns.splice(dragIndex, 1);
      reorderedColumns.splice(hoverIndex, 0, removed);
      return reorderedColumns;
    });
  }, []);

  const handleSave = () => {
    const savedColumns = localColumns.map((column) => ({
      ...column,
      visible: selectedColumnIds.includes(column.id),
    }));
    onSave(savedColumns);
  };

  const selectedColumnsList = localColumns.filter((column) =>
    selectedColumnIds.includes(column.id)
  );
  const unselectedColumnsList = localColumns.filter(
    (column) => !selectedColumnIds.includes(column.id)
  );

  const sortedColumns = [...selectedColumnsList, ...unselectedColumnsList];

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledDialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            onClose();
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>
          <StyledHeading>Manage Columns</StyledHeading>
          {/* <StyledHelperText>{helperText}</StyledHelperText> */}
          <StyledIconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CancelIcon />
          </StyledIconButton>
        </StyledDialogTitle>
        <StyledDialogContent className="content-dialog">
          {sortedColumns.map((column, index) => (
            <ColumnItem
              key={column.id}
              id={column.id}
              text={column.name}
              index={index}
              moveColumn={moveColumn}
              isSelected={selectedColumnIds.includes(column.id)}
              onSelect={handleCheckboxChange}
            />
          ))}
        </StyledDialogContent>
        <DialogActions>
          <Button event={onClose} label="Cancel" isCancel={true} />
          <Button event={handleSave} label="Save" />
        </DialogActions>
      </StyledDialog>
    </DndProvider>
  );
};

export default ManageColumns;
