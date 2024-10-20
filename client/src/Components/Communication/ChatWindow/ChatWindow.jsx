import React, { useState } from "react";

const ChatWindow = ({ currentChat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage(""); // Clear input
    }
  };

  return (
    <div className="communication-chat-window">
      <h2>{currentChat.name}</h2>

      <div className="communication-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`communication-message ${
              msg.from === "me" ? "sent" : "received"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="communication-message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
