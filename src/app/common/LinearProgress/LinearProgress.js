import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

function LinearIndeterminate() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

function CustomizedProgressBars(props) {
  const { value, tooltipTitle } = props;

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#004b9e",
      color: "#fff",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }} className="Tooltipmain-container">
      <StyledTooltip title={tooltipTitle} className="Tooltip-container">
        <BorderLinearProgress variant="determinate" value={value} />
      </StyledTooltip>
    </Stack>
  );
}

export { LinearIndeterminate, CustomizedProgressBars };
