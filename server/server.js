const http = require("http")
const app = require("./app")
const sockets = require("./sockets")
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})
const PORT = 8000

server.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})

sockets.listen(io)