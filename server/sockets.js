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
    })
}
module.exports = {
    listen,
}