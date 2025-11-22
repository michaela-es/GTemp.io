import React, { createContext, useContext, useEffect, useState } from "react";

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [commentsCache, setCommentsCache] = useState({});
  const [loadingTemplates, setLoadingTemplates] = useState({});

  const loadCommentsForTemplate = async (templateId) => {
    if (commentsCache[templateId] || loadingTemplates[templateId]) return;
    
    setLoadingTemplates(prev => ({ ...prev, [templateId]: true }));
    
    try {
      const response = await fetch(`http://localhost:8080/api/comments?templateID=${templateId}`);
      const data = await response.json();
      
      setCommentsCache(prev => ({
        ...prev,
        [templateId]: data
      }));
    } catch (error) {
      console.error(`Failed to load comments for template ${templateId}:`, error);
    } finally {
      setLoadingTemplates(prev => ({ ...prev, [templateId]: false }));
    }
  };

  const addComment = async (comment) => {
    try {
      const response = await fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      });
      const newComment = await response.json();
      
      setCommentsCache(prev => ({
        ...prev,
        [comment.templateID]: [...(prev[comment.templateID] || []), newComment]
      }));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const getCommentsForTemplate = (templateId) => {
    return commentsCache[templateId] || [];
  };

  const value = { 
    getCommentsForTemplate, 
    addComment, 
    loadCommentsForTemplate,
    loadingTemplates 
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);