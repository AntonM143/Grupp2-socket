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

function mapRoomsToClient(roomsData) {

  const roomsToClient = roomsData.map((room) => {
    let passwordRequired
    passwordRequired = room.password === "" ? passwordRequired = false : passwordRequired = true
        return {
            id: room.id,
            name: room.name,
            passwordRequired,
        }
    });
    return roomsToClient;
}
  

module.exports = {
  findIndexById,
  getCurrentRoom,
  mapRoomsToClient

}