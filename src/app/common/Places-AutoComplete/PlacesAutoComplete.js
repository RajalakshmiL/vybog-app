import React, { useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import * as StyledDOM from "./PlacesAutoComplete.jsx";

const PlacesAutoComplete = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (value.length < 3) {
        setSuggestions([]);
        setNoResults(false);
        return;
      }

      const cached = localStorage.getItem(value.toLowerCase());
      if (cached) {
        const parsedCache = JSON.parse(cached);
        setSuggestions(parsedCache);
        setNoResults(parsedCache.length === 0);
        return;
      }

      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: value,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
            headers: {
              "Accept-Language": "en",
            },
          }
        );

        if (response.data.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }

        setSuggestions(response.data);
        setError(null);

        localStorage.setItem(
          value.toLowerCase(),
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setError("Failed to fetch suggestions. Please try again.");
        setSuggestions([]);
        setNoResults(false);
      }
    }, 300),
    []
  );

  const onChangeHandler = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
    setNoResults(false);
  };

  const onSuggestionSelectedHandler = (event, { suggestion }) => {
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  const renderSuggestion = (suggestion) => (
    <StyledDOM.StyledSuggestionItem>
      {suggestion.display_name}
    </StyledDOM.StyledSuggestionItem>
  );

  const inputProps = {
    placeholder: "Search for places...",
    value,
    onChange: onChangeHandler,
    className: "autocomplete-input",
  };

  return (
    <StyledDOM.StyledAutocompleteContainer className="AutocompleteContainer">
      <StyledDOM.StyledAutocompleteInput
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.display_name}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelectedHandler}
        inputProps={inputProps}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <StyledDOM.StyledSuggestionsContainer {...containerProps}>
            <StyledDOM.StyledSuggestionsList>
              {children}
            </StyledDOM.StyledSuggestionsList>
          </StyledDOM.StyledSuggestionsContainer>
        )}
      />
      {noResults && (
        <StyledDOM.StyledNoResultSuggestion className="no-results">
          No results found.
        </StyledDOM.StyledNoResultSuggestion>
      )}
      {error && <div className="error-message">{error}</div>}
    </StyledDOM.StyledAutocompleteContainer>
  );
};

export default PlacesAutoComplete;
