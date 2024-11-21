import React from "react";
import Message from "./types/Message";

interface ChatlogProps {
  messages: Message[];
}

function Chatlog({ messages }: ChatlogProps) {
  return (
    <div className="chatLog">
      {messages.map((message) => (
        <div key={message._id} className="message">
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Chatlog;
