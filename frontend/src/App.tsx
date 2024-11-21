import React from "react";
import io, { Socket } from "socket.io-client";
import Chat from "./Chat";
import Canvas from "./Canvas";

function App() {
  const socket: typeof Socket = io("http://localhost:3000");

  return (
    <div className="flex">
      <Canvas socket={socket} />
      <Chat socket={socket} />
    </div>
  );
}

export default App;
