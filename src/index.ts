import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8000 })

server.on('connection',(socket)=>{
    socket.send("connection success")
    
})