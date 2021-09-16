
const { findIndexById, getCurrentRoom } = require('./socketHandlers');
let rooms = [{
    id: 1,
    name: 'Public',
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
        console.log(`user connected ${socket.id}`)
        io.emit('getRooms', rooms);

         socket.on('leave', () => {
/*             const currentRoom = getCurrentRoom(rooms, socket, index);
            const index = findIndexById(rooms, currentRoom.id)
            socket.leave(currentRoom)
            console.log(index, '🌟')
            console.log(currentRoom, 'current Room')

            const updatedUsers = rooms[index].users.filter(user => user.id !== socket.id)
            console.log(index, 'heheheheh')
            rooms[index].users = updatedUsers
            console.log(rooms) */
        });
 
        socket.on('firstJoin', ({ roomId, user, password }) => {
            const index = findIndexById(rooms, roomId)
            rooms[index].users.push({ user: user.username, id: socket.id })
            socket.join(roomId);
        })

        socket.on('join', ({ roomId, user, password }) => {
            const currentRoom = getCurrentRoom(rooms, socket);
 
            const index = findIndexById(rooms, roomId)
            const previousIndex = findIndexById(rooms, currentRoom.id)
    
            socket.leave(currentRoom.id)
            
            const updatedUsers = rooms[previousIndex].users.filter(user => user.id !== socket.id)
            rooms[previousIndex].users = updatedUsers
           
        
            if (rooms[index].password) {
                if (rooms[index].password === password) {
             
                    rooms[index].users.push({ user: user.username, id: socket.id })
                    socket.join(roomId);
                  
                    socket.to(currentRoom.id).emit("message", { userAction: `${user.username} left the chat`, type: 'LEAVE' });
                    socket.to(roomId).emit("message", { userAction: `${user.username} joined the chat`, type: 'JOIN' });
          
    
                    socket.emit('passwordJoin', { roomId, message: 'Success!' });
                    console.log(rooms)
                    return;
                } else {
                    socket.emit('passwordFailed', { message: 'FAIL' });
                    socket.join(currentRoom.id);
                    rooms[previousIndex].users.push({ user: user.username, id: socket.id })

                    return;
                }
            } else {
                socket.join(roomId);
                socket.emit('noPassword', {roomId, message: 'Joined Room without Password'})
                rooms[index].users.push({ user: user.username, id: socket.id })
                console.log(roomId)
                socket.to(roomId).emit("message", { userAction: `${user.username} joined the chat`, type: 'JOIN' });
          
                socket.to(currentRoom.id).emit("message", { userAction: `${user.username} left the chat`, type: 'LEAVE' });
               
            }

        })

        socket.on("message", (message)=>{
            io.in(message.currentRoom).emit('message', message);
        })
        
        socket.on("isTyping", (message) =>{
            socket.to(message.currentRoom).emit("isTyping", message);
        })

        socket.on('addRoom', ({roomName, password}) => {
            rooms.push({
                id: rooms.length + 1,
                name: roomName,
                password,
                users: [],
            })
            io.emit('updateRooms', rooms);
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