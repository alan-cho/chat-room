import { Server } from "socket.io";
import dbms from "./dbms.js";

export default function initSockets(io: Server): void {
  io.on("connection", (socket) => {
    // Event: User Connected
    (async () => {
      console.log("User Connected");
      const messages = await dbms.getAllMessages();
      socket.emit("handleGetAllMessages", messages);
    })();

    // Event: User Disconnected
    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });

    // Event: Add Message to Database
    socket.on("addMessage", async (message: string) => {
      const newMessage = await dbms.addMessage(message);
      io.emit("handleAddMessage", newMessage);
    });

    // // Event: Get All Messages from Database
    // socket.on("getAllMessages", () => {
    //   const messages = dbms.getAllMessages();
    //   socket.emit("getAllMessages", messages);
    //   console.log("getAllMessages Emitted");
    // });

    // Event: Clear Messages from Database
    socket.on("clearDatabase", async () => {
      await dbms.deleteAllMessages();
      io.emit("handleClearDatabase");
    });
  });
}
