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
    const handleGetAllMessages = (messages: Message[]) => setMessages(messages);
    const handleAddMessage = (message: Message) =>
      setMessages((prevMessages) => [...prevMessages, message]);
    const handleClearDatabase = () => setMessages([]);

    socket.on("handleGetAllMessages", handleGetAllMessages);
    socket.on("handleAddMessage", handleAddMessage);
    socket.on("handleClearDatabase", handleClearDatabase);

    return () => {
      socket.off("handleGetAllMessages", handleGetAllMessages);
      socket.off("handleAddMessage", handleAddMessage);
      socket.off("handleClearDatabase", handleClearDatabase);
    };
  }, [socket]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value.trim()) {
      const message = inputRef.current.value.trim();
      socket.emit("addMessage", message);
      inputRef.current.value = "";
    }
  }

  function clearDatabase(): void {
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
