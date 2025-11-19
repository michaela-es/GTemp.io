import React, { useState, useContext } from "react";
import ReplyBox from "./ReplyBox";
import { CommentsContext } from "../contexts/CommentsContext";

const Comment = ({ comment }) => {
  const { comments } = useContext(CommentsContext);
  const [replying, setReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false); // Initially hide replies

  const children = comments.filter(c => c.parent_id === comment.id);

  return (
    <div style={{ marginLeft: comment.parent_id ? 20 : 0, marginBottom: 14 }}>
      <strong>{comment.author}</strong>
      <div>{comment.text}</div>

      <div style={{ marginTop: 4 }}>
        <button
          style={{ fontSize: 12, marginRight: 8 }}
          onClick={() => setReplying(!replying)}
        >
          {replying ? "Cancel" : "Reply"}
        </button>

        {children.length > 0 && (
          <button
            style={{ fontSize: 12, cursor: 'pointer' }}
            onClick={() => setShowReplies(!showReplies)}
          >
            {/* Triangle icon for toggle */}
            {showReplies ? '▼ Hide Replies' : '▲ Show Replies'}
          </button>
        )}
      </div>

      {replying && (
        <ReplyBox
          templateId={comment.templateID}
          parentId={comment.id}
          onClose={() => setReplying(false)}
        />
      )}

      {showReplies && children.length > 0 && (
        <div style={{ marginTop: 10 }}>
          {children.map(child => (
            <Comment key={child.id} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
