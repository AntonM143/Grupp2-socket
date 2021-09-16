function findIndexById(rooms, roomId) {
  return rooms.findIndex(room => room.id === roomId);
}

function getCurrentRoom(roomsData, socket, index) {
  const currentRoom = roomsData.find((room) => {
    let find = room.users.find(user => user.id === socket.id);
    return find
  });
  return currentRoom
}


module.exports = {
  findIndexById,
  getCurrentRoom

}