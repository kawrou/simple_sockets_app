const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Create an instance of express
const app = express();

app.use(cors());

// Create an http server in express and pass it our express instance
const server = http.createServer(app);

// Create a new instance of the Server class imported from "socket.io"
const io = new Server(server, {
	//Configure our cors
	cors: {
		//Our react app is running on 3000
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

//Listen to events on our new instance of Server class
io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	//Listens for the event "join_room"
	socket.on("join_room", (roomId) => {
		socket.join(roomId);
	});

	//Listens for the event "send_message"
	socket.on("send_message", (data) => {
		console.log(data);
		socket.to(data.room).emit("receive_message", data);
	});
});

//Our server is on 3001
server.listen(3001, () => {
	console.log("SERVER IS RUNNING");
});
