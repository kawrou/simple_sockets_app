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
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

server.listen(3001, () => {
	console.log("SERVER IS RUNNING");
});
