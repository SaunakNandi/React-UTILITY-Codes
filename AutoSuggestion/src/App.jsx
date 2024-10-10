import { useState } from 'react'
import './App.css'
import AutoComplete from './components/autocomplete'

function App() {
  // const staticData = [
  //     "apple",
  //     "banana",
  //     "berrl",
  //     "orange",
  //     "grape",
  //     "mango",
  //     "melon",
  //     "berry",
  //     "peach",
  //     "cherry",
  //     "plum",
  //   ];
  const fetchSuggestions=async(query)=>{
    // console.log(query)
    const response=await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
    if(!response.ok)
      throw new Error("Network response was not ok")
    const data=await response.json()
    return data.recipes
  }
  return (
    <>
      <h1>Autocomplete / Typeahead</h1>
      <AutoComplete placeholder={"Enter Recipe"}
      // staticData={staticData}
      fetchSuggestions={fetchSuggestions}
      dataKey="name"
      customLoading={<>Loading Recipes...</>}/>
    </>
  )
}

export default App
