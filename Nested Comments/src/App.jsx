import { useContext } from 'react'
import CommentBox from './CommentBox'
import { CommentSection } from './CommentContext'

function App() {
  const {allComments}=useContext(CommentSection)
  return (
    <>
 
        <CommentBox comment={allComments[1]}/>

    </>
  )
}

export default App
