import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { checkboxList } from './data'
import Comments from './Comments'

function App() {
  
  const [data,setData]=useState(checkboxList)
  function toggleCheckBox(children,value)
  {
    for(let i=0;i<children.length;i++)
    {
      children[i].checked=value
      toggleCheckBox(children[i],value)
    }
  }

  function dfs(comment,id,value,isFound)
  {
    if(comment.length==0) return isFound
    for(let i=0;i<comment.length;i++)
    {
      if(comment[i].id==id)
      {
        comment[i].checked=value
        toggleCheckBox(comment[i].children,value)
        return true
      }
      isFound=dfs(comment[i].children,id,value,isFound)
      if(isFound)
        return true;
    }
    return isFound
  }
  function getCount(list)
  {
    if(list.length==0) return 0
    let count=0;
    for(let i=0;i<list.length;i++)
    {
      if(list[i].checked)
        count+=1
      if(list[i].children.length==0)
        continue;
      let childCount=getCount(list[i].children)
      if(childCount!=list[i].children.length)
      {
        count=list[i].checked?count-1:count
        list[i].checked=false
      }
      else{
        count=list[i].checked?count:count+1
        list[i].checked=true
      }
    }
    return count

  }
  function handleChange(id,value){
    console.log(id,value)
    const comment=structuredClone(data)
    let isFound=false
    let parentId=-1
    for(let i=0;i<comment.length;i++)
    {
      if(comment[i].id==id)
      {
        isFound=true
        parentId=i
        toggleCheckBox(comment[i],id,value)
        break;
      }

      isFound=dfs(comment[i].children,id,value,false)
      if(isFound)
      {
        parentId=i
        break
      }
    }
    const count=getCount(comment[parentId].children)
    if(comment[parentId].children.length>0)
    {
      if(count==comment[parentId].children.length)
        comment[parentId].checked=true
      else
        comment[parentId].checked=false
    }
    setData(comment)
  }
  return (
    <>
      <Comments data={data} handleChange={handleChange}/>
    </>
  )
}

export default App
