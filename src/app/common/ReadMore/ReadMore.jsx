import React, { useState } from "react";
import PropTypes from "prop-types";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styled from "@emotion/styled"

export const StyledReadMoreButton = styled("button")({
     marginLeft: "-9px",
          border: "none",
          background: "none",
          color: "#0055a5",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
})

const ReadMore = ({ children, maxCharacterCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = children;

  if (content.length <= maxCharacterCount) {
    return <span>{content}</span>;
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <span>
        {isExpanded ? content : `${content.substring(0, maxCharacterCount)}...`}
      </span>
      <StyledReadMoreButton onClick={toggleExpansion}>
        {isExpanded ? (
          <>
            Read less
            <ArrowDropUpIcon />
          </>
        ) : (
          <>
            Read more
            <ArrowDropDownIcon />
          </>
        )}
      </StyledReadMoreButton>
    </div>
  );
};

ReadMore.propTypes = {
  children: PropTypes.string.isRequired,
  maxCharacterCount: PropTypes.number.isRequired,
};

export default ReadMore;
