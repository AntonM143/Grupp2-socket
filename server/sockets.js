

function listen(io){
    /* Connected */
    io.on("connection", (socket) =>{
        console.log(`user connected ${socket.id}`)
        
        let room;

        socket.on('leave', (name) => {
            socket.leave(name);
            console.log('you left')
        });

        socket.on('join', (name) => {
            socket.join(name);
            room = name
            console.log(`du är i ${name}`, socket.id);
        })

        socket.on("message", (message)=>{
            io.in(room).emit('message', message)
            console.log(room)
            console.log(message)
        })
        
        socket.on("isTyping", (message) =>{
            socket.to(room).emit("isTyping", message)
        })
        
        socket.on("username", (text)=>{
            console.log(socket.id, text)
        })
        /* disconnect*/
        socket.on("disconnect", (reason) =>  {
            console.log(`user disconnected ${socket.id}, reason: ${reason}`)
        })
        
    })
}
module.exports = {
    listen,
}