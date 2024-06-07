import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // If there is no conversation between the two users, create a new conversation (first time sending a message to the receiver)
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      // Create a new message
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      // If the message is created successfully, save it to the database
      conversation.messages.push(newMessage._id);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
