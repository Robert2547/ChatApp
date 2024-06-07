import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      //Participants will be an array of user IDs
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      //Messages will be an array of message IDs
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [], //Default value will be an empty array, we will push message IDs to this array
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
