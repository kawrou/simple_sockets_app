import { useEffect, useState, ChangeEvent } from "react";
import "./App.css";
import { io } from "socket.io-client";

//io function is the main entry point for creating a socket connection to the server
//it internally creates a socket instance
//Sometimes it can be written as io.connect(), but the .connect() method is part of the Socket instance and not the function
//'io' will handle .connect() internally
//We're connecting to our server on 3001

interface Message {
 message: string;
 room: string;
}

function App() {
 const socket = io("http://localhost:3001");
 const [room, setRoom] = useState<string>("");
 const [message, setMessage] = useState<string>("");
 const [messageReceived, setMessageReceived] = useState<string>("");

 const handleRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
  setRoom(e.target.value);
 };

 const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
  setMessage(e.target.value);
 };

 //socket.io specific handlers
 const joinRoom = () => {
  if (room !== "") {
   socket.emit("join_room", room);
  }
 };

 //Emitting our data to our server
 const sendMessage = () => {
  const payload: Message = { message, room };
  socket.emit("send_message", payload);
 };

 //Use a useEffect so that when a message is received, the state of messageReceived is updated
 useEffect(() => {
  const receiveMessageHandler = (data: Message) => {
   setMessageReceived(data.message);
  };

  socket.on("receive_message", receiveMessageHandler);

  // Clean up event listener to avoid memory leaks
  return () => {
   socket.off("receive_message", receiveMessageHandler);
  };
 }, [socket]); // Include socket in the dependency array for useEffect

 return (
  <div className="App">
   <input
    placeholder="Room Number..."
    value={room}
    onChange={handleRoomInput}
   />
   <button onClick={joinRoom}>Join Room</button>
   <input
    placeholder="Message..."
    value={message}
    onChange={handleMessageInput}
   />
   <button onClick={sendMessage}>Send Message</button>
   <h1> Message: </h1>
   <span>{messageReceived}</span>
  </div>
 );
}

export default App;
