import React, { useState, useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { CommentsContext } from "../contexts/CommentsContext";
const ReplyBox = ({ templateId, parentId, onClose}) => {
  const [text, setText] = useState("");
  const { addComment } = useContext(CommentsContext);
  const { currentUser} = useAuth();
  const submit = () => {
    if (!text.trim()) return;
    addComment({
      id: Date.now(),
      template_id: templateId,
      parent_id: parentId,
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
