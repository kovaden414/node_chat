import { Message } from '../models/message.js';
import { emmiter } from '../utils/emmiter.js';
import { localStorage } from '../utils/store.js';

async function createMessage(text, roomId) {
  const user = JSON.parse(localStorage.getItem('user'));
  const message = await Message.create({
    text,
    author: user.username,
    time: new Date(),
    userId: user.id,
    roomId,
  });

  emmiter.emit('message', message);
}

export const messageService = {
  createMessage,
};
