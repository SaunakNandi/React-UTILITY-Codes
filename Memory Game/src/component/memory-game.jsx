
import { useEffect, useState } from "react";

const data = ["😎", "😈", "👽", "🤖", "🎃"];

function MemoryGame(){
    const [cards,setCards]=useState(data)
    const [firstClickIndex,setFirstClickIndex]=useState(null)
    const [secondClickIndex,setSecondClickIndex]=useState(null)
    const [matchingIndices,setMatchingIndices]=useState([])
    function prepareCards(){
        const duplicatedCards=[...data,...data]
        for(let i=duplicatedCards.length-1;i>=0;i--)
        {
            const j=Math.floor(Math.random()*i);
            [duplicatedCards[i],duplicatedCards[j]]=[duplicatedCards[j],duplicatedCards[i]]
        }
        return duplicatedCards
    }
    useEffect(()=>{
        const randomItems=prepareCards()
        console.log(randomItems)
        setCards(randomItems)},[])

    function handleClick(i)
    {
        return ()=>{
            if(firstClickIndex==null)
                setFirstClickIndex(i)
            else
            {
                const firstValue=cards[firstClickIndex]
                const secondValue=cards[i]

                if(firstValue==secondValue)
                {
                    setFirstClickIndex(null)
                    const newWinning=[...matchingIndices,firstClickIndex,i]
                    if(newWinning.length==cards.length)
                    {
                        alert("You won! ")
                        setCards(prepareCards())
                        setFirstClickIndex(null)
                        setSecondClickIndex(null)
                        setMatchingIndices([])
                    }
                    else
                        setMatchingIndices(newWinning)
                }
                else{
                    setSecondClickIndex(i)
                    setTimeout(()=>{
                        setFirstClickIndex(null)
                        setSecondClickIndex(null)
                    },3000)
                }
            }
        }
    }
    return (
    <div className="memory-game">
        <button onClick={()=>{
            setCards(prepareCards());
            setFirstClickIndex(null)
            setSecondClickIndex(null)
        }}>Restart Game</button>
    {
        cards.map((emoji,i)=>{
            return (
            <div className="card" 
            data-active={matchingIndices.includes(i)}
            data-disabled={i==firstClickIndex}
            data-disable-all={firstClickIndex!=null && secondClickIndex!=null}
            data-toggle={
                i==firstClickIndex || i==secondClickIndex
            } key={i} onClick={handleClick(i)}>
                <div className="front"></div>
                <div className="back">{emoji}</div>
            </div>)
        })
    }

    </div>)
}

export default MemoryGame