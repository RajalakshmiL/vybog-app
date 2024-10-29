import styled from "@emotion/styled"

export const StyledOverallContainer = styled("div")(({ splitScreen }) => ({
    width: splitScreen ? "70%" : "100%",
    "@media screen and (max-width:991px)": {
        width: "100%",
    },
}))
export const StyledButtonContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginBottom: "20px",
    marginRight: "30px",
})

export const StyledHeading = styled("h2")({
    marginLeft: "20px",
})

export const StyledSampleValueSpan = styled("span")({
    color: "#0039ff",
    position: "relative",
    bottom: "10px",
})

export const StyledSampleHeader = styled("h3")({
    color: "#626262",
    marginTop: "13px"
})

export const StyledSplitScreen = styled("div")({
    display: "flex",
    flexDirection: "row",
    "@media screen and (max-width:991px)": {
        flexDirection: "column",
    },
})

// Insert Tab Container CSS

export const StyledInsertMainContainer = styled("div")({
    margin: "50px",

})

export const StyledDisplayCountHeader = styled("h3")({
    border: "1px solid grey",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    background: "#0055a5",
    color: "#fff",
    fontSize: "16px",
    width: "100%"
})

export const StyledDisplayCountValueContainer = styled("div")({
    padding: "0px 10px",
    border: "1px solid gray",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "13px",
    background: "#eff8ff",
    color: "#0055a5",
    width: "100%"
})

export const StyledSuccessCountValueContainer = styled("div")({
    padding: "0px 10px",
    border: "1px solid #007f19",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#007f19",
    width: "100%"
})

export const StyledErrorCountValueContainer = styled("div")({
    padding: "0px 10px",
    border: "1px solid #f40303",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "13px",
    color: "#fc0505e3",
    width: "100%"
})

export const StyledDisplayContent = styled("h4")({
    display: "flex",
    justifyContent: "space-between"

})