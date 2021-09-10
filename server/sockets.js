function listen(io){
    /* Connected */
    io.on("connection", (socket) =>{
        console.log(`user connected ${socket.id}`)
        
        socket.on("username", (text)=>{
            console.log(socket.id, text)
        })
        /* disconnect*/
        socket.on("disconnect", (reason) =>  {
            console.log(`user disconnected ${socket.id}, reason: ${reason}`)
        })
        socket.on("message", (message)=>{
            io.emit("message", message)
            console.log(message)
        })
        
        socket.on("isTyping", (message) =>{
            socket.broadcast.emit("isTyping", message)
        })
    })
}
module.exports = {
    listen,
}