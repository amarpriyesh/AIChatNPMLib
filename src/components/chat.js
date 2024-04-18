import React, { useState } from "react";
import { BsX, BsChatDots } from "react-icons/bs";
import OpenAICHAT from "./openaichat";

const Chatbot = ({ context, apiKey, user }) => {
  console.log("Reaching 1");
  const [isOpen, setIsOpen] = useState(false);
  console.log("Reaching 2");

  const styles = {
    chatContainer: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 40,
      display: "flex",
      flexDirection: "column",
    },

    messageContainer: {
      height: "560px",
      width: "700px",
      fontSize: "0.875rem",
      border: "1px solid black", // Specifies a black border with a width of 1px
      borderRadius: "0.25rem", // equivalent to text-sm
      visibility: isOpen ? "visible" : "hidden",
    },
    chatIconContainer: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      cursor: "pointer",
      transform: "scale(1.25)", // hover effect
      transition: "transform 0.2s ease-in-out", // smooth transition for hover effect
    },
    chatIcon: {
      position: "relative",
      bottom: "5px",
      fontSize: "50px",
    },
    chatText: {
      fontSize: "0.75rem", // equivalent to text-xs
      fontWeight: "600", // font-semibold
      color: "#4b5563", // text-slate-600
    },
  };

  return (
    <div style={styles.chatContainer}>
      {
        <div>
          <div style={styles.messageContainer}>
            <div
              style={{
                height: "50px",
                borderBottom: "1px solid black",
                borderRadius: "0.25rem",
                backgroundColor: "#B0C4DE",
                fontSize: "25px",
              }}
            >
              Chat with {user}
              <BsX
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: "25px",
                  float: "right",
                  marginRight: "10px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              />
            </div>
            <OpenAICHAT context={context} apiKey={apiKey} user={user} />
          </div>
        </div>
      }

      {!isOpen && (
        <div style={styles.chatIconContainer}>
          <div onClick={() => setIsOpen(true)}>
            <BsChatDots style={styles.chatIcon} />
          </div>

          <span>
           AI Chat with {user}
            {/* Your text here */}
          </span>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
