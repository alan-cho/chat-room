import React from "react";
import io, { Socket } from "socket.io-client";
import Chat from "./Chat";
import Canvas from "./Canvas";

function App() {
  const socket: typeof Socket = io("http://localhost:3000");

  return (
    <div>
      <h1>Welcome to the Chatroom</h1>
      <Chat socket={socket} />
      <Canvas socket={socket} />
    </div>
  );
}

export default App;
