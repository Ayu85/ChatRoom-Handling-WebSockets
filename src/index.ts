import { WebSocketServer, WebSocket } from "ws";

const server = new WebSocketServer({ port: 8000 })
interface User {
    socket: WebSocket;
    roomId: string
}
let allUsers: User[] = []

// ****sample structure****
// allUsers:[
//     {socket:socket1,roomId:'4545'},
//     {socket:socket2,roomId:'5345'},
//     {socket:socket3,roomId:'4545'},
// ]
server.on('connection', (socket) => {
    allUsers.push({ socket, roomId: "sad" })
    socket.on('message', (e) => {
        console.log(allUsers.length);
        allUsers.forEach((user) => {
            socket.send(e.toString())
        })
        socket.on('close', () => {
            allUsers = allUsers.filter((user) => user != socket)
        })

    })

})