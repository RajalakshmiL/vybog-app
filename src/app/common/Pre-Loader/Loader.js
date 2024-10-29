import React from "react";
import styled from "@emotion/styled";

const DotsContainer = styled("section")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100%",
  position: "fixed",
  top: 0,
  background: "#ffffffa6",
  zIndex: 99999999,
});

const Dot = styled("div")(({ delay, dataLoader }) => ({
  height: dataLoader ? "8px" : "20px",
  width: dataLoader ? "8px" : "20px",
  marginRight: "10px",
  borderRadius: "10px",
  backgroundColor: "#e5ecfe",
  animation: `pulse 1.5s infinite ease-in-out`,
  animationDelay: delay,
  "&:last-child": {
    marginRight: 0,
  },
}));

const LoadercontentText = styled("p")({
  marginRight: "10px",
  color: "#0055a5",
  fontWeight: "600",
});
const LoaderContainer = styled("section")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginLeft: "10px",
  marginTop: "-20px",
});

const Loader = (props) => {
  const { dataLoader = false, loaderContentText = "" } = props;
  const LoaderContainerDiv = dataLoader ? LoaderContainer : DotsContainer;

  const pulseKeyframes = `
    @keyframes pulse {
      0% {
        transform: scale(0.8);
        background-color: #92bdf7;
        box-shadow: 0 0 0 0 #318dca;
      }
      50% {
        transform: scale(1.2);
        background-color: #336fbe;
        box-shadow: 0 0 0 ${dataLoader ? "5px" : "10px"} #d2e7f3;
      }
      100% {
        transform: scale(0.8);
        background-color: #0d6deb;
        box-shadow: 0 0 0 0 #ffffff;
      }
    }
  `;

  return (
    <LoaderContainerDiv>
      <style>{pulseKeyframes}</style>
      <LoadercontentText>{loaderContentText}</LoadercontentText>
      <Dot delay="-0.3s" dataLoader={dataLoader} />
      <Dot delay="-0.1s" dataLoader={dataLoader} />
      <Dot delay="0.1s" dataLoader={dataLoader} />
    </LoaderContainerDiv>
  );
};

export default Loader;
