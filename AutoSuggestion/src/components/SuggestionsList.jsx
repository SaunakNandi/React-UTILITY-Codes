import React from 'react'
import './styles.css'

export default function SuggestionsList({suggestions=[],
    highlight,
    dataKey,
    onSuggestionClick}) {
    
        const getHighlightedText=(text,highlight)=>{
            // console.log(text)
            const parts=text.split(new RegExp(`(${highlight})`,'gi'))
            
            return (
                <span>
                    {parts.map((part,i)=>{
                        return part.toLowerCase()===highlight.toLowerCase()?
                         (<b key={i}>{part}</b>):(part)
                    })}
                </span>
            )
        }
        console.log(suggestions)
  return (
    <>
        {suggestions.map((suggestion,index)=>{
            // const currentSuggestion= dataKey? suggestion[dataKey]:suggestion
            // console.log(suggestion[dataKey])
            return (
                <li key={index}
                onClick={()=>onSuggestionClick(suggestion)}
                className='suggestion-item'>
                    {getHighlightedText(suggestion[dataKey],highlight)}
                </li>
            )
        })}
    </>
  )
}
