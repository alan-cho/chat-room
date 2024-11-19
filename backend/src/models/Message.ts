import { Schema, Document, model } from "mongoose";

interface IMessage extends Document {
  text: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = model<IMessage>("Message", messageSchema);

export default Message;
