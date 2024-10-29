import styled from "@emotion/styled"
import Autosuggest from "react-autosuggest";

export const StyledAutocompleteContainer = styled("div")({
  position: "relative",
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
});

export const StyledAutocompleteInput = styled(Autosuggest)({
    ".autocomplete-input": {
         width: "100%",
  padding: "10px 15px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box", 
    }

});

export const StyledSuggestionItem = styled("div")({
  padding: "10px 15px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

export const StyledSuggestionsContainer = styled("div")({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1000,
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  borderTop: "none",
  maxHeight: "200px",
  overflowY: "auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

export const StyledSuggestionsList = styled("ul")({
  listStyle: "none",
  margin: 0,
  padding: 0,
});

export const StyledSuggestion = styled("li")({
  padding: "10px 15px",
  cursor: "pointer",
  "&.react-autosuggest__suggestion--highlighted": {
    backgroundColor: "#f0f0f0",
  },
});

export const StyledNoResultSuggestion = styled("div")({
  width: "100%",
  padding: "10px",
  textAlign: "center",
  color:"red",
})