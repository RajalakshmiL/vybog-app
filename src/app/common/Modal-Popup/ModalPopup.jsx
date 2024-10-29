import styled from "@emotion/styled";
import Button from "../Button/Button"
export const StyledPopupMainContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: "999"
})

export const StyledPopupOuter = styled("div")({
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  maxWidth: "90%",
  position: "relative",
})

export const StyledPopupHeading = styled("div")({
  position: "absolute",
  top: "10px",
  right: "10px",
})

export const StyledCloseIcon = styled("img")({
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer"
})

export const StyledPopupContent = styled("div")({
  textAlign: "center"
})

export const StyledPopupBody = styled("div")({
  padding: "20px 10px"
})

export const StyledPopupActions = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  gap: "30px",
})

export const StyledPopupTitle = styled("h2")({
  color: "black",
  marginTop: "-6px"
})

export const StyledPopupSubtitle = styled("p")({
  fontWeight: "600",
  fontSize: "15px",
  padding: "6px 1px",
  borderRadius: "5px",
  color: "#3772c9",
  marginTop: "-6px"
})

export const StyledButton = styled(Button)(({ normalButton }) => ({
  padding: "10px 30px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "0 5px",
  "&.cancel-button": {
    background: normalButton ? "#0D52A7" : "#ccc",
    color: normalButton ? "white" : "black"
  },
  "&.confirm-button": {
    background: normalButton ? "#0D52A7" : "red",
    color: "white"
  },
}))

//For content dialog

export const StyledPopupInnerContainer = styled("div")(({ contentHeight, contentWidth }) => ({
  background: "#fff",
  width: contentWidth ? contentWidth : "500px",
  height: contentHeight ? contentHeight : "auto",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
  animation: "open-frame 0.3s linear",
  padding: "20px",
  overflowY: contentHeight > "400px" ? "scroll" : "hidden",
  "@media screen and (max-width:600px)": {
    width: "300px",
  },
  "@media screen and (min-width:600px) and (max-width:712px)": {
    width:"500px",
  },
    "@media screen and (min-width:713px) and (max-width:991px)": {
    width:"600px",
  },
   '&::-webkit-scrollbar': {
    width: "10px",
    height: "10px", 
  },
  '&::-webkit-scrollbar-track': {
    borderRadius: "5px",
    backgroundColor: "#e6f1f5",
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: "5px",
    backgroundColor: "#1b52a729", 
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: "#1b52a742",
  },
  '&::-webkit-scrollbar-thumb:active': {
    backgroundColor: "#1b52a740",
  },
}))

export const StyledMessage = styled("p")({
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "20px",
  color: "#222",
  cursor: "default",
});

export const StyledInputContainer = styled("div")({
  display: "flex",
  gap: "10px",
});

export const StyledHeading = styled("h3")({
  margin: "0px",
  marginBottom: "25px",
});

export const StyledAnchor = styled("a")({
  textDecoration: "none",
  color: "#0F3FE9",
  cursor: "pointer",
});

export const StyledButtonDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  columnGap: "10px",
});

export const StyledDiv = styled("div")(({ showMoreOptions }) => ({
  display: "flex",
  justifyContent: showMoreOptions ? "space-between" : "flex-end",
  marginTop: "40px",
}))

export const StyledPopupCancelIcon = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  cursor: "pointer",
});

export const StyledHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});