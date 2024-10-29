import styled from "@emotion/styled";

export const StyledHorizontalTabs = styled.div({
  width: "25%",
  display: "flex",
  flexDirection: "column",
  "@media screen and (max-width:1300px)": {
    width: "100%",
  },
});

export const StyledHorizontalTabsNew = styled.div({
  width: "100%",
  display: "flex",
  backgroundColor: "#ffffff",
  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
  flexDirection: "column",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  "@media screen and (max-width:999px)": {
    width:"auto",
    padding:"15px"
  },
});

export const StyledTabsList = styled.ul({
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "row",
  fontWeight: 500,
  gap:"3vw",
  "@media screen and (min-width:992px) and (max-width:1220px)": {
    gap:"3vw"
  },
  "@media screen and (max-width:991px)": {
    flexDirection: "column",
    gap:"1vw"
  },
});

export const StyledTabsListNew = styled.ul({
  listStyleType: "none",
  margin: "auto",
  padding: "25px 0px 0px 0px",
  display: "flex",
  flexDirection: "row",
  fontWeight: 500,
  gap: "30px",
  "@media screen and (min-width:1000px) and (max-width:1300px)": {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  "@media screen and (max-width:999px)": {
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    padding:"0"
  },
});

export const StyledTab = styled.li(
  {
    cursor: "pointer",
    textAlign: "center",
    // marginLeft: 30,
    padding: "8px 25px",
    display: "flex",
    alignItems:"center",
    gap: "5px",
    marginBottom:"15px",
     borderRadius: "8px",
    border: "none",
    // width: "100px",
    justifyContent:"center",
    //  gap:"30px",
     "@media screen and (min-width:640px) and (max-width:991px)": {
     width:"auto"
    },
    "@media screen and (min-width:992px) and (max-width:1300px)": {
      padding: "10px",
      marginLeft: 0,
      justifyContent: "center",
      marginBottom: "0px",
      width:"100px"
    },
    "@media screen and (min-width:1800px)": {
      padding: "8px 50px",
    },
  },
  ({ active }) => ({
   
    color: active ? "white" : "#0D52A7",
    backgroundColor: active ? "#0D52A7" : "#0D52A70D",
    display: "flex",
    gap: "5px",
    padding: "8px 25px",
  })
);

export const StyledTabNew = styled.li(
  {
    cursor: "pointer",
    textAlign: "center",
    marginBottom: "0px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "@media screen and (max-width:999px)": {
      padding: "5px",
      marginLeft: 0,
      backgroundColor: "#0D52A70D",
      alignItems: "center",
      justifyContent: "center",
      borderRadius:"8px",
    },
  },
  ({ active }) => ({
    borderBottom: active ? "2px solid #2b68b2" : "none",
    padding: active ? "15px 15px 13px 10px" : "15px 15px 15px 10px",
    color: active ? "#2b68b2" : "black",
    "@media screen and (max-width:999px)": {
      backgroundColor: active ? "#2b68b2" : "#0D52A70D",
      color: active ? "white" : "black",
    },
  })
);
export const StyledTabMessage = styled.li(
  {
    cursor: "pointer",
    textAlign: "center",
    padding: "0px 5px",
    "@media screen and (max-width:768px)": {
      padding: "5px",
      marginLeft: 0,
    },
  },
  ({ active }) => ({
    color: active ? "#000000" : "#b1bfce",
  })
);

export const StyledMessage = styled.div(
  {
    display: "flex",
    flexDirection: "row",
    marginLeft: "30px",
    borderBottom: "5px solid #f0d90c",
  },
  ({ active }) => ({
    borderBottom: active ? "5px solid #f0d90c" : "none",
    color: active ? "#000000" : "#b1bfce",
  })
);
