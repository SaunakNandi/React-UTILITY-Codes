/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import './styles.css'
import SuggestionsList from './SuggestionsList'
import debounce  from 'lodash/debounce'
export default function AutoComplete({
    staticData,
    fetchSuggestions,
    placeholder = "",
    customloading = "Loading...",
    dataKey = "",
}) 
{
    const [inputValue,setInputValue]=useState("")
    const [suggestion,setSuggestion]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [selected,setSelected]=useState(false)
    const getSuggestions=async(query)=>{
        setError(null)
        setLoading(true)
        try{
            let result;
            if(staticData)
                result=staticData.filter(
                    (x)=>x.toLowerCase().includes(query.toLowerCase()))
            else if(fetchSuggestions)
                result=await fetchSuggestions(query)
            setSuggestion(result)
        }
        catch(error){
            console.log(error)
            setError("Failed to fetch suggestions")
            setSuggestion([])
        }
        finally{
            setLoading(false)
        }
    }

    
    // Debouncing
    // useCallback returns a memoised function
    const suggestionDebounce= useCallback(debounce(getSuggestions,300),[])
    
    useEffect(()=>{
        if(inputValue.length>0 && !selected)
            suggestionDebounce(inputValue)
        else
        setSuggestion([])
    },[inputValue])  

    const handleSuggestionClick=(suggestion)=>{
        setInputValue(dataKey? suggestion[dataKey]:dataKey)
        setSuggestion([])
        setSelected(true)
    }
    const handleInputChange=(event)=>{
        setInputValue(event.target.value)
        setSelected(false)
    }
    console.log(dataKey)
  return (
    <div className='container'>
        <input type="text" 
        placeholder={placeholder}
        value={inputValue}
        onChange={(e)=>handleInputChange(e)}/>
        {
            (suggestion.length>0 || loading || error) && 
                <ul className='suggestions-list'>
                    {
                        error && <div className="error">{error}</div>
                    }
                    {
                        loading && <div className="loading">{customloading}</div>
                    }
                    {
                        inputValue.length>0 &&  
                        <SuggestionsList
                        dataKey={dataKey}
                        highlight={inputValue}
                        suggestions={suggestion}
                        onSuggestionClick={handleSuggestionClick}/>
                    }
                </ul>
        }
    </div>
  )
}
