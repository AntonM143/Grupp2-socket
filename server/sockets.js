function listen(io){
    /* Connected */
    io.on("connection", (socket) =>{
        console.log(`user connected ${socket.id}`)
        /* Test */
        socket.on("username", (text)=>{
            console.log(socket.id, text)
        })
        /* disconnect, kan lägga till användarens namn här sen?*/
        socket.on("disconnect", (reason) =>  {
            console.log(`user disconnected ${socket.id}, reason: ${reason}`)
        })
        socket.on("message", (message)=>{
            console.log(message)
            io.emit("message", message)
        })
        socket.on("isTyping", (message) =>{
            socket.broadcast.emit("isTyping", message)
        })
    })
}
module.exports = {
    listen,
}