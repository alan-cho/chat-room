import React, { useRef, useState, useEffect, FormEvent } from "react";
import { Socket } from "socket.io-client";
import Chatlog from "./Chatlog";
import Message from "./types/Message";

interface ChatProps {
  socket: typeof Socket;
}

function Chat({ socket }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("allMessages", (messages: Message[]) => {
      setMessages(messages);
    });

    return () => {
      socket.off("allMessages");
    };
  }, [socket]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value) {
      const message: Message = {
        id: Date.now(),
        text: inputRef.current.value,
      };
      socket.emit("chatMessage", message.text);
      setMessages((prevMessages) => [...prevMessages, message]);
      inputRef.current.value = "";
    }
  }

  function clearDatabase(): void {
    setMessages([]);
    socket.emit("clearDatabase");
  }

  return (
    <div className="chat">
      <Chatlog messages={messages} />
      <form className="chatInput" onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Enter</button>
      </form>
      <button onClick={clearDatabase}>Clear</button>
    </div>
  );
}

export default Chat;
