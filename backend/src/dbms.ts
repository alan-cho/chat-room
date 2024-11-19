import Message, { IMessage } from "./models/Message.js";

async function getAllMessages(): Promise<IMessage[]> {
  try {
    const allMessages = await Message.find({});
    return allMessages;
  } catch (error) {
    console.error("Failed Retrieving All Messages: ", error);
    return [];
  }
}

async function addMessage(message: string): Promise<IMessage | null> {
  try {
    const newMessage = new Message({ text: message });
    return await newMessage.save();
  } catch (error) {
    console.error("Failed Saving Message: ", error);
    return null;
  }
}

async function deleteAllMessages(): Promise<void> {
  try {
    await Message.deleteMany({});
  } catch (error) {
    console.error("Failed Deleting All Messages: ", error);
  }
}

const dbmsFunctions = { getAllMessages, addMessage, deleteAllMessages };
export default dbmsFunctions;
