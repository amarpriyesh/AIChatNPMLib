import React from "react";
import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import LoadingSpinner from "./spinner.js";

const OpenAICHAT = ({ context, apiKey, user }) => {
  console.log("Reaching 3");
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [messageQueue, setMessageQueue] = useState([
    {
      role: "system",
      content: context,
    },
  ]);

  console.log("Reaching 4");
  console.log("API key", apiKey);
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("submitButton").click();
      // Or you can call the function directly that you want to trigger
    }
  };
  const pushMessage = async () => {
    setMessageQueue((prevQueue) => [
      ...prevQueue,
      {
        role: "user",
        content: question,
      },
    ]);

    // Note: Even with this approach, setMessageQueue does not return a promise,
    // so you cannot use await with it. However, this ensures that the update
    // is applied correctly based on the most recent state.

    setQuestion("");
    // Update the message queue with the new message
    // Reset the question input for the next message

    // Assuming createMessage sends the updated message queue to OpenAI and handles the response
  };

  const createMessage = async () => {
    // const threadMessages = await openai.beta.threads.messages.create(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl",
    //     { role: "user", content: question }
    //   );

    //   const run = await openai.beta.threads.runs.create(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl",
    //     {
    //       assistant_id: "asst_4VmL0io5Xysdjzg5E1Zv6CPW"
    //     }
    //   );

    //   let status = await openai.beta.threads.runs.retrieve(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl",
    //     run.id
    //   );

    //   while (status.status === "in_progress") {
    //     await new Promise(resolve => setTimeout(resolve, 500));

    //     // Retrieve the status again
    //     status = await openai.beta.threads.runs.retrieve( "thread_z9J0Z3sL1xrEeNBhH23Wmlyl", run.id);
    //     console.log("Status RUN",status.status);

    //   }

    //   const messages = await openai.beta.threads.messages.list(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl"
    //   );

    //   setMessage(messages.data[0].content[0].text.value);
    //   setQuestion("")

    setIsLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messageQueue,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(response);

      const newResponse = [...messageQueue, response.choices[0].message];

      setMessageQueue(newResponse);
    } catch (error) {
      const newResponse = [
        ...messageQueue,
        { role: "assistant", content: "Please try after some time" },
      ];
      setMessageQueue(newResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const retQueue = () => {
    return (
      <ul style={{ listStyleType: "none" }}>
        {messageQueue.slice(1, messageQueue.length).map((a, index) => (
          <li
            key={index}
            style={{
              border: "1px solid black",
              marginRight: "14px",
              marginTop: "10px",

              padding: "1px",

              backgroundColor: a.role === "user" ? "#87CEEB" : "#87CEFA",

              borderRadius: "10px",
              float: a.role === "user" ? "right" : "left",
              width: "80%",
            }}
          >
            {a.role === "user" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <div style={{ textAlign: "left", fontWeight: "bold" }}>
                  You:
                </div>
                <div style={{ textAlign: "left" }}>{a.content}</div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "5px",
                }}
              >
                <div style={{ textAlign: "left", fontWeight: "bold" }}>
                  {user}:
                </div>
                <div style={{ textAlign: "left" }}>{a.content}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    // This code runs after `messageQueue` has been updated
    console.log("messageQueue has been updated", messageQueue);
    scrollToBottom();

    // If you need to call createMessage or any other function after messageQueue updates, call it here

    if (
      messageQueue[messageQueue.length - 1].role === "system" ||
      messageQueue[messageQueue.length - 1].role === "user"
    ) {
      createMessage();
    }
  }, [messageQueue]);

  return (
    <div style={{ height: "510px", width: "100%" }}>
      <div
        style={{ height: "80%", overflowY: "auto", backgroundColor: "#E0FFFF" }}
      >
        {retQueue()} <div ref={endOfMessagesRef} />{" "}
      </div>
      <div style={{ height: "20%", width: "100%", display: "flex" }}>
        <textarea
          style={{
            width: "80%",
            height: "90%",
            padding: "5px",
            fontSize: "16px",
            backgroundColor: "#B0C4DE",
          }}
          value={question}
          placeholder="Ask me anything!"
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuestion(e.target.value)}
        />{" "}
        {isLoading ? (
          <div
            style={{
              width: "20%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <div
            style={{
              width: "20%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#87CEFA",
              }}
              className="rounded-lg h-full w-full "
              id="submitButton"
              onClick={pushMessage}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenAICHAT;
