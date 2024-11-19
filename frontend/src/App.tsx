import React from "react";
import Chat from "./Chat";
import io, { Socket } from "socket.io-client";

function App() {
  const socket: typeof Socket = io("http://localhost:3000"); // Initialize the socket

  return (
    <div>
      <h1>Welcome to the Chatroom</h1>
      <Chat socket={socket} />
    </div>
  );
}

export default App;
