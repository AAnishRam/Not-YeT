// src/components/UserList.js

import React from "react";

const UserList = ({ users, onSelectChat }) => {
  return (
    <div className="communication-user-list">
      {users.map((user) => (
        <div
          key={user.id}
          className="communication-user-item"
          onClick={() => onSelectChat(user)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
