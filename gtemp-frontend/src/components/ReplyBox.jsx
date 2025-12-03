import React, { useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { CommentsContext } from "../context/CommentsContext";

const ReplyBox = ({ templateId, parentId, onClose }) => {
  const [text, setText] = useState("");
  const { addComment } = useContext(CommentsContext);
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return null; 
  }

  const submit = () => {
    if (!text.trim()) return;
    addComment({
      templateID: templateId, 
      parentId: parentId,   
      text,
      author: currentUser.username,
    });
    setText("");
    onClose?.();
  };

  return (
    <div style={{ marginTop: 8 }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reply..."
      />
      <div>
        <button onClick={submit}>Reply</button>
        {onClose && <button onClick={onClose}>Cancel</button>}
      </div>
    </div>
  );
};

export default ReplyBox;