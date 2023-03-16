require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const harperSaveMessage = require('./services/harper-save-message.jsx');

app.use(cors());

const server = http.createServer(app);

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  const CHAT_BOT = 'ChatBot'
  let chatRoom = ''; 
  let allUsers = []; //all users in the chat room

  // Listen for when the client connects via socket.io-client
  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
  
      // Add a user to a room
    socket.on('join_room', (data) => {
        const {username, room} = data
        socket.join(room)
        let __createdtime__ = Date.now();



        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('received_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__
        });

        //send message to user who joined the room
        socket.emit('receive_message', {
            message: `Welcome ${username},`,
            username: CHAT_BOT,
            __createdtime__
        })

        //save the new user to the room
        chatRoom = room;
        allUsers.push( { id: socket.id, username, room })
        chatRoomUsers = allUsers.filter((user) => user.room === room );
        socket.to(room).emit('chatroom_users', chatRoomUsers)
        socket.emit('chatroom_users', chatRoomUsers)

    });

    socket.on('send_message', (data) => {
      const { message, username, room, __createdtime__ } = data;
      io.in(room).emit('receive_message', data)

      harperSaveMessage(message, username, room, __createdtime__) //saves message in db
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
    })
  });







app.get('/', (req, res) => {
    res.send('Hello world');
  });
  



server.listen(4000, () => 'Server is running on port 4000');