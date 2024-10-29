import React, { useState, useRef, useEffect, useContext } from "react";
import Button from "../../../common/Button/Button";
import * as StyledDOM from "./Messaging.jsx";
import DynamicCheckBox from "../../../common/CheckBox/CheckBox.js";
import { Toast } from "../../../common/Toast-Snackbar/ToastSnackbar";
import { useFormik } from "formik";
import {
  formatDate,
  useFocusFirstInput,
} from "../../../common/CommonFunctions/CommonFunctions.js";
import { DynamicContext } from "../../../context/DynamicContext";
function Messaging() {
  const { candidateDetails, setCandidateDetails } = useContext(DynamicContext);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const chatMessagesRef = useRef();
  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);
  const generateBotResponse = () => {
    const botResponses = [
      "Hello, how can I help you?",
      "I'm a simple chatbot.",
      "Nice to meet you!",
      "How are you doing?",
      "Sorry, I didn't understand that.",
      "Feel free to ask any questions.",
      "Hello, I'm your helpful chatbot assistant, and I'm here to make your life a bit easier. You can refer to me as VyLabs. My primary goal is to provide you with information, answer your questions, and assist with various tasks. I've been trained on a wide array of topics, so whether you're looking for facts, advice, or just a friendly chat, I'm here to engage with you.I'm constantly updating my knowledge base to ensure that I provide you with the most accurate and up-to-date information available. Your privacy is important to me, and I want you to know that I don't store any personal data from our conversations. Everything we discuss is kept confidential.Feel free to interact with me in plain, everyday language. You can ask me anything you'd like, request assistance with tasks, or simply engage in a conversation. If you're unsure where to start, a simple  will get you going, and I'll guide you from there.I'm equipped to handle a variety of tasks, from providing weather forecasts and sharing the latest news to generating text and performing calculations. So, don't hesitate to reach out with your questions or requests. Let's chat, and I'll do my best to assist you with whatever you need.",
    ];

    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const sendMessage = () => {
    const trimmedMessage = messageText.trim();
    if (trimmedMessage === "") {
      Toast("warning", "Please enter a message before sending.");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: trimmedMessage, fromUser: true },
    ]);

    setTimeout(() => {
      const botResponse = generateBotResponse(trimmedMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, fromUser: false },
      ]);
    }, 2000);

    setMessageText("");
  };

  const formik = useFormik({
    initialValues: {
      addTracking: "",

      sms: false,
    },
    onSubmit: (values) => {
      setCandidateDetails([...candidateDetails, values]);
      console.log(values);
    },
  });
  const handleClear = () => {
    formik.resetForm();
    setMessageText("");
  };
  useFocusFirstInput();
  return (
    <StyledDOM.MessagingMainContainer className="messagemain-container">
      <StyledDOM.MessagingUpperContainer className="messageupper-container">
        <StyledDOM.MessagingHeader>Send Message</StyledDOM.MessagingHeader>
        <StyledDOM.TextBox
          className="message-textbox"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          innerRef={textareaRef}
        ></StyledDOM.TextBox>
        <StyledDOM.CheckboxContainer className="messagecheckbox-div">
          <DynamicCheckBox
            label="Send as SMS"
            checked={formik.values.sms}
            onChange={(e) => formik.setFieldValue("sms", e.target.checked)}
          />
          <StyledDOM.StyledButtonDiv>
            <Button label="Clear" isCancel={true} event={handleClear} />
            <Button label="Send" event={sendMessage} />
          </StyledDOM.StyledButtonDiv>
        </StyledDOM.CheckboxContainer>
      </StyledDOM.MessagingUpperContainer>

      {messages.length > 0 && (
        <StyledDOM.MessagingDate>
          {" "}
          {formatDate(new Date())}
        </StyledDOM.MessagingDate>
      )}
      <StyledDOM.MessagingDisplayContainer className="messagingdisplay-container">
        <StyledDOM.MessagingLowerContainer className="messagingLower-container">
          <StyledDOM.MessageContainer id="chat-messages" ref={chatMessagesRef}>
            {messages.map((message, index) =>
              message.fromUser ? (
                <StyledDOM.UserMessageContainer key={index}>
                  <StyledDOM.UserMessage>
                    <StyledDOM.UserContent>
                      {message.text}
                    </StyledDOM.UserContent>
                  </StyledDOM.UserMessage>
                </StyledDOM.UserMessageContainer>
              ) : (
                <StyledDOM.BotMessageContainer key={index}>
                  <StyledDOM.BotMessage>
                    <StyledDOM.BotContent>{message.text}</StyledDOM.BotContent>
                  </StyledDOM.BotMessage>
                </StyledDOM.BotMessageContainer>
              )
            )}
          </StyledDOM.MessageContainer>
        </StyledDOM.MessagingLowerContainer>
      </StyledDOM.MessagingDisplayContainer>
    </StyledDOM.MessagingMainContainer>
  );
}

export default Messaging;
