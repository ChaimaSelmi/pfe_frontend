import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import MessageServices from "../services/MessageServices";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();
  const { id: reciever } = useParams();
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = socketIOClient("http://localhost:8001", {
      transports: ["websocket"],
    });

    // Listen for messages specific to the current user
    socketRef.current.on(`message-${userId}`, (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      // Disconnect from Socket.IO server when component unmounts
      socketRef.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    (async () => {
      const messagesData = await MessageServices.GetConversation(
        userId,
        reciever
      );
      setMessages(
        messagesData.data.map((el) => ({
          sender: el.sender._id,
          message: el.message,
          reciever: el.reciever._id,
          created: el.createdAt,
          id: el._id,
        }))
      );
    })();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        sender: userId,
        reciever, // Replace with the ID of the reciever
        message: newMessage,
        created: new Date(),
        id: Math.random().toString(),
      };

      await MessageServices.Create(messageData);

      // Emit message to the server
      socketRef.current.emit("message", messageData);

      // Update local state
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  const handleSelectMessage = (id) => {
    const exist = selectedTimes.find((el) => el === id);
    if (exist) {
      setSelectedTimes((prev) => prev.filter((el) => el !== id));
    } else {
      setSelectedTimes((prev) => [...prev, id]);
    }
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{
          height: "500px",
          overflow: "scroll",
        }}
      >
        <div className="col-md-12">
          <div className="chat-container">
            <div className="chat">
              {messages.map((msg, index) => (
                <>
                  <div
                    key={index}
                    className={`message ${
                      msg.sender === userId ? "sent" : "received"
                    }`}
                  >
                    <div
                      className="message-content"
                      onClick={() => handleSelectMessage(msg.id)}
                    >
                      {msg.message}
                    </div>
                  </div>
                  {selectedTimes.find((el) => el === msg.id) && (
                    <time
                      dateTime={msg.created}
                      className={`text-sm ${
                        msg.sender === userId ? "sent-time" : "received-time"
                      }`}
                    >
                      {msg.created &&
                        msg.created.slice(0, 16).replace("T", " at ")}
                    </time>
                  )}
                </>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
