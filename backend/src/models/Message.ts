import { Schema, Document, model } from "mongoose";

export interface IMessage extends Document {
  text: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = model<IMessage>("Message", messageSchema);
