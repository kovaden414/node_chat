import { ApiError } from '../exeptions/api.error.js';
import { Message } from '../models/message.js';
import { messageService } from '../services/message.service.js';

const getAllMessages = async (req, res) => {
  const { roomId } = req.params;

  const allMessages = await Message.findAll({ where: { roomId }});

  res.send(allMessages);
}

const createMessage = async (req, res) => {
  const { text } = req.body;
  const { roomId } = req.params;

  if (!text) {
    throw ApiError.badRequest('Enter the message');
  }

  await messageService.createMessage(text, roomId);

  res.status(201).send(text);
};

export const messageController = {
  getAllMessages,
  createMessage,
};
