// src/components/CommunicationPage.js

import React, { useState } from "react";
import UserList from "./UserList/UserList";
import ChatWindow from "./ChatWindow/ChatWindow";
import CreateGroup from "./CreateGroup/CreateGroup";
import "./Communication.css";

const CommunicationPage = () => {
  const [users] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
  ]);

  const [groups, setGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    setMessages([]); // Clear messages when switching chats
  };

  const handleSendMessage = (message) => {
    if (currentChat) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "me", text: message },
      ]);
    }
  };

  const handleCreateGroup = (groupName, members) => {
    const newGroup = { name: groupName, members, id: groups.length + 1 };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  return (
    <div className="communication-page">
      <div className="communication-sidebar">
        <h3>Users</h3>
        <UserList users={users} onSelectChat={handleSelectChat} />

        <h3>Groups</h3>
        <UserList users={groups} onSelectChat={handleSelectChat} />

        <CreateGroup users={users} onCreateGroup={handleCreateGroup} />
      </div>

      <div className="communication-chat-section">
        {currentChat ? (
          <ChatWindow
            currentChat={currentChat}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <h2>Select a chat to start messaging</h2>
        )}
      </div>
    </div>
  );
};

export default CommunicationPage;
