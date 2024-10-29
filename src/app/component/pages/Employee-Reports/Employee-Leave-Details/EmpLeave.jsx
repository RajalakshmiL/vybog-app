import styled from "@emotion/styled";

export const StyledColumnContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "10px",
});

export const StyledGroupedHeader = styled("div")({
  textAlign: "center",
  marginTop: "12px",
  marginBottom: "10px",
  borderBottom: "2px solid #0055a54a",
  width: "100%",
  paddingBottom: "8px",
});

export const StyledContentHeaders = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "5px",
  fontSize: "0.9rem",
  fontWeight: "500",
  color: "#333",
});

export const StyledContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  margin: "10px 0",
});

export const StyledEmployeeHeading = styled("h2")({
  fontWeight: "600",
  padding: "0px 20px",
  color: "#2c3e50",
  fontSize: "1.2rem",
});

export const StyledContentSpan = styled("span")({
  display: "block",
  padding: "5px",
  textAlign: "center",
  "&.CLSpan, &.MLSpan, &.WFHSpan, &.TotalSpan, &.PLSpan, &.LOPSpan": {
    width: "20%",
  },
  "&.CompOFFSpan": {
    width: "35%",
  },
  "&.NPDSpan": {
    width: "20%",
  },
});

export const StyledSelectContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  columnGap: "30px",
  rowGap: "30px",
  margin: "20px",
  zIndex: "99",
  position: "relative",
  "@media screen and (min-width:992px) and (max-width: 1200px)": {
    gridTemplateColumns: "1fr 1fr 1fr",
  },

  "@media screen and (min-width:600px) and (max-width:991px)": {
    gridTemplateColumns: "1fr",
    rowGap: "20px",
  },
});

export const StyledButtonContainer = styled("div")({
  display: "flex",
  gap: "40px",
  alignContent: "flex-start",
  flexWrap: "wrap",
  "@media screen and (min-width:600px) and (max-width:991px)": {
    justifyContent: "flex-end",
    gap: "20px",
  },
});

export const StyledMainSearchContainer = styled("div")({
  margin: "30px",
  border: "1px solid #e4e4e4",
  borderRadius: "5px",
});

export const StyledExportButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
  marginBottom: "10px",
  marginRight: "30px",
});
