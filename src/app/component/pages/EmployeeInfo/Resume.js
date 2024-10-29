import React, { useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import * as StyledDOM from "./Messaging.jsx";
import pdf from "../../../../assets/resume.pdf";
function Resume() {
  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: pdf,
    canvasRef,
  });

  return (
    <StyledDOM.ResumeMainContainer className="resumemain-container">
      <div
        className="resumebutton-div"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <StyledDOM.ResumeDownload
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <StyledDOM.StyledIcon></StyledDOM.StyledIcon>
          <StyledDOM.StyledButton label="Download"></StyledDOM.StyledButton>
        </StyledDOM.ResumeDownload>
      </div>

      <StyledDOM.ParsedResume>
        <StyledDOM.ParsedCanvas ref={canvasRef} />
        {Boolean(pdfDocument && pdfDocument.numPages)}
      </StyledDOM.ParsedResume>
    </StyledDOM.ResumeMainContainer>
  );
}

export default Resume;
