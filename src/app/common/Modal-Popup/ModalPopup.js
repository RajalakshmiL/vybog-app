import React from "react";
import * as ModalStyledDOM from "./ModalPopup.jsx";
import closeIcon from "../../../assets/image/Close-icon.svg";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const ModalPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  isLoading,
  showPlayer = false,
  playerSrc = {},
  normalButton = false,
  normalCancelButton = false,
}) => {
  if (!isOpen) return null;

  return (
    <ModalStyledDOM.StyledPopupMainContainer>
      <ModalStyledDOM.StyledPopupOuter>
        <ModalStyledDOM.StyledPopupHeading>
          <ModalStyledDOM.StyledCloseIcon onClick={onClose} src={closeIcon} />
        </ModalStyledDOM.StyledPopupHeading>
        <ModalStyledDOM.StyledPopupContent>
          <ModalStyledDOM.StyledPopupBody>
            <ModalStyledDOM.StyledPopupTitle>
              {title}
            </ModalStyledDOM.StyledPopupTitle>
            <ModalStyledDOM.StyledPopupSubtitle>
              {message}
            </ModalStyledDOM.StyledPopupSubtitle>
            {showPlayer ? (
              <Player
                autoplay
                loop
                src={playerSrc}
                style={{ height: "200px", width: "350px" }}
                className="logout-animation"
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
            ) : null}
            <ModalStyledDOM.StyledPopupActions>
              <ModalStyledDOM.StyledButton
                className="cancel-button"
                event={onClose}
                label={cancelLabel}
                normalButton={normalCancelButton}
              ></ModalStyledDOM.StyledButton>
              <ModalStyledDOM.StyledButton
                className={`confirm-button ${isLoading ? "loading" : ""}`}
                event={onConfirm}
                disabled={isLoading}
                label={isLoading ? "Deleting..." : confirmLabel}
                normalButton={normalButton}
              />
            </ModalStyledDOM.StyledPopupActions>
          </ModalStyledDOM.StyledPopupBody>
        </ModalStyledDOM.StyledPopupContent>
      </ModalStyledDOM.StyledPopupOuter>
    </ModalStyledDOM.StyledPopupMainContainer>
  );
};

export default ModalPopup;
