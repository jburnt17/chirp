import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./LiveChat.css";
import { io } from "socket.io-client";
let socket;

const Test = ({ gameId }) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.emit("join", { username: user.username, room: `room${gameId}` });
    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      user: user.username,
      msg: chatInput,
      room: `room${gameId}`,
    });
    setChatInput("");
  };

  return (
    user && (
      <div className="live-chat-body">
        <div className="live-chat">
          <div className="live-chat-messages">
            {messages.map((message, ind) => (
              <div className="live-chat-message" key={ind}>{`${message.user}: ${message.msg}`}</div>
            ))}
          </div>
          <form onSubmit={sendChat}>
            <input placeholder='Start Chatting...' value={chatInput} onChange={updateChatInput} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Test;
