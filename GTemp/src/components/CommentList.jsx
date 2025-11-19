import React, { useContext, useState } from "react";
import Comment from "./Comment";
import AddCommentBox from "./AddCommentBox";
import { CommentsContext } from "../contexts/CommentsContext";

const CommentList = ({ templateId }) => {
  const { comments } = useContext(CommentsContext);
  const [show, setShow] = useState(true);

    const roots = comments.filter(
    c => c.templateID === templateId && c.parent_id === null
    );


  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide Comments" : "Show Comments"}
      </button>

      {show && (
        <div style={{ marginTop: 12 }}>
          <AddCommentBox templateId={templateId} />

          <div style={{ marginTop: 20 }}>
            {roots.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
