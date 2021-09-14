const { emit } = require('./app');
const { findIndexById } = require('./socketHandlers');
const rooms = [{
    id: 1,
    name: 'Public',
    users: [],
    },
    {
    id: 2,
    name: 'New Room',
    users: [],
    },
    {
    id: 3,
    name: 'New Room 2',
    users: [],
    },
]


function listen(io){
    /* Connected */
    io.on("connection", (socket) =>{
        console.log(`user connected ${socket.id}`)
        io.emit('getRooms', rooms)

        socket.on('leave', (roomId) => {
            socket.leave(roomId);
            const index = findIndexById(rooms, roomId)
            const username = rooms[index].users.find(user => user.id === socket.id)

            socket.to(roomId).emit("message", { userAction: `${username.user} left the chat!`, type: 'LEAVE'})
            const updatedUsers = rooms[index].users.filter(user => user.id !== socket.id)
            rooms[index].users = updatedUsers
        });

        socket.on('join', ({ roomId, user }) => {
            const index = findIndexById(rooms, roomId)
            rooms[index].users.push({ user: user.username, id: socket.id })
            socket.to(roomId).emit("message", { userAction: `${user.username} joined the chat`, type: 'JOIN' })
            socket.join(roomId);
            console.log(rooms, 'joined')
        })

        socket.on("message", (message)=>{
            io.in(message.currentRoom).emit('message', message)
        })
        
        socket.on("isTyping", (message) =>{
            socket.to(message.currentRoom).emit("isTyping", message)
        })

        socket.on('addRoom', ({roomName, password}) => {
            rooms.push({
                id: rooms.length + 1,
                name: roomName,
                password,
                users: [],
            })
            console.log(rooms)
            io.emit('updateRooms', rooms);
        })
        
        /* disconnect*/
        socket.on("disconnect", () =>  {
            const currentRoom = rooms.find((room) => {
                let find = room.users.find(user => user.id === socket.id)
                return find
            });
            if (currentRoom) {
                let user = currentRoom.users.find(user => user.id === socket.id)
                const index = findIndexById(rooms, currentRoom.id)
                let updatedUsers = rooms[index].users.filter(user => user.id !== socket.id)
                rooms[index].users = updatedUsers
                socket.to(currentRoom.id).emit("message", { userAction: `${user.user} disconnected`, type: 'DISCONNECT' })
                console.log('NU DISCONNECTA VI')
            }
        })
    })
}
module.exports = {
    listen,
}