import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import TextContainer from "../components/TextContainer";
import Messages from "../components/Messages/Messages";
import ChatHeader from "../components/ChatHeader";
import UserForm from "../components/UserForm";

import "./Chat.css";
import { useSelector } from "react-redux";


const ENDPOINT = "https://academlo-chat.herokuapp.com/";

let socket;

const Chat = () => {
const [users, setUsers] = useState(null);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const { username, token } = useSelector((state) => state.user);
const room = useSelector((state) => state.roomToJoin);

  
  useEffect(() => {
    console.log(token);
    console.log(username);
    if (token && username) {
      socket = io(ENDPOINT, {
        query: {
          token
        }
      });

      console.log(socket)

      socket.on("error", (err) => console.log(err));

      socket.emit("join", { name: username, room }, (error) => {
        if (error) {
          console.error(error);
        }
      });

      socket.on("message", (message) => {
        console.log(message);
        setMessages((messages) => [...messages, message]);
      });
      
      socket.on("roomData", (users ) => {
        console.log(users.users)
        setUsers( users.users);
      });
    }
  }, [token, room, username]);

  

  const sendMessage = (event) => {
    event.preventDefault();
     console.log(message)
     
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      console.log("Se envio el mensaje")
    }
  };

  return (
    <div className="grid">
      <ChatHeader room={room} />
      <div className="container">
        <Messages messages={messages} name={username} />
      </div>
      <UserForm
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
      {<TextContainer users={users} />}
    </div>
  );
};

export default Chat;