import { useEffect, useRef, useState } from 'react'

import './App.css'
import Pills from './Pills'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userData,setUserData]=useState([])
  const [skipData,setSkipData]=useState(0)
  const [loading,setLoading]=useState(true)
  const [activeSuggestion, setactiveSuggestion]=useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set())
  const inputRef=useRef(null)
  const listItemRef=useRef([])

  const handleSelectUser=(user)=>{
    setSelectedUsers([...selectedUsers,user])
    setSelectedUsersSet(new Set([...selectedUsersSet,user.email])) //since email is unique
    setSearchTerm("")
    setSuggestions([])
    inputRef.current.focus()
  }
  function scrollToItem(index)
  {
    listItemRef.current[index]?.scrollIntoView({
      behavior:'smooth',
      block:'nearest'
    })
  }
  function handleKeyDown(e)
  {
    console.log("Active user ",activeSuggestion)
    if(e.key==='Backspace' && e.target.value==='' && selectedUsers.length > 0)
    {
      const lastUser=selectedUsers[selectedUsers.length-1]
      handleRemoveUser(lastUser)
      setSuggestions([])
    }
    if(e.key==='ArrowDown' && suggestions?.length>0)
    {
      e.preventDefault()
      const newIdx=activeSuggestion<suggestions.length-1?activeSuggestion+1:0;
      setactiveSuggestion(newIdx)
      scrollToItem(newIdx)  
    }
    else if(e.key==='ArrowUp' && suggestions?.length>0)
    {
      e.preventDefault()
      const newIdx=activeSuggestion>0?activeSuggestion-1:activeSuggestion?.length-1
      setactiveSuggestion(newIdx)
      scrollToItem(newIdx)
    }
    else if(e.key==='Enter' && suggestions?.length>0)
    {
      handleSelectUser(suggestions[activeSuggestion])
    }
    else
    {
      const filtered=userData.filter((x)=>x.name.includes(e.target.value))
      console.log("filtered ",filtered)
      setSuggestions(filtered)
    }
  }
  const handleRemoveUser=(user)=>{
    const updatedUsers=selectedUsers.filter(selectedUsers=> selectedUsers.id!==user.id)
    setSelectedUsers(updatedUsers)
    const updatedEmails=new Set(setSelectedUsersSet)
    updatedEmails.delete(user.email)
    setSelectedUsersSet(updatedEmails)
  }
  const fetchUsers=async()=>{
    const res=await fetch(`https://dummyjson.com/users?skip=${skipData}`)
    const data=await res.json()
    const {limit,skip,total}=data
    const modifiedData=data.users.map((x)=>{
      return {
        ...x,
        name:x.firstName+ " "+x.lastName
      }
    })
    setUserData(modifiedData)
    if(skip+limit<total)
      setSkipData(skip+limit)
    else
      setLoading(false)
  }
  useEffect(()=>{
    fetchUsers()
  },[skipData])
  
  return !loading && (
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
                suggestions.length>0 && suggestions.map((user,i)=>{
                  // hiding selected users from suggestion list
                  return !selectedUsersSet.has(user.email)?(
                  <li onClick={()=>handleSelectUser(user)} key={user.id}
                  className={activeSuggestion==i? 'active':''}
                  ref={(el)=>listItemRef.current[i]=el}>
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
