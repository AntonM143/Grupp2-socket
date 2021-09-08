function listen(io){
    io.on("connection", (socket) =>{
        console.log(`user connected ${socket.id}`)
    })
}
module.exports = {
    listen,
}