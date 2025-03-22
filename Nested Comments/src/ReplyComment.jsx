import React, { useContext, useState } from 'react'
import { CommentSection } from './CommentContext'

const ReplyComment = ({setShowReply,id}) => {
    const {addComment}=useContext(CommentSection)
    const [reply,setReply]=useState("")
    const handlePostReply = () =>{
        addComment(reply,id)
        setReply("")
        setShowReply(false)
    }
  return (
    <div className='reply-form'>
        <input className="post-comment-area"
        value={reply}
        onChange={(e)=>setReply(e.target.value)}
        placeholder='write your reply here'/>
        <button className="post-reply-btn" onClick={handlePostReply}>Post Reply</button>
    </div>
  )
}

export default ReplyComment