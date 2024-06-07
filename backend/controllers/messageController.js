import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }); //$all operator will match the documents where the participants array contains both senderId and receiverId

    if (!conversation) {
      // If there is no conversation between the two users, create a new conversation (first time sending a message to the receiver)
      conversation = await Conversation.create({
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

    //SOCKET IO IMPLEMENTATION (real-time chat)

    // This will run in parallel, more efficient
    await Promise.all([conversation.save(), newMessage.save()]); // Save the conversation and the message to the database

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Populate will return the actual message objects instead of just their IDs

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
