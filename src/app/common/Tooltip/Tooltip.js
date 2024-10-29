import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";

const CustomTooltip = ({ children, title }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const showTooltipHandler = (event) => {
    const offsetX = 5;
    const offsetY = 5;

    setTooltipPosition({
      top: event.clientY + offsetY,
      left: event.clientX + offsetX,
    });

    setShowTooltip(true);
  };

  const hideTooltipHandler = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div
        onMouseEnter={showTooltipHandler}
        onMouseLeave={hideTooltipHandler}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>

      {showTooltip && (
        <Tooltip
          open={showTooltip}
          title={title}
          onClose={hideTooltipHandler}
          disableHoverListener
          arrow
          style={{
            position: "fixed",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            pointerEvents: "none",
          }}
        >
          <div />
        </Tooltip>
      )}
    </>
  );
};

export default CustomTooltip;
