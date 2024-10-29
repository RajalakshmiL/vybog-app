import React from "react";
import loginAnimation from "../../../assets/json/loginAnimation.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import styled from "@emotion/styled";

export const StyledAnimationContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});
export const Styledleftfirstpara = styled("p")({
  fontSize: "32px",
  fontWeight: "300",
  textAlign: "center",
  color: "white",
  marginTop: "100px",
  padding:"10px"
});
export const StyledCreateAccountLeftContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: "linear-gradient(143.68deg, #0D52A7 -3.19%, #4181D0 120.57%)",
  "@media screen and (min-width:300px) and (max-width:768px)": {
    display: "none",
  },
  "@media screen and (min-width:769px) and (max-width:920px)": {
    display: "none",
  },
});
export const Styledleftfirstparaspan = styled("span")({
  fontSize: "32px",
  fontWeight: "600",
  textAlign: "center",
  marginLeft: "12px",
  color: "white",
});
export const Styledleftlastpara = styled("p")({
  fontSize: "24px",
  fontWeight: "300",
  textAlign: "center",
  color: "white",
  margin: "0px 30px 30px 30px",
});
  
function LeftSideBanner(props) {
  const {
    normalContentText = "",
    boldContentText = "",
    downContentText = "",
  } = props || {};
  return (
    <StyledCreateAccountLeftContainer className="create-account-left-container">
      <Styledleftfirstpara className="create-account-left-container-para">
        {normalContentText}
        <Styledleftfirstparaspan className="create-account-left-container-para-span">
          {boldContentText}
        </Styledleftfirstparaspan>
      </Styledleftfirstpara>
      <StyledAnimationContainer className="login-animation">
        <Player autoplay loop src={loginAnimation}>
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </StyledAnimationContainer>
      <Styledleftlastpara className="create-account-left-container-para">
        {downContentText}
      </Styledleftlastpara>
    </StyledCreateAccountLeftContainer>
  );
}

export default LeftSideBanner;
