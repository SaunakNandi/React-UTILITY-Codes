import React, { useState } from "react";

export const useComment = (initialComments) => {
  const [comments, setComments] = useState(initialComments);
  function insertNode(tree, commentId, content) {
    return tree.map((item) => {
      if (item.id == commentId) {
        return {
          ...item,
          replies: [...item.replies, content],
        };
      } else if (item.replies && item.replies.length > 0) {
        return {
          ...item,
          replies: insertNode(item.replies, commentId, content), //recursion
        };
      }
      return item;
    });
  }
  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };
    if (commentId) {
      setComments((prev) => insertNode(prev, commentId, newComment));
    } else {
      setComments((prev) => [...prev, newComment]);
    }
  };
  function editNode(tree, commentId, content) {
    return tree.map((item) => {
      if (item.id == commentId) {
        return {
          ...item,
          content,
          replies: [...item.replies, content],
        };
      } else if (item.replies && item.replies.length > 0) {
        return {
          ...item,
          replies: editNode(item.replies, commentId, content), //recursion
        };
      }
      return item;
    });
  }
  function deleteNode(tree, commentId) {
    return tree.reduce((acc, item) => {
      if (item.id == commentId) return acc;
      else if (item.replies && item.replies.length > 0) {
        item.replies = deleteNode(item.replies, commentId);
      }
      return [...acc, item];
    }, []);
  }
  const editComment = (commentId, content) => {
    setComments((prev) => editNode(prev, commentId, content));
  };
  const deleteComment = (commentId) => {
    setComments((prev) => deleteNode(prev, commentId));
  };
  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};
