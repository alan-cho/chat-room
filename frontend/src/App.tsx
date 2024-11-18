import React, { useEffect } from "react";
import io from "socket.io-client";

const App: React.FC = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to backend");
    });

    return () => {
      socket.disconnect();
    };
  });

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default App;
