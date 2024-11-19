"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
var Message = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;
