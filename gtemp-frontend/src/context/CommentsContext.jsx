import React, { createContext, useState, useContext, useCallback } from 'react';
import { commentsAPI } from '../services/commentsAPI';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [commentsByTemplate, setCommentsByTemplate] = useState({});
  const [loadingTemplates, setLoadingTemplates] = useState({});
  const [error, setError] = useState(null);

  const loadCommentsForTemplate = useCallback(async (templateId) => {
    if (!templateId) return;

    setLoadingTemplates(prev => ({ ...prev, [templateId]: true }));
    setError(null);

    try {
      const response = await commentsAPI.getComments(templateId);
      const data = response.data || [];
      setCommentsByTemplate(prev => ({ ...prev, [templateId]: data }));
    } catch (err) {
      console.error('Error loading comments:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoadingTemplates(prev => ({ ...prev, [templateId]: false }));
    }
  }, []); 

  const getCommentsForTemplate = useCallback((templateId) => {
    return commentsByTemplate[templateId] || [];
  }, [commentsByTemplate]); 

  const addComment = useCallback(async (commentData) => {
    setError(null);

    try {
      const response = await commentsAPI.addComment(commentData);
      const newComment = response.data;

      setCommentsByTemplate(prev => {
        const updatedComments = {
          ...prev,
          [commentData.templateID]: [newComment, ...(prev[commentData.templateID] || [])],
        };
        return updatedComments;
      });

      return { success: true, data: newComment };
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <CommentsContext.Provider value={{
      commentsByTemplate,
      loadingTemplates,
      error,
      loadCommentsForTemplate,
      getCommentsForTemplate,
      addComment,
      clearError
    }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) throw new Error('useComments must be used within a CommentsProvider');
  return context;
};