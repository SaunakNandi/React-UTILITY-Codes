import { createContext,useState } from "react"
import commentsData from './commentsData.json'

export const CommentSection=createContext()
export const CommentContext=({children})=>{
    const [allComments, setAllComments] = useState(commentsData.comments)
  const addComment=(value,parentId)=>{
    const newId=Date.now()
    const newComment={id:newId,value,parentId,children:[]}
    setAllComments((prev)=>{
      const updatedComments={...prev,[newId]:newComment}
      updatedComments[parentId].children.push(newId)
      return updatedComments
    })
  }
  const deleteComment=(id)=>{
    const parentId=allComments[id].parentId
    setAllComments((prev)=>{
      const updatedComments={...prev}
      // deleting the required node
      updatedComments[parentId].children=updatedComments[parentId].children.filter(childId=>childId!=id)
      const queue=[id];                   
      // deleting the child nodes of this node
      while(queue.length>0)
      {
        const nodeToDelete=queue.shift()
        queue.push(...updatedComments[nodeToDelete].children)
        delete updatedComments[nodeToDelete]
      }
      return updatedComments
    })
  }
    return (
        <CommentSection.Provider value={{allComments,setAllComments,addComment,deleteComment}}>
            {children}
        </CommentSection.Provider>
    )
}