import React, { useContext, useState } from 'react'
import ReplyComment from './Replycomment'
import { CommentSection } from './CommentContext'

const CommentBox = ({comment}) => {
    const {allComments,deleteComment}=useContext(CommentSection)

    const [showReply,setShowReply]=useState(false)

  return (
    <div className='comment-container'>
        <div className="comment-header">
            <p className='comment-value'>{comment.value}</p>
            <div className="comment-actions">
                <button className="reply-btn" onClick={()=>setShowReply(prev=>!prev)}>
                    { showReply? 'Cancel' : 'Reply'}
                </button>
                <button className="delete-btn" onClick={()=>deleteComment(comment.id)}>Delete</button>
            </div>
        </div>
        {showReply && <ReplyComment setShowReply={setShowReply} id={comment.id}/>}
        <div className="nested-comments">
            {
                comment.children.map((childId)=>{
                    return <CommentBox comment={allComments[childId]} key={childId} />
                })
            }
        </div>
    </div>
  )
}

export default CommentBox