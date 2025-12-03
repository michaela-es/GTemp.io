
import React, { useContext, useEffect, useState } from "react";
import { CommentsContext } from "../context/CommentsContext";
import Comment from "./Comment";
import AddCommentBox from "./AddCommentBox";const CommentList = ({ templateId }) => {
  const { getCommentsForTemplate, loadCommentsForTemplate, loadingTemplates } = useContext(CommentsContext);
  const [show, setShow] = useState(true);

  useEffect(() => {
    loadCommentsForTemplate(templateId);
  }, [templateId]);

  const comments = getCommentsForTemplate(templateId);
  
  console.log('All comments:', comments);
  console.log('First comment parentId:', comments[0]?.parentId);
  console.log('parentId === null check:', comments[0]?.parentId === null);
  
  const roots = comments.filter(c => c.parentId === null);
  console.log('Roots after filter:', roots);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide Comments" : "Show Comments"}
      </button>

      {show && (
        <div style={{ marginTop: 12 }}>
          <AddCommentBox templateId={templateId} />

          <div style={{ marginTop: 20 }}>
            {loadingTemplates[templateId] ? (
              <div>Loading comments...</div>
            ) : roots.length === 0 ? (
              <div>No comments yet. </div>
            ) : (
              roots.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;