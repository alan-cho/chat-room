import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import initSockets from "./sockets.js";

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

initSockets(io);

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
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
