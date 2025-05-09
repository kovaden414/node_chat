import { ApiError } from '../exeptions/api.error.js';
import { Room } from '../models/room.js';
import { localStorage } from '../utils/store.js';

function getRoomById(roomId) {
  return Room.findOne({ where: { id: roomId } });
}

async function createRoom(title, participants) {
  const existTitle = await Room.findOne({ where: { title } });

  if (existTitle) {
    throw ApiError.badRequest('Room already exist');
  }

  const user = JSON.parse(localStorage.getItem('user'));

  await Room.create({
    title,
    userId: user.id,
    participants: participants
      ? [user.username, ...participants]
      : [user.username],
  });
}

async function updateRoom(room, title, participants) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (title) {
    room.title = title;
  }

  if (participants) {
    room.participants = [user.username, ...participants];
  }

  await room.save();
}

function deleteRoom(roomId) {
  return Room.destroy({ where: { id: roomId } });
}

export const roomService = {
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
