import { ApiError } from '../exeptions/api.error.js';
import { Room } from '../models/room.js';
import { roomService } from '../services/room.service.js';

const getAllRooms = async (req, res) => {
  const rooms = await Room.findAll();

  res.send(rooms);
};

const getRoomById = async (req, res) => {
  const { roomId } = req.params;

  const room = await roomService.getRoomById(roomId);

  if (!room) {
    throw ApiError.notFound();
  }

  res.send(room);
};

const createRoom = async (req, res) => {
  const { title, participants } = req.body;

  if (!title) {
    throw ApiError.badRequest('Enter the title');
  }

  await roomService.createRoom(title, participants)

  res.status(201).send({ message: 'Room created'});
};

const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const { title, participants } = req.body;

  const room = await roomService.getRoomById(roomId);

  if (!room) {
    throw ApiError.notFound();
  }

  if (!Array.isArray(participants)) {
     throw ApiError.badRequest('Participants shoude be an array');
  }

  await roomService.updateRoom(room, title, participants)

  const updatedRoom = await roomService.getRoomById(roomId);

  res.send(updatedRoom);
};

const deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  const room = await roomService.getRoomById(roomId);

  if (!room) {
    throw ApiError.notFound();
  }

  await roomService.deleteRoom(roomId);

  res.status(204).send({ message: 'Room deleted' });
};

export const roomController = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
};
