import React, { createContext, useContext, useEffect, useState } from "react";
import { CommentsService } from "../services/CommentsService";

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    
    if (storedComments) {
      setComments(JSON.parse(storedComments));
      setLoaded(true);
    } else {
      (async () => {
        const data = await CommentsService.loadInitialComments();
        setComments(data);
        localStorage.setItem("comments", JSON.stringify(data));
        setLoaded(true);
      })();
    }
  }, []);

  const addComment = (comment) => {
    setComments((prev) => {
      const updated = [...prev, comment];
      CommentsService.reset(updated);
      localStorage.setItem("comments", JSON.stringify(updated)); 
      return updated;
    });
  };

  const value = { comments, addComment };

  if (!loaded) return <div>Loading comments...</div>;

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => useContext(CommentsContext);
