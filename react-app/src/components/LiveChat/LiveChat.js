import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import date from "date-and-time";
import "./LiveChat.css";
import { io } from "socket.io-client";
let socket;

const Test = ({ gameId }) => {
  const now = new Date();
  const time = date.format(now, "hh:mm");

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
      time: time,
      room: `room${gameId}`,
    });
    setChatInput("");
  };

  return (
    user && (
      <div className="live-chat-body">
        <div className="live-chat-messages">
          {messages.map((message, ind) => (
            <div className="ind-live-chat">
              <div className="live-chat-time">{message.time}</div>
              <div className="live-chat-user">{message.user}:</div>
              <div className="live-chat-message" key={ind}>
                {message.msg}
              </div>
            </div>
          ))}
        </div>
        <form className="live-chat-form" onSubmit={sendChat}>
          <input
            placeholder="Start Chatting..."
            value={chatInput}
            onChange={updateChatInput}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default Test;
