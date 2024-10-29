import { styled } from "@mui/material/styles";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { ReactComponent as CloseIcon } from "../../../assets/image/cancel-icon.svg";

export const Tag = (props) => {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <StyledSpan>
        <CloseIcon onClick={onDelete} />
      </StyledSpan>
    </div>
  );
};

export const StyledRoot = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
    };
  font-size: 14px;
  width: 100%;
`
);

export const StyledSpan = styled("span")({
  border: "1px solid white",
  position: "relative",
  borderRadius: "50%",
  width: "21px",
  height: "21px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  color: "#7f7f7f",
  marginLeft: "5px",
});

export const StyledLabel = styled("label")(
  ({ theme, isVisible, labelColor, backgroundColor }) => `
  position: absolute;
  left: 8px; 
  top: ${isVisible ? "0.6em" : "calc(100% - 50%)"};
  transform: ${isVisible ? "translateY(-100%)" : "translateY(0)"};
  color: ${labelColor};
  font-size: 12px;
  pointer-events: none;
  transition: all 0.3s ease;
  opacity: ${isVisible ? 1 : 0};
  background-color: ${backgroundColor};
  padding: 0 5px;
  z-index: 1;

  & .asterisk {
    color: red;
    margin-left:2px;
  }
`
);

export const StyledInputWrapper = styled("div")(
  ({ theme, labelColor, backgroundColor }) => `
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 7px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  &.focused {
    border-color: #ccc;
  }

  & input::placeholder {
    color: rgba(0,0,0,0.7);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.65)"
      : "rgba(0,0,0,.85)"
    };
    box-sizing: border-box;
    padding: 10px 6px;
    width: 0;
    min-width: 30px;
    height:33px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    overflow: auto;
    position: relative;
  }

  & input::placeholder {
    font-size: 14px;
  }

  & .placeholder {
    color: rgba(0,0,0,0.7);
  }

  & .asterisk {
    color: red;
margin-right: 310px;
margin-top: 3px;
  }
`
);

export const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 31px;
  margin: 2px;
  line-height: 22px;
  background-color:#00000080;
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 12px;
  box-sizing: content-box;
  padding: 0 10px;
  outline: 0;
  overflow: auto;
  color:white;
  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

export const StyledAutoCompleteOuterDiv = styled("div")(`
  width: 100%;
  border-radius: 7px;
  box-sizing: border-box;
  outline: none;
`);

export const StyledListbox = styled("ul")(
  ({ theme }) => `
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 99;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export const StyledListItem = styled("li")(({ isSelected }) => ({
  backgroundColor: isSelected ? "#d2e6fd" : "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: isSelected ? "#0055a5" : "black",
}));

export const StyledArrowDiv = styled("div")({
  cursor: "pointer",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
});

export const StyledErrorMessage = styled("div")({
  color: "red",
  fontSize: "14px",
  marginTop: "6px"
});
