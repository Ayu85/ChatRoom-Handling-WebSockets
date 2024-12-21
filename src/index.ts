import { WebSocketServer, WebSocket } from "ws";

const server = new WebSocketServer({ port: 8000 })
let users: WebSocket[] = []
server.on('connection', (socket) => {
    users.push(socket)
    socket.send("connection success")
    socket.on('message', (e) => {
        console.log(users.length);
        users.forEach((user) => {
            user.send(e.toString())
        })
        socket.on('close', () => {
            users = users.filter((user) => user != socket)            
        })

    })

})