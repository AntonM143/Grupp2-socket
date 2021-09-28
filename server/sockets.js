
const { findIndexById, getCurrentRoom, mapRoomsToClient } = require('./socketHandlers');
let rooms = [{
    id: 1,
    name: 'Public',
    password: '',
    users: [],
    },
    {
    id: 2,
    name: 'New Room',
    password: '123',
    users: [],
    },
]


function listen(io){
    /* Connected */
    io.on("connection", (socket) =>{
 
        const roomsToClient = mapRoomsToClient(rooms)

        io.emit('getRooms', roomsToClient);

        socket.on('firstJoin', ({ roomId, user, password }) => {
            const index = findIndexById(rooms, roomId)
            rooms[index].users.push({ user: user.username, id: socket.id })
            socket.to(roomId).emit("message", { userAction: `${user.username} Joined the room`, type: 'JOIN' });
            socket.join(roomId);
        })

        socket.on('join', ({ roomId, user, password }) => {
      
            const currentRoom = getCurrentRoom(rooms, socket);
            const index = findIndexById(rooms, roomId);
            const previousIndex = findIndexById(rooms, currentRoom.id);

            if(rooms[index].password === '') {
                socket.leave(currentRoom.id);
                const updatedUsers = rooms[previousIndex].users.filter(user => user.id !== socket.id)
                rooms[previousIndex].users = updatedUsers
                socket.to(currentRoom.id).emit("message", { userAction: `${user.username} Left the room`, type: 'LEAVE' });

                socket.join(roomId);
                rooms[index].users.push({user: user.username, id: socket.id})
                socket.emit('joinSuccess', { roomId, message: 'Success! Room Joined!' });
                socket.to(roomId).emit("message", { userAction: `${user.username} Joined the room`, type: 'JOIN' });
                return 
            }

            if (rooms[index].password === password) {
                socket.leave(currentRoom.id);
                const updatedUsers = rooms[previousIndex].users.filter(user => user.id !== socket.id)
                rooms[previousIndex].users = updatedUsers
                socket.to(currentRoom.id).emit("message", { userAction: `${user.username} Left the room`, type: 'LEAVE' });
                /* ------------------------ */
                socket.join(roomId);
                rooms[index].users.push({ user: user.username, id: socket.id })
        
                // emit joinedChat
                socket.emit('joinSuccess', { roomId, message: 'Success! Room Joined!' });
                socket.to(roomId).emit("message", { userAction: `${user.username} Joined the room`, type: 'JOIN' });
                return
            } else {
                socket.emit('joinFail', { isError: true, message: 'Wrong Password!' })
                return
            }  
        })

        socket.on("message", (message)=>{
            io.in(message.currentRoom).emit('message', message);
        })
        
        socket.on("isTyping", ({ currentRoom, isTyping }) =>{
            const index = findIndexById(rooms, currentRoom);

            let room = rooms.find((room) => room.id === currentRoom)
            room.users.forEach((user) => {
                if (user.id === socket.id) {
                    user.isTyping = isTyping
                } 
            })
            socket.to(currentRoom).emit("isTyping", room.users);
        })

        socket.on('addRoom', ( {roomName, password} ) => {
            rooms.push({
                id: rooms.length + 1,
                name: roomName,
                password,
                users: [],
            });

            const roomsToClient = mapRoomsToClient(rooms);
            io.emit('updateRooms', roomsToClient);
        })

        /* disconnect*/
        socket.on("disconnect", () =>  {
            const currentRoom = rooms.find((room) => {
                let find = room.users.find(user => user.id === socket.id);
                return find
            });

            if (currentRoom) {
                let user = currentRoom.users.find(user => user.id === socket.id)
                const index = findIndexById(rooms, currentRoom.id);
                let updatedUsers = rooms[index].users.filter(user => user.id !== socket.id);
                rooms[index].users = updatedUsers;
                socket.to(currentRoom.id).emit("message", { userAction: `${user.user} disconnected`, type: 'DISCONNECT' });
            }
        })
    })
}
module.exports = {
    listen,
}