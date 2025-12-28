import React, { useState } from "react";

export const Comment = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const handleChange = (e) => {
    if (editMode) setEditedContent;
    else setReplyContent(e.target.value);
  };
  const toggleExpand = () => {
    setExpand(!expand);
  };
  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };
  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent);
    setEditMode(false);
  };
  return (
    <>
      {!editMode ? (
        <div>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-info">Votes: {comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
      ) : (
        <div className="add-comment">
          <textarea
            value={editedContent}
            onChange={handleChange}
            placeholder="Add a reply..."
            rows={3}
            cols={50}
            className="comment-textarea"
          />
          <button onClick={handleEditSubmit} className="comment-button">
            Save Edit
          </button>
          <button onClick={toggleEditMode} className="comment-button">
            Cancel Edit
          </button>
        </div>
      )}
      <div className="comment">
        <div className="comment-actions">
          <button onClick={toggleExpand} className="comment-button">
            {expand ? "Hide Replies" : "Reply"}
          </button>
          <button onClick={toggleEditMode} className="comment-button">
            Edit
          </button>
          <button
            onClick={() => onDeleteComment(comment.id)}
            className="comment-button"
          >
            Delete
          </button>
        </div>
        {expand && (
          <div className="comment-replies">
            <div className="add-comment">
              <textarea
                value={replyContent}
                onChange={handleChange}
                placeholder="Add a reply..."
                rows={3}
                cols={50}
                className="comment-textarea"
              />
              <button onClick={handleReplySubmit} className="comment-button">
                Submit Reply
              </button>
            </div>
            {comment.replies.map((reply) => {
              return (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onSubmitComment={onSubmitComment}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
