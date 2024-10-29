import React from 'react'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import dataNotfound from "../../../assets/json/No_data_found_Animation.json"
import styled from "@emotion/styled"

export const StyledH2Content = styled("h2")({
    color:"#2e7ffb"
})
function DataNotFound({ dataNotFoundMessage }) {
  return (
      <div>
      <StyledH2Content>{ dataNotFoundMessage}</StyledH2Content>
        <Player autoplay loop src={dataNotfound}>
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
    </div>
  )
}

export default DataNotFound