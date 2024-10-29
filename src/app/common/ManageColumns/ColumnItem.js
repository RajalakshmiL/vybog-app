import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "@emotion/styled";
import drapAndDropIcon from "../../../assets/image/drag-icon.svg";

export const ItemTypes = {
  COLUMN: "column",
};

const StyledDragAndDropIcon = styled("img")({
  width: "16px",
  float: "right",
  marginTop: "4px",
});

const StyledCheckbox = styled("input")({
  marginRight: "10px",
});

const StyledColumnItem = styled("div")(({ isDragging, isSelected }) => ({
  border: "1px solid rgb(180, 180, 180)",
  padding: "0.5rem 1rem",
  marginBottom: "0.5rem",
  backgroundColor: "white",
  cursor: isSelected ? "move" : "no-drop",
  borderRadius: "5px",
  opacity: isDragging ? 0 : 1,
  fontSize: "14px",
  fontWeight: "500",
}));

export const ColumnItem = React.memo(
  ({ id, text, index, moveColumn, isSelected, onSelect }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
      accept: ItemTypes.COLUMN,
      hover(item) {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;

        moveColumn(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.COLUMN,
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <StyledColumnItem
        ref={ref}
        isDragging={isDragging}
        isSelected={isSelected}
      >
        <StyledCheckbox
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(id)}
        />
        {text}
        <StyledDragAndDropIcon src={drapAndDropIcon} alt="Drag and Drop" />
      </StyledColumnItem>
    );
  }
);
