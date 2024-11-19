import React, { useRef, useState, useEffect, FormEvent } from "react";
import Chatlog from "./Chatlog";
import { Socket } from "socket.io-client";

interface ChatProps {
  socket: typeof Socket;
}

interface Message {
  id: number;
  text: string;
}

function Chat({ socket }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    socket.on("chatMessage", (message: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: message },
      ]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [socket]);

  return (
    <div className="chat">
      <Chatlog messages={messages} />
      <form className="chatInput" onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default Chat;
