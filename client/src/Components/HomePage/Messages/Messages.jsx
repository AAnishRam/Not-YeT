import React, { useState, useEffect } from "react";

const Messages = ({ projectId, user }) => {
  const [messages, setMessages] = useState([]); // To store messages
  const [newMessage, setNewMessage] = useState(""); // To store the current message being typed
  const [error, setError] = useState(""); // To handle error messages

  // Fetch messages when projectId changes
  useEffect(() => {
    if (projectId) {
      // Fetching messages for the project
      fetch(`/api/projects/${projectId}/messages`)
        .then((response) => response.json())
        .then((data) => {
          setMessages(data); // Assuming the API returns the messages in an array
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [projectId]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim().length === 0) {
      setError("Message cannot be empty");
      return;
    }

    if (newMessage.length > 200) {
      setError("Message must be 200 characters or less.");
      return;
    }

    // Send the message to the server
    fetch(`/api/projects/${projectId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newMessage,
        senderId: user.id, // Pass the current user's ID to the backend
      }),
    })
      .then((response) => response.json())
      .then((newMsg) => {
        // Assuming the new message is returned by the backend
        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage(""); // Clear input field
        setError(""); // Clear any errors
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setError("Failed to send message.");
      });
  };

  return (
    <div>
      <h2>Project Communication</h2>
      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="message">
              {/* Displaying the sender's name and message content */}
              <strong>{message.sender.username}:</strong> {message.content}
            </div>
          ))
        ) : (
          <p>No messages for this project yet.</p>
        )}
      </div>

      <div className="message-input">
        {/* Textarea for typing messages */}
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here (max 200 characters)..."
          maxLength="200" // Limit input to 200 characters
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Messages;
