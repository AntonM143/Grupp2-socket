function findIndexById(rooms, roomId) {
  return rooms.findIndex(room => room.id === roomId);
}


module.exports = {
  findIndexById,
}