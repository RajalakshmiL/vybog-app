import styled from "@emotion/styled";

export const StyledVerticalTabs = styled.div({
  width: "25%",
  '@media screen and (max-width:768px)': {
    width: "100%"
  }
});

export const StyledTabsList = styled.ul({
  listStyleType: "none",
  padding: 0
});

export const StyledTab = styled.li(
  {
    cursor: "pointer",
    padding: 30,
    textAlign: "center",
    borderRadius: 8,
    marginLeft: 20,
    marginBottom: 10,
    '@media screen and (max-width:768px)': {
      padding: '5px',
      marginLeft: 0,
    }
  },
  ({ active }) => ({
    backgroundColor: active ? "#757474" : "#DEDEDE",
    color: active ? "#FFFFFF" : "#000000"
  })
);
