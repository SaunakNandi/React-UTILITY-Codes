import { useEffect, useRef, useState } from 'react'

import './App.css'
import Pills from './Pills'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSuggestion, setactiveSuggestion]=useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set())
  const inputRef=useRef(null)

  const handleSelectUser=(user)=>{
    setSelectedUsers([...selectedUsers,user])
    setSelectedUsersSet(new Set([...selectedUsersSet,user.email])) //since email is unique
    setSearchTerm("")
    setSuggestions([])
    inputRef.current.focus()
  }
  function handleKeyDown(e)
  {
    if(e.key==='Backspace' && e.target.value==='' && selectedUsers.length > 0)
    {
      const lastUser=selectedUsers[selectedUsers.length-1]
      handleRemoveUser(lastUser)
      setSuggestions([])
    }
    if(e.key==='ArrowDown' && suggestions?.users?.length>0)
    {
      if(activeSuggestion<suggestions.users?.length-1)
        setactiveSuggestion(activeSuggestion+1)
      else
        setactiveSuggestion(0)
    }
    else if(e.key==='ArrowUp' && suggestions?.users?.length>0)
    {
      if(activeSuggestion>0)
        setactiveSuggestion(activeSuggestion-1)
      else
        setactiveSuggestion(suggestions.users.length-1)
    }
    else if(e.key==='Enter' && suggestions?.users?.length>0)
    {
      handleSelectUser(suggestions.users[activeSuggestion])
    }
  }
  const handleRemoveUser=(user)=>{
    const updatedUsers=selectedUsers.filter(selectedUsers=> selectedUsers.id!==user.id)
    setSelectedUsers(updatedUsers)
    const updatedEmails=new Set(setSelectedUsersSet)
    updatedEmails.delete(user.email)
    setSelectedUsersSet(updatedEmails)
  }
  const fetchUsers=()=>{
    if(searchTerm.trim()==="")
    {
      setSuggestions([])
      return
    }
    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
    .then((res)=>res.json())
    .then((data)=>setSuggestions(data))
    .catch((err)=>console.error(err))
  }
  useEffect(()=>{
    fetchUsers()
    console.log(suggestions)
  },[searchTerm])
  
  return (
    <>
      <div className='user-search-container'>
        <div className="user-search-input">
          {/* Pills */}
          {
            selectedUsers.length>0 && selectedUsers.map((user)=>(
              <Pills key={user.email} image={user.image} text={`${user.firstName} ${user.lastName}`}
              onClick={()=>handleRemoveUser(user)}/>
             
            ))
          }
          {/* inputs field with search suggestions */}
          <div style={{width:'100%'}}>
            <input text="text" value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} 
            placeholder='search for user' ref={inputRef} onKeyDown={handleKeyDown} style={{width:'100%'}}/>
            {/* Search Suggestions */}
            <ul className='suggestions-list'>
              {
                suggestions?.users?.map((user,i)=>{
                  // console.log(i,activeSuggestion)
                  return !selectedUsersSet.has(user.email)?(
                  <li onClick={()=>handleSelectUser(user)} key={user.id}
                  className={activeSuggestion==i? 'active':''}>
                    <img src={user.image} alt={`${user.firstName} ${user.lastName}`}/>
                    <span>{user.firstName} {user.lastName}</span>
                  </li>
                  ):(
                    <></>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
