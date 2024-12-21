import { WebSocketServer, WebSocket } from "ws";

const server = new WebSocketServer({ port: 8000 })
interface User {
    socket: WebSocket
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
    socket.on('message', (e) => {
        // we will rec. the msg as a string , so parse that to object to play with it
        
        const jsonMsg = JSON.parse(e.toString());
        
        // if user wants to join
        if (jsonMsg.type === 'join') {
            allUsers.push({
                socket: socket,
                roomId: jsonMsg.payload.roomId
            })
            console.log(allUsers);
            
        }
        // if user wants to send message
        // it means user has already joined a room with roomId..456825
        else if (jsonMsg.type === 'message') {
            // to get the current user's room id
            const currentUserRoomId = allUsers.find((user) => user.socket === socket)?.roomId
            console.log(currentUserRoomId);
            
            // now send that message to each user present in this (currentUserRoomID) 
            allUsers.forEach((user) => {
                if (user.roomId === currentUserRoomId)
                    user.socket.send(jsonMsg.payload.message)
            })
        }
        else {
            socket.send("wrong msg");

        }
    })

})