import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      //SenderID will be the ID of the user who sent the message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      //ReceiverID will be the ID of the user who received the message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messsage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt fields will be added automatically
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
