import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CustomPagination(props) {
  const { count, page, onChange = () => "", color } = props || {};
  return (
    <Stack spacing={2}>
      <Pagination count={count} color={color} page={page} onChange={onChange} />
    </Stack>
  );
}
