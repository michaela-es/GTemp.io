import React, { useState, useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { useAuth } from "../context/AuthContext";
const AddCommentBox = ({ templateId }) => {
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const { addComment } = useContext(CommentsContext);
console.log(currentUser)

    if (!currentUser){
        return null;
    }
const submit = () => {
  if (!text.trim()) return;
  addComment({
    templateID: templateId,
    parentId: null, 
    text,
    author: currentUser?.username,
  });
  setText("");
};

  return (
    <div>
        <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Write a comment..."
        style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            resize: 'vertical'
        }}
        />
      <button onClick={submit}>Add Comment</button>
    </div>
  );
};

export default AddCommentBox;
