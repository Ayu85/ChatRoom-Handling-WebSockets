import { WebSocketServer, WebSocket } from "ws";

const server = new WebSocketServer({ port: 8000 })
const users: WebSocket[] = []
server.on('connection', (socket) => {
    users.push(socket)
    socket.send("connection success")
    socket.on('message', (e) => {
        users.forEach((user) => {
            user.send(e.toString())
        })

    })

})