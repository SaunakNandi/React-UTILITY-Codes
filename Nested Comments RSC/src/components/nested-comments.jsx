import React, { useState } from "react";
import { useComment } from "../hooks/use-comment";
import { Comment } from "./comment";

const NestedComments = ({
  comments,
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [comment, setComment] = useState("");
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useComment(comments);
  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
    onSubmit(content); // if user want to do further something
  };
  const handleEditChange = (e) => {
    setComment(e.target.value);
  };
  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };
  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };
  const handleDelete = (commentId) => {
    deleteComment(commentId);
    onDelete(commentId);
  };
  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={handleEditChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button onClick={handleSubmit} className="comment-button">
          Add Comment
        </button>
      </div>
      {commentsData.map((item) => (
        <Comment
          key={item.id}
          comment={item}
          onSubmitComment={handleReply}
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
        />
      ))}
    </>
  );
};

export default NestedComments;
