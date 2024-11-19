import React from "react";

interface Message {
  id: number;
  text: string;
}

interface ChatlogProps {
  messages: Message[];
}

function Chatlog({ messages }: ChatlogProps) {
  return (
    <div className="chatLog">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Chatlog;
