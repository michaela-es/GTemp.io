let comments = [];

export const CommentsService = {
  async loadInitialComments() {
    const res = await fetch("/comments.json", {
      headers: {
        "Accept": "application/json",
      }
    });
    comments = await res.json();
    return comments;
  },

  getComments() {
    return comments;
  },

  addComment(comment) {
    comments = [...comments, comment];
  },

  reset(list) {
    comments = list;
  }
};
