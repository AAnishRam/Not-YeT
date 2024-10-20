// src/components/CreateGroup.js

import React, { useState } from "react";
import Select from "react-select";

const CreateGroup = ({ users, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleCreate = () => {
    if (groupName && selectedMembers.length > 0) {
      onCreateGroup(
        groupName,
        selectedMembers.map((member) => member.value)
      );
      setGroupName("");
      setSelectedMembers([]);
    }
  };

  return (
    <div className="communication-create-group">
      <h4>Create Group</h4>

      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
      />

      <Select
        isMulti
        options={users.map((user) => ({ value: user.id, label: user.name }))}
        value={selectedMembers}
        onChange={setSelectedMembers}
        placeholder="Select Members"
      />

      <button onClick={handleCreate}>Create Group</button>
    </div>
  );
};

export default CreateGroup;
