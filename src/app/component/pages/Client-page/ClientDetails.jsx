import styled from "@emotion/styled";
import { ReactComponent as RightArrowIcon } from "../../../../assets/image/Right-Arrow-icon.svg";
export const StyledMainContainer = styled("div")({
  margin: "0px 30px 30px 30px",
  // padding: "50px 50px 50px 20px",
  boxSizing: "border-box",
  display: "flex",
  // marginBottom:"200px"
  borderRadius: "10px",
  border: "1px solid #FFFFFF",
});

export const StyledRightArrowIcon = styled(RightArrowIcon)({
  marginLeft:"15px"
})
export const StyledRightContainer = styled("div")({

  width: "100%",
  borderTop: "none",
  borderBottom: "none",
    borderRight: "none",
  padding:"0 0 0 0px"
});
export const StyledRightContainerHeader = styled("div")({
    borderBottom: "1px solid #CCCCCC",
    width: "100%",
  
});
export const StyledContentPage = styled("div")({
        width: "100%",
});
