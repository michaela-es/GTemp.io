import React, { useContext, useEffect, useState, useCallback } from "react";
import { useComments } from "../context/CommentsContext";
import Comment from "./Comment";
import AddCommentBox from "./AddCommentBox";

const CommentList = ({ templateId }) => {
  const { 
    getCommentsForTemplate, 
    loadCommentsForTemplate, 
    addComment, 
    loadingTemplates 
  } = useComments();
  
  const [show, setShow] = useState(true);
  const [roots, setRoots] = useState([]);

  useEffect(() => {
    if (templateId) {
      loadCommentsForTemplate(templateId);
    }
  }, [templateId]); 

  const comments = getCommentsForTemplate(templateId);

  useEffect(() => {
    const filteredRoots = comments.filter((c) => c.parentId === null || c.parentId === 0);
    setRoots(filteredRoots);
  }, [comments]);

  const handleAddComment = useCallback(async (comment) => {
    const result = await addComment(comment);
    if (result.success) {
    }
    return result;
  }, [addComment, templateId]);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide Comments" : "Show Comments"}
      </button>

      {show && (
        <div style={{ marginTop: 12 }}>
          <AddCommentBox templateId={templateId} onSubmit={handleAddComment} />

          <div style={{ marginTop: 20 }}>
            {loadingTemplates[templateId] ? (
              <div>Loading comments...</div>
            ) : roots.length === 0 ? (
              <div>No comments yet.</div>
            ) : (
              roots.map((comment) => <Comment key={comment.id} comment={comment} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;