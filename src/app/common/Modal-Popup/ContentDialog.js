import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/image/Close-icon.svg";
import * as StyledDOM from "./ModalPopup.jsx";
import Button from "../Button/Button";

const ContentDialog = ({
  isOpen,
  title,
  children,
  onClose,
  event,
  showMoreOptions = false,
  moreOptionsLink,
  moreOptionsText = "More Options",
  contentHeight = "",
  contentWidth = "",
  submitButtonLabel = "Submit",
  cancelButtonLabel = "Cancel",
  isCancel = false,
}) => {
  if (!isOpen) return null;

  return (
    <StyledDOM.StyledPopupMainContainer className="popupmain-container">
      <StyledDOM.StyledPopupInnerContainer
        contentHeight={contentHeight}
        contentWidth={contentWidth}
        className="popupinner-container"
      >
        <StyledDOM.StyledHeader>
          <StyledDOM.StyledHeading>{title}</StyledDOM.StyledHeading>
          <StyledDOM.StyledPopupCancelIcon onClick={onClose}>
            <CloseIcon />
          </StyledDOM.StyledPopupCancelIcon>
        </StyledDOM.StyledHeader>
        {children}
        <StyledDOM.StyledDiv showMoreOptions={showMoreOptions}>
          {showMoreOptions && (
            <StyledDOM.StyledAnchor onClick={moreOptionsLink}>
              {moreOptionsText}
            </StyledDOM.StyledAnchor>
          )}
          <StyledDOM.StyledButtonDiv>
            <Button
              label={cancelButtonLabel}
              isCancel={isCancel}
              event={onClose}
            />
            <Button label={submitButtonLabel} event={event} />
          </StyledDOM.StyledButtonDiv>
        </StyledDOM.StyledDiv>
      </StyledDOM.StyledPopupInnerContainer>
    </StyledDOM.StyledPopupMainContainer>
  );
};

export default ContentDialog;
