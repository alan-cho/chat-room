import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/build");

app.use(express.static(frontendPath));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

  socket.on("chatMessage", (msg) => {
    console.log("Message: " + msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
