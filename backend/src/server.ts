import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import Message from "./models/Message.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/build");

app.use(express.static(frontendPath));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed Retrieving Message" });
  }
});

io.on("connection", (socket) => {
  // Event: User Connected
  (async () => {
    try {
      console.log("User Connected");
      const messages = await Message.find({});
      socket.emit("allMessages", messages);
    } catch (error) {
      console.error("Error Retrieving Messages: ", error);
    }
  })();

  // Event: User Disconnected
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  // Event: Message Emitted
  socket.on("chatMessage", async (message: string) => {
    try {
      const newMessage = new Message({ text: message });
      await newMessage.save();
    } catch (error) {
      console.error("Failed Saving Message: ", error);
    }
  });
});

async function startServer() {
  try {
    await mongoose
      .connect("mongodb://localhost/chat-app")
      .then(() => console.log("MongoDB Connected"));

    server.listen(PORT, () => {
      console.log("Server Instantiated");
    });
  } catch (error) {
    console.error("Failed MonogoDB Connection: ", error);
  }
}

startServer();

export default io;
