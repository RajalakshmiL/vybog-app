import React, { useState } from "react";
import SelectInput from "../../../common/SelectInput/SelectInput";
import * as StyledDOM from "../Admin/Menus/MenuStyle.jsx";
import TextEditor from "../../../common/TextEditer/TextEditer";
import AddIcon from "../../../../assets/image/GreenPlusIcon.svg";
import Button from "../../../common/Button/Button";

function ComposeMail() {
  const [showBcc, setShowBcc] = useState(false);
  const buttons = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "table"],
    ["link", "image", "video"],
    ["fullScreen", "showBlocks", "codeView"],
    // ["preview", "print"],
    ["save"],
  ];
  return (
    <>
      <StyledDOM.StyledMenuHeading>Compose Mail</StyledDOM.StyledMenuHeading>
      <StyledDOM.StyledComposeSideSpan>
        Click to add recipient(s)
      </StyledDOM.StyledComposeSideSpan>
      <div className="outer-container">
        <StyledDOM.StyledButtonStageDiv>
          <StyledDOM.StyledAddingButton
            iconSrc={AddIcon}
            label="Add Individual"
            event={() => {}}
          />
          <StyledDOM.StyledAddingButton
            iconSrc={AddIcon}
            label="Add From Group"
            event={() => {}}
          />
        </StyledDOM.StyledButtonStageDiv>
      </div>
      <StyledDOM.StyledConnectionContainer className="field-container">
        <SelectInput label={"From"} />
        <StyledDOM.StyledTextInput label="Reply To" placeholder="Reply To" />
        <StyledDOM.StyledTextInput label="Subject" placeholder="Subject" />
        <StyledDOM.AutoCompletePara>
          <StyledDOM.StyledTextInput label="Cc" placeholder="Cc" />
          <StyledDOM.StyledDownContent onClick={() => setShowBcc(true)}>
            Bcc
          </StyledDOM.StyledDownContent>
        </StyledDOM.AutoCompletePara>
        {showBcc && <StyledDOM.StyledTextInput label="Bcc" placeholder="Bcc" />}
      </StyledDOM.StyledConnectionContainer>
      <StyledDOM.StyledComposeEditorContainer className="editor-container">
        <StyledDOM.StyledButtonStageDiv>
          <StyledDOM.StyledComposeJoinButtons className="join-buttons">
            <Button label="Select Job To Send Email" />
            <Button label="Select Candidate To Attach Resume" />
          </StyledDOM.StyledComposeJoinButtons>
          <StyledDOM.StyledAddingButton
            iconSrc={AddIcon}
            label="Attach Files"
            event={() => {}}
          />
        </StyledDOM.StyledButtonStageDiv>

        <TextEditor
          placeholder="Create Content Here..."
          buttonList={buttons}
          height="250px"
        />
      </StyledDOM.StyledComposeEditorContainer>
      <StyledDOM.StyledConnectionButtonContainer className="connection-button-container">
        <Button label="Clear" isCancel={true} />
        <Button
          label={"Confirm Message"}
          // event={formik.handleSubmit}
        />
      </StyledDOM.StyledConnectionButtonContainer>
    </>
  );
}

export default ComposeMail;
