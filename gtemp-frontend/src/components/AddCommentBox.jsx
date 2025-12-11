import React, { useState, useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { useAuth } from "../context/AuthContext";

const AddCommentBox = ({ templateId }) => {
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null); 
  const { addComment } = useContext(CommentsContext);

  if (!currentUser) {
    return <p>Only logged-in users can comment.</p>;
  }

  const submit = async () => {
    if (!text.trim()) return; 

    setSubmitting(true); 
    setError(null); 

    try {
      await addComment({
        templateID: templateId,
        parentId: null, 
        text,
        author: currentUser?.username,
      });
      setText(""); 
    } catch (err) {
      setError("Failed to add comment. Please try again."); 
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "12px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          resize: "vertical",
        }}
        disabled={submitting} 
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={submit} disabled={submitting || !text.trim()}>
        {submitting ? "Posting..." : "Add Comment"}
      </button>
    </div>
  );
};

export default AddCommentBox;
