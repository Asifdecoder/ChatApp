const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const server = http.createServer(app); // request handler accepts a request listener
const path = require("path");
const { emit } = require("process");
const port = process.env.PORT || 3000;
// handling request through app but server is made from
const socketio = require("socket.io");
const io = socketio(server); // this will create a websocket for us
//io is an object so scoketio returns function/method
// console.log(socketio);
const user = {

}

app.use("/", express.static(path.join(__dirname, "public")));

// now we need to establish a connection
io.on("connection", (socket) => {
  console.log(`connection established ${socket.id}`);
  socket.on("send-msg", (data) => {
    // socket.on accepts the event sent by emit name of emit and a cb function which have data of the event

    // socket.emit("received-msg", {
        io.emit("received-msg",{
      msg: data,
    //   id: socket.id,
      username:  user[socket.id]
    }); // user defined event
  }); //listen to some event;
  socket.on('login',(data)=>{
    user[socket.id] = data.username;
    // mapping socket id with username 

    

  })
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
